import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from './redux/actions/todoActions';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Button, Container, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import { logout } from './redux/actions/authActions'; 
import Register from './components/auth/Register';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTodos());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Todo App
              </Typography>
              <Button variant="outlined" color="error" onClick={handleLogout} sx={{ my: 2 }} >
                  Logout
                </Button>
              <TodoForm />
              <TodoList />
            </Container>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;