import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    dispatch(loginRequest({ username, password }));
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
        {error && <Alert severity="error">Error : {error}</Alert>}
        <TextField
          fullWidth
          label="Username"
          type="text"
          margin="normal"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          inputProps={{ minLength: 6 }} 
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <Typography variant="body2" align="center">
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default Login;