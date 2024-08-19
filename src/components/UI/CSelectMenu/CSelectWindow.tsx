import React from 'react';
import {
  Box,
  ClickAwayListener,
  SxProps,
  Theme,
  useTheme,
} from '@mui/material';
import { cSelectMenuStyles } from './styles';

type CSelectWindowProps = {
  onClose: () => void;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const CSelectWindow: React.FC<CSelectWindowProps> = ({
  children,
  onClose,
  sx,
}) => {
  const theme = useTheme();

  return (
    <ClickAwayListener onClickAway={() => onClose()}>
      <Box
        sx={[
          cSelectMenuStyles(theme).menuWrapper,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </Box>
    </ClickAwayListener>
  );
};

export default CSelectWindow;
