import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useFetch from 'src/hooks/useFetch';
import { fetchCreatorAsync } from 'src/store/creator/creatorAsync';
import { RootState } from 'src/store/store';
import { creatorPagetyles } from './styles';
import { useNavigate } from 'react-router';

const Creator = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const fetchCreator = useSelector(
    (state: RootState) => state.creator.fetchCreator,
  );
  const { status, creators } = useMemo(() => fetchCreator, [fetchCreator]);

  useFetch({
    status: status,
    data: creators,
    action: fetchCreatorAsync,
  });

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: theme.palette.primary.main,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <Box>
      <Typography variant="h2">Liste des créateurs</Typography>

      <Box sx={creatorPagetyles(theme).cardContainer}>
        {creators.map((creator) => (
          <Card key={creator.id} sx={creatorPagetyles(theme).cardsContainer}>
            <CardHeader
              avatar={
                <Avatar
                  {...stringAvatar(
                    `${creator.first_name} ${creator.last_name}`,
                  )}
                />
              }
              subheader={`Date de création : ${dayjs(
                creator.integration_date,
              ).format('DD/MM/YYYY')}`}
            />
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  position: 'relative',
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {creator.description}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    sx={{ marginTop: '20px' }}
                    label={`Vidéos Crées: ${creator.total_videos}`}
                    color="primary"
                  />
                  <CardActions>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigate(`/createur/${creator.id}`)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </CardActions>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Creator;
