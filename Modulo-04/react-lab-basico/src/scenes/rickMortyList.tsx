import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  CircularProgress,
  Alert,
  InputAdornment,
} from '@mui/material';
import { useRickMorty } from '@/contexts/rickMorty.provider';
import { useDebounce } from '@/hooks/useDebounce';
import './rickMortyList.scss';

export const RickMortyList: React.FC = () => {
  const { 
    characters, 
    searchTerm, 
    setSearchTerm, 
    loading, 
    error, 
    totalPages, 
    currentPage, 
    setCurrentPage 
  } = useRickMorty();
  
  const [inputValue, setInputValue] = useState<string>(searchTerm);
  const debouncedSearchTerm = useDebounce<string>(inputValue, 500);


  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  
  return (
    <Box className="rick-morty-list">
      <TextField
        fullWidth
        label="Search characters"
        variant="outlined"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="search-field"
      />
      
      {loading && (
        <Box className="loading-container">
          <CircularProgress />
        </Box>
      )}
      
      {error && !loading && (
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
      )}
      
      {!loading && characters.length === 0 && !error && (
        <Alert severity="info" className="info-alert">
          No characters found
        </Alert>
      )}
      
      <Box className="cards-container">
        {characters.map((character) => (
          <Card key={character.id} className="character-card">
            <CardMedia
              component="img"
              height="260"
              image={character.image}
              alt={character.name}
            />
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div">
                {character.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {character.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Species: {character.species}
              </Typography>
              <Box className="details-link">
                <Link
                  to={`/rick-morty/${character.id}`}
                  className="link"
                >
                  View details
                </Link>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {totalPages > 0 && (
        <Box className="pagination-container">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
  );
};