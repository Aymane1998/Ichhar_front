import React, { Key } from 'react';
import {
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useTheme,
} from '@mui/material';
import SourceIcon from '@mui/icons-material/Source';
import ArticleIcon from '@mui/icons-material/Article';
import StyleIcon from '@mui/icons-material/Style';
import { Box } from '@mui/system';
import { appBarMenuStyles } from './styles';

interface Props {
  icone: string;
  title: string;
  content: any;
}
const ToolTipe: React.FC<Props> = ({ icone, title, content }) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: `1px solid ${theme.palette.divider}`,
    },
  }));

  let iconComponent;
  const theme = useTheme();

  switch (icone) {
    case 'ArticleIcon':
      iconComponent = <ArticleIcon style={{ cursor: 'pointer' }} />;
      break;
    case 'SourceIcon':
      iconComponent = <SourceIcon style={{ cursor: 'pointer' }} />;
      break;
    case 'Tags':
      iconComponent = <StyleIcon style={{ cursor: 'pointer' }} />;
      break;
    // Add more cases as needed
    default:
      // Default case if icone doesn't match any known value
      // eslint-disable-next-line no-unused-vars
      iconComponent = <ArticleIcon />; // or provide a default component
      break;
  }

  return (
    <HtmlTooltip
      title={
        <React.Fragment>
          <Typography color="inherit">{title}</Typography>
          <br />
          {content.length > 0 ? (
            content.map((data: any, index: Key) => (
              <Box sx={appBarMenuStyles(theme).tooltipElements} key={index}>
                {data.label}
                <br />
              </Box>
            ))
          ) : (
            // Render something else or nothing
            <>{'Aucun enregistrement trouvé'}</>
          )}
        </React.Fragment>
      }
    >
      {iconComponent}
    </HtmlTooltip>
  );
};

export default ToolTipe;
