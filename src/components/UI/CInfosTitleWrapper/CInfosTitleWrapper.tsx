import React from 'react';
import { cInfosTitleWrapperStyles } from './styles';

import { Box, Link, SxProps, Theme, Typography, useTheme } from '@mui/material';
import CIconTooltip from '../CIconTooltip/CIconTooltip';
import FindInPageIcon from '@mui/icons-material/FindInPage';

interface CInfosTitleWrapperProps {
  title: string;
  isBigWrapper?: boolean;
  children: React.ReactNode;
  documentation?: string;
  linkUrl?: string;
  sx?: SxProps<Theme>;
}

const CInfosTitleWrapper: React.FC<CInfosTitleWrapperProps> = ({
  title,
  isBigWrapper = false,
  children,
  documentation = '',
  linkUrl = '',
  sx,
}) => {
  const theme = useTheme();

  return (
    <Box sx={cInfosTitleWrapperStyles(theme).wrapper(isBigWrapper)}>
      <Box sx={cInfosTitleWrapperStyles(theme).titleWrapper}>
        <Typography variant={isBigWrapper ? 'h4' : 'h6'}>
          {linkUrl ? (
            <Link color="inherit" underline="hover" href={linkUrl}>
              {title}
            </Link>
          ) : (
            // If no linkUrl, just display the title
            title
          )}
        </Typography>
        {documentation !== '' && (
          <CIconTooltip
            tooltip="Documentation"
            onClick={() => window.open(documentation, '_blank')}
            icon={<FindInPageIcon />}
          />
        )}
      </Box>
      <Box
        sx={[
          cInfosTitleWrapperStyles(theme).contentWrapper,
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CInfosTitleWrapper;
