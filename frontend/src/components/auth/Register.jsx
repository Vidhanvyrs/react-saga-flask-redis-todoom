import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../redux/actions/authActions';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

   useEffect(() => {
      if (isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    setLocalError('');
    dispatch(registerRequest({ username: name, email, password }));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Register
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        {localError && <Alert severity="error">{localError}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          margin="normal"
          required
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <Typography variant="body2" align="center">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Register;