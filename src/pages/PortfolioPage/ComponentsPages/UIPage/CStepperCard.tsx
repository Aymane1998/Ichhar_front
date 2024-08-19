import { Box, useTheme } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import CStepper from 'src/components/UI/CStepper/CStepper';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { CStepsProps } from 'src/components/UI/types';

const CStepperCard: React.FC = () => {
  const theme = useTheme();

  const steps: CStepsProps[] = [
    {
      id: 1,
      active: false,
      completed: true,
    },
    {
      id: 2,
      active: true,
      completed: false,
    },
    {
      id: 3,
      active: false,
      completed: false,
    },
  ];

  const steps2: CStepsProps[] = [
    {
      id: 1,
      label: 'label 1',
      active: false,
      completed: true,
    },
    {
      id: 2,
      label: 'label 2',
      active: true,
      completed: false,
    },
    {
      id: 3,
      label: 'label 3',
      active: false,
      completed: false,
    },
  ];

  const steps3: CStepsProps[] = [
    {
      id: 1,
      active: false,
      completed: true,
      icon: <AccessibilityIcon />,
    },
    {
      id: 2,
      active: true,
      completed: false,
      icon: <GroupAddIcon />,
    },
    {
      id: 3,
      active: false,
      completed: false,
      icon: <SettingsIcon />,
    },
  ];

  return (
    <CInfosTitleWrapper
      title={'CStepper'}
      documentation="https://mui.com/material-ui/react-stepper/"
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapper}>
        <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
          <CStepper steps={steps} />
          <CStepper steps={steps2} />
          <CStepper steps={steps3} />
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default CStepperCard;
