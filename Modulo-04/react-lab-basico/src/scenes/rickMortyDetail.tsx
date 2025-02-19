import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Grid,
  Button,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';


interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}


export const RickMortyDetail: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        
        if (!response.ok) {
          throw new Error('Character not found');
        }
        
        const data: Character = await response.json();
        setCharacter(data);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);


  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }


  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
        <Button component={Link} to="/rick-morty" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Back to characters
        </Button>
      </Box>
    );
  }


  if (!character) {
    return null;
  }

  
  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', p: 3 }}>
      <Button 
        component={Link} 
        to="/rick-morty" 
        startIcon={<ArrowBack />} 
        sx={{ mb: 3 }}
      >
        Back to characters
      </Button>
      
      <Card>
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={character.image}
              alt={character.name}
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {character.name}
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={character.status}
                  color={
                    character.status === 'Alive' ? 'success' :
                    character.status === 'Dead' ? 'error' : 'default'
                  }
                  sx={{ mr: 1 }}
                />
                <Chip label={character.species} />
              </Box>
              
              <Typography variant="body1" gutterBottom>
                <strong>Gender:</strong> {character.gender}
              </Typography>
              
              {character.type && (
                <Typography variant="body1" gutterBottom>
                  <strong>Type:</strong> {character.type}
                </Typography>
              )}
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="body1" gutterBottom>
                <strong>Origin:</strong> {character.origin.name}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {character.location.name}
              </Typography>
              
              <Typography variant="body1" gutterBottom>
                <strong>Episodes:</strong> {character.episode.length}
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(character.created).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
