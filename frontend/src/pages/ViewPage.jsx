import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Grid, Button, Divider, Avatar } from '@mui/material';
import { Person } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { fetchUserById } from '../services/api';

const ViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await fetchUserById(id);
        setUser(data);
      } catch {
        toast.error('User not found');
        navigate('/');
      }
    };
    loadUser();
  }, [id, navigate]);

  if (!user) return null;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" alignItems="center" flexDirection="column">
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', mb: 2 }}>
              <Person fontSize="large" />
            </Avatar>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Phone:</strong> {user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>User ID:</strong> {user._id}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1"><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => navigate(`/edit/${user._id}`)} sx={{ mr: 2 }}>
              Edit
            </Button>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Back to List
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ViewPage;