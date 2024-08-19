import {
  Alert,
  Box,
  Card,
  Chip,
  Grid,
  Rating,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetchByParams from 'src/hooks/useFetchByParams';
import { fetchCreatorByIDAsync } from 'src/store/creator/creatorAsync';
import PersonIcon from '@mui/icons-material/Person';
import { RootState } from 'src/store/store';
import { landingPageStyles } from '../LandingPage/styles';

const CreatorDetails = () => {
  const reduxState = useSelector((state: RootState) => state);
  const { status, creator } = useMemo(
    () => reduxState.creator.fetchCreatorById,
    [reduxState.creator.fetchCreatorById],
  );
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();

  useFetchByParams({
    param: id,
    status: status,
    action: fetchCreatorByIDAsync,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Section: Nom */}
        <Grid
          item
          xs={12}
          sx={{
            ...landingPageStyles(theme).cardContainer,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <PersonIcon fontSize="large" />
          <Typography
            variant="h2"
            sx={{
              ml: 1,
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            {creator?.first_name} {creator?.last_name}
          </Typography>
        </Grid>

        {/* Section: Description */}
        <Grid item xs={12}>
          <Typography
            sx={{
              ...landingPageStyles(theme).cardContainer,
            }}
            variant="body1"
          >
            <Typography
              sx={{ marginBottom: '24px', color: theme.palette.primary.main }}
            >
              Description du profile :{' '}
            </Typography>
            {creator?.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              ...landingPageStyles(theme).cardContainer,
            }}
            variant="body1"
          >
            Nombre de vidéos crées :{' '}
            <Chip label={creator?.total_videos} color="primary" />
          </Typography>
        </Grid>

        {/* Section: Vidéos */}
        <Grid item xs={12}>
          {creator?.video_links && creator.video_links.length > 0 ? (
            <Grid container spacing={2}>
              {creator.video_links.map((video_link, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card sx={{ minWidth: 275 }}>
                    <Box sx={{ p: 2 }}>
                      <iframe
                        width="100%"
                        height="240"
                        src={video_link}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`video-${index}`}
                      ></iframe>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert variant="filled" severity="info">
              Pas de vidéo(s) pour ce créateur
            </Alert>
          )}
        </Grid>

        {/* Section: Avis */}
        {creator?.video_links && creator.video_links.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h6">Avis sur le créateur :</Typography>
            <Rating value={creator?.rating} readOnly />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CreatorDetails;
