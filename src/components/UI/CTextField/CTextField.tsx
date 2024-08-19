import React, { Ref } from 'react';
import { cTextFieldStyles } from './styles';
import {
  InputAdornment,
  SxProps,
  TextField,
  Theme,
  useTheme,
} from '@mui/material';

interface CTextFieldProps {
  id?: string;
  multiline?: boolean;
  maxRows?: number;
  defaultValue?: string;
  label?: string;
  type?: string;
  value: string | number | File | null | undefined;
  inputRef?: Ref<any> | undefined;
  minValue?: number;
  maxValue?: number;
  setValue?: any;
  setFile?: any;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endAdornment?: string | React.ReactElement;
  accept?: string;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  required?: boolean;
  helperText?: string;
  error?: boolean;
}

const CTextField: React.FC<CTextFieldProps> = ({
  id,
  multiline = false,
  maxRows = 1,
  defaultValue,
  label,
  type,
  value,
  inputRef,
  minValue,
  maxValue,
  setFile,
  onChange,
  endAdornment,
  accept,
  placeholder,
  fullWidth,
  disabled = false,
  sx,
  required = false,
  helperText = '',
  error = false,
}) => {
  const theme = useTheme();

  return (
    <TextField
      id={id}
      sx={[cTextFieldStyles(theme).wrapper, ...(Array.isArray(sx) ? sx : [sx])]}
      label={label}
      type={type}
      multiline={multiline}
      maxRows={maxRows}
      defaultValue={defaultValue}
      value={value}
      inputRef={inputRef}
      placeholder={placeholder}
      disabled={disabled}
      fullWidth={fullWidth}
      error={error}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
          onChange(event);
        }
        if (event.target.files) {
          setFile(event.target.files[0]);
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ),
        inputProps: { min: minValue, max: maxValue, accept: accept },
      }}
      InputLabelProps={{
        shrink: true,
      }}
      required={required}
      helperText={helperText}
    />
  );
};

export default CTextField;
