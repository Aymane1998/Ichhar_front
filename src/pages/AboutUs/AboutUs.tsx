import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router';

const AboutUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={5}
      >
        <Box width="50%">
          <img
            src="https://img.freepik.com/premium-vector/team-workers-huddled-around-project-each-utilizing-their-unique-skill-sets-complete_216520-61262.jpg?w=1380"
            alt="Team working together"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Box>
        <Box width="45%" pl={5}>
          <Typography variant="h4" component="h2" gutterBottom>
            Qui Somme Nous ?
          </Typography>
          <Typography variant="body1" paragraph>
            Nous sommes spécialisés dans la création de vidéos promotionnelles
            exceptionnelles qui font écho à votre produit.{' '}
            <strong style={{ color: 'red' }}>Ichhar</strong> propose une
            interface simple à utiliser, de la création d&apos;un compte à la
            réception d&apos;une superbe vidéo promotionnelle. Avec des mesures
            de sécurité strictes, un flux de travail transparent et une
            confirmation administrative minutieuse. Wincreative garantit un
            parcours créatif fiable. Choisissez Wincreative pour révéler tout le
            potentiel de votre marque, où chaque vidéo promotionnelle est une
            peinture artistique et une campagne réussie.
          </Typography>

          <Button onClick={handleClick} variant="contained" color="primary">
            Commencer
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AboutUs;
