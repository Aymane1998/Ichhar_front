import { Container, Typography } from '@mui/material';
import dayjs from 'dayjs';

const Footer = () => {
  const currentYear = dayjs().format('YYYY');
  const version = process.env.REACT_APP_VERSION;

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h6"
        align="center"
        sx={{ fontSize: '12px', padding: '20px' }}
      >
        Copyright Ichhar © {currentYear} - version : {version}
      </Typography>
    </Container>
  );
};

export default Footer;
