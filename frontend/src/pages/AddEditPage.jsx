import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import UserForm from '../components/UserForm';
import { fetchUserById, createUser, updateUser } from '../services/api';

const AddEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const loadUser = async () => {
        try {
          const { data } = await fetchUserById(id);
          setInitialData(data);
        } catch {
          toast.error('Failed to load user');
          navigate('/');
        }
      };
      loadUser();
    }
  }, [id, isEdit, navigate]);

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await updateUser(id, values);
        toast.success('User updated');
      } else {
        await createUser(values);
        toast.success('User created');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit User' : 'Add User'}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <UserForm initialData={initialData} onSubmit={handleSubmit} isEdit={isEdit} />
      </Box>
    </Container>
  );
};

export default AddEditPage;