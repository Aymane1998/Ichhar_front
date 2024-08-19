/* eslint-disable */
import React from 'react';
import { cModalStyles } from './styles';
import {
  Alert,
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { deepmerge } from '@mui/utils';
import dayjs from 'dayjs';

interface CModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  hasButton?: boolean;
  hasCancelButton?: boolean;
  hasSubmitButton?: boolean;
  buttonTitle?: string;
  buttonOnClick?: () => void; // Ajout de buttonOnClick
  buttonIsLoading?: boolean;
  buttonIsDisabled?: boolean;
  error: boolean;
  errorMessage: string;
  size?: false | Breakpoint | undefined;
  sx?: SxProps<Theme>;
  hasExportButton?: boolean;
  exportButtonTitle?: string;
  objectToExport?: any;
  formRef?: React.RefObject<HTMLFormElement>; // Ajout de formRef
}


const CModal: React.FC<CModalProps> = ({
  children,
  isOpen,
  onClose,
  modalTitle,
  hasButton = true,
  hasCancelButton = true,
  hasSubmitButton = false,
  buttonTitle,
  buttonOnClick, // Utilisation de buttonOnClick
  buttonIsLoading,
  buttonIsDisabled,
  error,
  errorMessage,
  size = 'md',
  sx,
  hasExportButton,
  exportButtonTitle,
  objectToExport,
  formRef, // Utilisation de formRef
}) => {
  const theme = useTheme();
  const dialogContentStyles = deepmerge(cModalStyles(theme).contentWrapper, {
    overflowY: 'auto',
    overflowX: 'auto',
  });

  const handleSubmitClick = () => {
    if (buttonOnClick) {
      buttonOnClick(); // Appel de buttonOnClick
    } else if (formRef && formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      maxWidth={size}
      sx={[cModalStyles(theme).modal, ...(Array.isArray(sx) ? sx : [sx])]}
      PaperProps={{
        style: {
          backgroundColor: theme.palette.background.default,
          width: '960px',
          minWidth: '70%',
        },
      }}
    >
      <>
        <DialogTitle sx={cModalStyles(theme).titleWrapper}>
          <Box>
            <Typography variant="h4" sx={cModalStyles(theme).title}>
              {modalTitle}
            </Typography>
          </Box>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={dialogContentStyles}>{children}</DialogContent>
        {hasButton && (
          <>
            <Box sx={cModalStyles(theme).footerWrapper}>
              {error && (
                <Alert sx={cModalStyles(theme).error} severity="error">
                  {errorMessage}
                </Alert>
              )}
              <Box sx={cModalStyles(theme).buttonWrapper}>
                {hasCancelButton && (
                  <Button onClick={() => onClose()}>Annuler</Button>
                )}
                {hasSubmitButton && (
                  <LoadingButton
                    variant="contained"
                    loading={buttonIsLoading}
                    onClick={handleSubmitClick} // Utilisation de handleSubmitClick
                    sx={cModalStyles(theme).button}
                    disabled={buttonIsDisabled}
                  >
                    {buttonTitle}
                  </LoadingButton>
                )}
              </Box>
            </Box>
          </>
        )}
      </>
    </Dialog>
  );
};

export default CModal;

