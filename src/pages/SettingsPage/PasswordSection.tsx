import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { settingsPageStyles } from './styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { LoadingButton } from '@mui/lab';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ValidationPasswordSection from './ValidationPasswordSection/ValidationPasswordSection';
import { changePasswordAsync } from 'src/store/auth/authAsync';
import { ChangePasswordPayload } from 'src/store/auth/types';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetChangePasswordRequest } from 'src/store/auth/authSlices/changePasswordSlice';
import PasswordStrengthBar from './PasswordStrengthBar';
import { ResetPasswordData } from 'src/utils/types/ResetPasswordData';

const initialValues: ChangePasswordPayload = {
  old_password: '',
  new_password: '',
};

const validationSchema = Yup.object().shape({
  old_password: Yup.string().required('Entrez votre mot de passe actuel.'),
  new_password: Yup.string()
    .min(8, 'Minimum 8 caractères.')
    .required('Entrez un nouveau mot de passe.')
    .matches(/^(?=.*[a-z])/, 'Minimum une minuscule.')
    .matches(/^(?=.*[A-Z])/, 'Minimum une majuscule.')
    .matches(/^(?=.*[0-9])/, 'Minimum un chiffre.')
    .matches(
      /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])/,
      'Minimum un caractère spécial.',
    ),
});

const PasswordSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const changePasswordRequest = useAppSelector(
    (state) => state.auth.changePassword,
  );

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleShow = (type: 'old' | 'new') => {
    if (type === 'old') {
      setShowOld(!showOld);
    } else if (type === 'new') {
      setShowNew(!showNew);
    }
  };

  const onSubmit = async (
    values: ResetPasswordData,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await dispatch(changePasswordAsync(values));
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(resetChangePasswordRequest());
  }, []);

  return (
    <Box sx={settingsPageStyles(theme).passwordWrapper}>
      <Typography variant="h4">Changement de mot de passe</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        isInitialError={false}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          isSubmitting,
          isValid,
          touched,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="old_password"
              label="Mot de passe actuel"
              type={showOld ? 'text' : 'password'}
              id="old_password"
              autoComplete="current-old-password"
              value={values.old_password}
              error={touched.old_password && Boolean(errors.old_password)}
              helperText={touched.old_password && errors.old_password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleShow('old')} edge="end">
                      {showOld ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Field
              as={TextField}
              margin="normal"
              required
              fullWidth
              name="new_password"
              label="Nouveau mot de passe"
              type={showNew ? 'text' : 'password'}
              id="new_password"
              autoComplete="current-new-password"
              value={values.new_password}
              error={touched.new_password && Boolean(errors.new_password)}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handleShow('new')} edge="end">
                      {showNew ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <ValidationPasswordSection value={values.new_password} />
            <PasswordStrengthBar password={values.new_password} score={0} />
            <LoadingButton
              fullWidth
              sx={{ mt: 3, mb: 2 }}
              type="submit"
              variant="contained"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Mettre à jour
            </LoadingButton>
            {changePasswordRequest.status === ReduxStatus.Succeeded && (
              <Alert severity="success">
                Votre mot de passe a bien été mis à jour.
              </Alert>
            )}
            {changePasswordRequest.status === ReduxStatus.Failed && (
              <Alert severity="error">
                Une erreur est survenue lors du changement.
              </Alert>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordSection;
