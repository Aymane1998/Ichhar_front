/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  ListItem,
  ListItemButton,
  SxProps,
  ListItemIcon,
  Theme,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import { cSelectMenuStyles } from './styles';

type CSelectItemProps = {
  onClick?: () => void;
  title: string;
  isHighlighted?: boolean;
  sx?: SxProps<Theme>;
  icon?: React.ReactElement;
  hasIcon?: boolean;
  anyItemHasIcon?: boolean;
};

const CSelectItem: React.FC<CSelectItemProps> = ({
  isHighlighted = false,
  onClick,
  title,
  sx,
  hasIcon = false,
  icon,
  anyItemHasIcon = false,
}) => {
  const theme = useTheme();

  const listItemIconStyle = {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  };

  return (
    <>
      {onClick ? (
        <ListItemButton
          onClick={onClick}
          sx={[
            cSelectMenuStyles(theme).itemList(isHighlighted),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <ListItemIcon style={listItemIconStyle}>
            {hasIcon ? (
              icon
            ) : anyItemHasIcon ? (
              <Box sx={{ width: theme.spacing(3) }}></Box>
            ) : null}
          </ListItemIcon>
          <Typography>{title}</Typography>
        </ListItemButton>
      ) : (
        <ListItem
          sx={[
            cSelectMenuStyles(theme).itemList(isHighlighted),
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <ListItemIcon style={listItemIconStyle}>
            {hasIcon ? (
              icon
            ) : anyItemHasIcon ? (
              <Box sx={{ width: theme.spacing(3) }}></Box>
            ) : null}
          </ListItemIcon>
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {title}
          </Typography>
        </ListItem>
      )}
    </>
  );
};

export default CSelectItem;
