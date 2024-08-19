import { Box, Tooltip, useTheme } from '@mui/material';

type SwitchColorProps = {
  item: string;
  priority: any;
  children?: React.ReactNode;
};

const PriorityColor = ({ item, priority, children }: SwitchColorProps) => {
  const theme = useTheme();
  const priorityColors = {
    P1: theme.palette.error.main,
    P2: theme.palette.warning.main,
    P3: theme.palette.info.main,
    P4: theme.palette.success.light,
    P5: theme.palette.success.main,
  };

  switch (item) {
    case '1':
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: priorityColors.P1,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
    case '2':
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: priorityColors.P2,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
    case '3':
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: priorityColors.P3,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
    case '4':
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: priorityColors.P4,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
    case '5':
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: priorityColors.P5,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
    default:
      return (
        <Tooltip title={priority.label} placement="top">
          <Box
            sx={{
              paddingInline: theme.spacing(3),
              backgroundColor: '#FFFFFF',
              color: theme.palette.text.primary,
              borderRadius: '50px',
              cursor: 'pointer',
            }}
          >
            {children}
          </Box>
        </Tooltip>
      );
  }
};

export default PriorityColor;
