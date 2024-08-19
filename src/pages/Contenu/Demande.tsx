/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Box,
  useTheme,
  Snackbar,
  Alert,
  TooltipProps,
  styled,
  tooltipClasses,
  Tooltip,
} from '@mui/material';
import dayjs from 'dayjs';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CDatePicker from 'src/components/UI/CDatePicker/CDatePicker';
import CModal from 'src/components/UI/CModal/CModal';
import { GridCellParams, GridColDef } from '@mui/x-data-grid';
import DataTable from 'src/components/UI/Datatable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import useFetch from 'src/hooks/useFetch';
import {
  createDemandAsync,
  fetchDemandAsync,
  updateDemandAsync,
} from 'src/store/demand/demandAsync';
import CStatusPill from 'src/components/UI/CStatusPill/CStatusPill';
import { defineUserAbilities } from 'src/components/Customs/abilities';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { DemandPayload } from 'src/hooks/redux/CreateDemandRequest';
import { initialValuesDemand } from 'src/utils/form/initialValuesDemand';
import { useAppSelector } from 'src/hooks';

const Demande = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<DemandPayload | null>(
    null,
  );
  const theme = useTheme();

  const user = useAppSelector((state) => state.auth.userInfos.data);
  const userRole = user?.groups;
  const alertState = useSelector(
    (state: RootState) => state.demand.UpdateDemand.alert,
  );
  const alertStateCreation = useSelector(
    (state: RootState) => state.demand.CreateDemand.alert,
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if ((alertState.successMessage || alertState.errorMessage) && submited) {
      setSnackbarOpen(true);
    }
  }, [submited, alertState]);

  useEffect(() => {
    if (
      (alertStateCreation.successMessage || alertStateCreation.errorMessage) &&
      submited
    ) {
      setSnackbarOpen(true);
    }
  }, [submited, alertStateCreation]);

  const ability = defineUserAbilities();
  const canEditEtat =
    ability.can('edit', 'Etat') && userRole.includes('Createur');
  const canEditAll = ability.can('edit', 'AllFields');
  const dispatch = useDispatch<AppDispatch>();

  const fetchDemand = useSelector(
    (state: RootState) => state.demand.fetchDemand,
  );
  const { status, demands } = useMemo(() => fetchDemand, [fetchDemand]);

  useFetch({
    status: status,
    data: demands,
    action: fetchDemandAsync,
  });

  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 600,
      minHeight: 'auto',
      textAlign: 'center',
      fontSize: 17,
    },
  });

  const validationSchema = Yup.object({
    duration: Yup.number().required('Required'),
    deadline: Yup.date().required('Required'),
    description: Yup.string().required('Required'),
    type_video: Yup.string().required('Required'),
    language: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    comments: Yup.string(),
    taken: Yup.boolean().required('Required'),
  });

  const columns: GridColDef[] = [
    {
      field: 'duration',
      headerName: 'Durée de la vidéo',
      width: 150,
      type: 'string',
    },
    {
      field: 'demandeur',
      headerName: 'Demandeur',
      width: 150,
      type: 'string',
      valueGetter: (params: any) => params.row.demandeur_info?.id || 'None',
    },
    {
      field: 'deadline',
      headerName: 'Date Limite du rendu',
      width: 170,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'string',
      width: 250,
      renderCell: (params: any) => (
        <Box>
          <CustomWidthTooltip
            title={params.row.description}
            placement="top"
            arrow
          >
            <Box style={{ cursor: 'pointer' }}>{params.row.description}</Box>
          </CustomWidthTooltip>
        </Box>
      ),
    },
    {
      field: 'type_video',
      headerName: 'Type de la vidéo',
      width: 160,
      renderCell: (params: GridCellParams) => {
        const color =
          params.row.type_video === 'physique'
            ? 'success'
            : params.row.type_video === 'digital'
              ? 'info'
              : 'error';

        return (
          <Box>
            <CStatusPill severity={color}>{params.row.type_video}</CStatusPill>
          </Box>
        );
      },
    },
    {
      field: 'language',
      headerName: 'Langue de la vidéo',
      width: 160,
      renderCell: (params: any) => (
        <Box sx={{ textTransform: 'capitalize' }}>{params.row.language}</Box>
      ),
    },
    {
      field: 'gender',
      headerName: 'Genre du créateur',
      type: 'string',
      width: 170,
      renderCell: (params: any) => (
        <Box sx={{ textTransform: 'capitalize' }}>{params.row.gender}</Box>
      ),
    },
    {
      field: 'taken',
      headerName: 'Etat',
      type: 'string',
      width: 150,
      renderCell: (params: GridCellParams) => {
        const color = params.row.taken ? 'success' : 'error';

        return (
          <Box>
            <CStatusPill severity={color}>
              {params.row.taken ? 'Pris' : 'Non pris'}
            </CStatusPill>
          </Box>
        );
      },
    },
    {
      field: 'comments',
      headerName: 'Comentaire',
      type: 'string',
      width: 300,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'string',
      width: 170,
      renderCell: (params: GridCellParams) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
        >
          {ability.can('update', 'Contenu') ? (
            <EditIcon
              component="svg"
              sx={{ cursor: 'pointer', marginRight: '15px' }}
              onClick={() => handleEditClick(params.row)} // handle edit click
            />
          ) : (
            ''
          )}
          {ability.can('read', 'Contenu') ? (
            <VisibilityIcon
              sx={{ cursor: 'pointer' }}
              component="svg"
              onClick={() => handleViewClick(params.row)}
            />
          ) : (
            ''
          )}
        </Box>
      ),
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedDemand(null);
    setIsEditMode(false);
    handleOpenModal();
  };

  const handleViewClick = (demand: DemandPayload) => {
    setSelectedDemand(demand);
    setIsEditMode(false); // Ensure this is set to false for view mode
    handleOpenModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setSelectedDemand(null);
  };

  const handleEditClick = (demand: DemandPayload) => {
    setSelectedDemand({
      ...demand,
      deadline: dayjs(demand.deadline), // Ensure deadline is a dayjs object
    });
    setIsEditMode(true);
    handleOpenModal();
  };

  const handleSubmit = async (
    values: DemandPayload,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    },
  ) => {
    const formattedValues = {
      ...values,
      deadline: dayjs(values.deadline).format('YYYY-MM-DD'), // Format the deadline date
    };

    try {
      if (isEditMode && selectedDemand) {
        await dispatch(
          updateDemandAsync({ id: selectedDemand.id, data: formattedValues }),
        );
        setSubmited(true);
      } else {
        await dispatch(createDemandAsync(formattedValues));
      }
      setSubmitting(false);
      resetForm();
      handleCloseModal(); // Fermer le modal après avoir soumis le formulaire
    } catch (error) {
      setSubmitting(false);
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <Box>
      {/* Snackbar pour afficher les messages de succès ou d'erreur */}
      <Snackbar
        open={snackbarOpen} // Contrôler l'ouverture du Snackbar avec l'état local
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={alertState.successMessage ? 'success' : 'error'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertState.successMessage || alertState.errorMessage}
        </Alert>
      </Snackbar>
      <Button variant="contained" color="primary" onClick={handleCreateClick}>
        Créer une demande
      </Button>

      <CModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        modalTitle={
          isEditMode
            ? 'Modifier une demande'
            : selectedDemand
              ? 'Détails de la demande'
              : 'Créer une demande'
        }
        // hasSubmitButton={isEditMode || !selectedDemand} // Show submit button in edit mode or creation mode
        buttonIsLoading={false}
        buttonIsDisabled={false}
        error={false}
        errorMessage=""
        buttonTitle="Créer la demande"
      >
        <Formik
          initialValues={selectedDemand || initialValuesDemand}
          validationSchema={isEditMode ? validationSchema : null}
          onSubmit={handleSubmit}
          enableReinitialize // This ensures the form reinitializes with selected demand data
        >
          {({ values, handleChange, setFieldValue, isValid }) => (
            <Form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {isEditMode || !selectedDemand ? (
                <>
                  <Field
                    as={TextField}
                    type="number"
                    name="duration"
                    label="Durée de la vidéo (en minutes)"
                    variant="outlined"
                    value={values.duration}
                    onChange={handleChange}
                    required
                    disabled={canEditEtat}
                  />
                  <CDatePicker
                    label="Date limite"
                    value={values.deadline}
                    setValue={(newValue: dayjs.Dayjs | null) =>
                      setFieldValue('deadline', newValue)
                    }
                    required
                    disablePast={true}
                    disabled={canEditEtat}
                  />
                  <Field
                    as={TextField}
                    name="description"
                    label="Description de la vidéo"
                    variant="outlined"
                    value={values.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    disabled={canEditEtat}
                  />
                  <FormControl
                    disabled={canEditEtat}
                    component="fieldset"
                    required
                  >
                    <FormLabel component="legend">Type</FormLabel>
                    <RadioGroup
                      row
                      name="type_video"
                      value={values.type_video}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="physique"
                        control={<Radio />}
                        label="Physique"
                      />
                      <FormControlLabel
                        value="digital"
                        control={<Radio />}
                        label="Digital"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormControl
                    disabled={canEditEtat}
                    variant="outlined"
                    required
                  >
                    <InputLabel id="language-label">
                      Langue de la vidéo
                    </InputLabel>
                    <Select
                      labelId="language-label"
                      id="language-select"
                      name="language"
                      value={values.language}
                      onChange={handleChange}
                      label="Langue de la vidéo"
                    >
                      <MenuItem value="arabe">Arabe</MenuItem>
                      <MenuItem value="français">Français</MenuItem>
                      <MenuItem value="anglais">Anglais</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    disabled={canEditEtat}
                    component="fieldset"
                    required
                  >
                    <FormLabel component="legend">Genre du créateur</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="homme"
                        control={<Radio />}
                        label="Homme"
                      />
                      <FormControlLabel
                        value="femme"
                        control={<Radio />}
                        label="Femme"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Field
                    as={TextField}
                    name="comments"
                    label="Commentaires"
                    variant="outlined"
                    value={values.comments}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    disabled={canEditEtat}
                  />
                  {isEditMode && (
                    <FormControl
                      disabled={!canEditEtat}
                      component="fieldset"
                      required
                    >
                      <FormLabel component="legend">État</FormLabel>
                      <RadioGroup
                        row
                        name="taken"
                        value={values.taken.toString()} // Convertissez la valeur en chaîne
                        onChange={(e) =>
                          setFieldValue('taken', e.target.value === 'true')
                        } // Convertissez la valeur en booléen
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Pris"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Non pris"
                        />
                      </RadioGroup>
                    </FormControl>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={!isValid}
                    color="primary"
                  >
                    {isEditMode ? 'Mettre à jour' : 'Soumettre'}
                  </Button>
                </>
              ) : (
                // Show demand details when not in edit mode
                <>
                  <TextField
                    label="Durée de la vidéo"
                    variant="outlined"
                    value={selectedDemand?.duration || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Date limite"
                    variant="outlined"
                    value={
                      selectedDemand?.deadline
                        ? dayjs(selectedDemand.deadline).format('DD/MM/YYYY')
                        : ''
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    value={selectedDemand?.description || ''}
                    multiline
                    rows={4}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Type de la vidéo"
                    variant="outlined"
                    value={selectedDemand?.type_video || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Langue de la vidéo"
                    variant="outlined"
                    value={selectedDemand?.language || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Genre du créateur"
                    variant="outlined"
                    value={selectedDemand?.gender || ''}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="Commentaires"
                    variant="outlined"
                    value={selectedDemand?.comments || ''}
                    multiline
                    rows={4}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <TextField
                    label="État"
                    variant="outlined"
                    value={selectedDemand?.taken ? 'Pris' : 'Non pris'}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </>
              )}
            </Form>
          )}
        </Formik>
      </CModal>

      <DataTable
        sx={{ height: 700, width: '100%', marginTop: '15px' }}
        rows={demands}
        title="Demandes de contenu"
        columns={columns}
        pageSize={10} // Utilisez pageSize pour définir la taille de la page
      />
    </Box>
  );
};

export default Demande;
