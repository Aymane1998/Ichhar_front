import { Box, Pagination, Typography, useTheme } from '@mui/material';

import { CustomToolbarProps, DataTableProps } from '../types';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  GridOverlay,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React from 'react';
import { dataTableStyles } from './styles';

const DataTable = <T,>({
  columns,
  rows,
  pageSize = 10,
  rowsPerPageOptions,
  loading,
  filterModel,
  pagination = rows.length > pageSize,
  title,
  exportedCSVFileName,
  hasCheckboxSelection,
  hasExport = true,
  hasFilter = true,
  isRowSelectable,
  disableSelectionOnClick = true,
  toolbarButtons,
  columnVisibilityModel,
  sx,
  onSelectionModelChange,
  selectionModel,
}: DataTableProps<T>) => {
  const theme = useTheme();

  return (
    <DataGrid
      checkboxSelection={hasCheckboxSelection}
      isRowSelectable={isRowSelectable}
      disableSelectionOnClick={disableSelectionOnClick}
      sx={[dataTableStyles(theme).table, ...(Array.isArray(sx) ? sx : [sx])]}
      getRowId={(row) => row.id}
      density="comfortable"
      pagination
      pageSize={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
      autoHeight
      rows={rows}
      columnVisibilityModel={columnVisibilityModel}
      columns={columns}
      loading={loading}
      filterModel={filterModel}
      components={{
        Toolbar: () => (
          <CustomToolbar<T>
            title={title}
            exportedCSVFileName={exportedCSVFileName}
            toolbarButtons={toolbarButtons}
            hasExport={hasExport}
            hasFilter={hasFilter}
          />
        ),
        Pagination: pagination ? CustomPagination : null,
        NoRowsOverlay: CustomNoRowsOverlay,
      }}
      experimentalFeatures={{ newEditingApi: true }}
      onSelectionModelChange={onSelectionModelChange}
      selectionModel={selectionModel}
    />
  );
};

function CustomToolbar<T>({
  title,
  toolbarButtons,
  hasExport = true,
  hasFilter = true,
}: CustomToolbarProps<T>) {
  const theme = useTheme();

  return (
    <GridToolbarContainer sx={dataTableStyles(theme).toolbarTitleWrapper}>
      {title && (
        <Typography variant="h5" sx={dataTableStyles(theme).title}>
          {title}
        </Typography>
      )}
      {(hasFilter || hasExport) && (
        <Box sx={dataTableStyles(theme).toolbarWrapper}>
          <Box sx={dataTableStyles(theme).toolbar}>{toolbarButtons}</Box>
          <Box>
            {hasFilter && <GridToolbarFilterButton placeholder="" />}{' '}
            {/* Provide an empty string as a placeholder */}
            {hasExport && (
              <GridToolbarExport
                csvOptions={{
                  fileName: 'exported data',
                  delimiter: ';',
                  utf8WithBom: true,
                }}
              />
            )}
          </Box>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const CustomNoRowsOverlay = React.memo(function CustomNoRowsOverlay() {
  const theme = useTheme();

  return (
    <GridOverlay>
      <Box sx={dataTableStyles(theme).noDataErrorContainer}>
        <Typography variant="h2" sx={dataTableStyles(theme).noDataText}>
          Aucune ligne trouvée
        </Typography>
        <Typography variant="body1" sx={dataTableStyles(theme).noDataText}>
          Veuillez ajuster les filtres ou ajouter des lignes pour voir les
          résultats.
        </Typography>
      </Box>
    </GridOverlay>
  );
});

export default DataTable;
