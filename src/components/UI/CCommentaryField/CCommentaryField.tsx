import React from 'react';
import { cCommentaryFieldStyles } from './styles';
import { SxProps, Theme } from '@mui/material';
import CTextField from '../CTextField/CTextField';

interface CCommentaryFieldProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setFile?: any;
  label?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  minValue?: number;
  maxValue?: number;
}

const CCommentaryField: React.FC<CCommentaryFieldProps> = ({
  value = '',
  onChange,
  setFile,
  label,
  disabled = false,
  sx,
  placeholder,
  required,
  helperText,
  minValue,
  maxValue,
}) => (
  <CTextField
    id={'commentary'}
    label={label}
    type={'text'}
    value={value}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event);
      }
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    }}
    setValue={onChange}
    disabled={disabled}
    sx={[cCommentaryFieldStyles.textfield, ...(Array.isArray(sx) ? sx : [sx])]}
    multiline={true}
    maxRows={6}
    placeholder={placeholder}
    required={required}
    helperText={helperText}
    minValue={minValue}
    maxValue={maxValue}
  />
);

export default CCommentaryField;
