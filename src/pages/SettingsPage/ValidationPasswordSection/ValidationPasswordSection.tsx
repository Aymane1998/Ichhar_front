import { Box, useTheme } from '@mui/material';

import { settingsPageStyles } from '../styles';
import ValidationItem from './ValidationItem';
import { useEffect, useState } from 'react';

type ValidationPasswordSectionProps = {
  value: string;
};

const ValidationPasswordSection = ({
  value,
}: ValidationPasswordSectionProps) => {
  const theme = useTheme();

  const [validation, setValidation] = useState({
    isLong: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialCharacters: false,
  });

  useEffect(() => {
    const isLongEnough = (val: string) => val.length >= 8;

    const hasLowercase = (val: string) => /[a-z]/.test(val);

    const hasUppercase = (val: string) => /[A-Z]/.test(val);

    const hasNumber = (val: string) => /\d/.test(val);

    const hasSpecialCharacters = (val: string) =>
      /[$&+,:;=?@#|'<>.^*()%!-]/.test(val);

    setValidation({
      isLong: isLongEnough(value),
      hasLowercase: hasLowercase(value),
      hasUppercase: hasUppercase(value),
      hasNumber: hasNumber(value),
      hasSpecialCharacters: hasSpecialCharacters(value),
    });
  }, [value]);

  return (
    <Box sx={settingsPageStyles(theme).validationPasswordWrapper}>
      <ValidationItem
        validated={validation.isLong}
        conditionMessage="Minimum 8 caractères."
      />
      <ValidationItem
        validated={validation.hasLowercase}
        conditionMessage="Minimum une minuscule."
      />
      <ValidationItem
        validated={validation.hasUppercase}
        conditionMessage="Minimum une majuscule."
      />
      <ValidationItem
        validated={validation.hasNumber}
        conditionMessage="Minimum un chiffre."
      />
      <ValidationItem
        validated={validation.hasSpecialCharacters}
        conditionMessage="Minimum un caractère spécial."
      />
    </Box>
  );
};

export default ValidationPasswordSection;
