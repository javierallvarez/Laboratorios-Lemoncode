import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";


interface UserDetail {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
  site_admin: boolean;
  name?: string;
  company?: string;
}


export const DetailPage: React.FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");


  useEffect(() => {
    fetch(`https://api.github.com/users/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Usuario no encontrado');
      })
      .then((data) => {
        setUser(data);
        setError("");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
        <Button component={Link} to="/" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
          Volver al inicio
        </Button>
      </Box>
    );
  }

  
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={user?.avatar_url}
          alt={user?.login}
          sx={{ objectFit: "contain", bgcolor: "#f5f5f5" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {user?.name || user?.login}
          </Typography>

          <Typography variant="body1" gutterBottom>
            {user?.company}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button component={Link} to="/" startIcon={<ArrowBack />} variant="outlined">
              Come back home
            </Button>

            <Button
              component="a"
              href={user?.html_url}
              target="_blank"
              variant="contained"
            >
              See on GitHub
            </Button>
          </Box>
          
        </CardContent>
      </Card>
    </Box>
  );
};
