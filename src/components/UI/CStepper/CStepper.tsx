import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { cStepperStyles } from './styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import CheckIcon from '@mui/icons-material/Check';
import { CStepsProps } from '../types';

interface CStepperProps {
  steps: CStepsProps[];
  sx?: SxProps<Theme>;
}

const CStepper: React.FC<CStepperProps> = ({ steps, sx }) => {
  const theme = useTheme();

  const CConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      left: 'calc(-50% + 32px)',
      right: 'calc(50% + 32px)',
      top: '16px',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.background.paper,
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ ownerState }) => ({
    backgroundColor: ownerState.completed
      ? theme.palette.primary.main
      : theme.palette.background.paper,
    zIndex: 1,
    padding: theme.spacing(1),
    width: '40px',
    height: '40px',
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      color: ownerState.completed ? 'white' : theme.palette.primary.main,
    }),
    ...(ownerState.completed && {
      color: ownerState.completed ? 'white' : theme.palette.primary.main,
    }),
  }));

  function ColorlibStepIcon({ active, completed, icon }: StepIconProps) {
    const icons: { [index: string]: React.ReactElement } = {};

    steps.forEach((step) => {
      if (step.icon) {
        icons[step.id.toString()] = step.icon;
      } else {
        icons[step.id.toString()] = (
          <Typography
            variant="h5"
            sx={{ color: theme.palette.action.disabled }}
          >
            {step.id}
          </Typography>
        );
      }
    });

    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }}>
        {completed ? <CheckIcon /> : icons[String(icon)]}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Stepper
      sx={[cStepperStyles(theme).wrapper, ...(Array.isArray(sx) ? sx : [sx])]}
      alternativeLabel
      connector={<CConnector />}
    >
      {steps.map((step) => (
        <Step key={step.id} completed={step.completed} active={step.active}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            {step.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default CStepper;
