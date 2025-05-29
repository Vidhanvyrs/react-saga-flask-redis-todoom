// import './App.css'

// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchTodos } from './redux/actions/todoActions';
// import TodoForm from './components/TodoForm';
// import TodoList from './components/TodoList';
// import { Container, Typography } from '@mui/material';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchTodos());
//   }, [dispatch]);

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Todo App
//       </Typography>
//       <TodoForm />
//       <TodoList />
//     </Container>
//   );
// }

// export default App;

import './App.css'

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos } from './redux/actions/todoActions';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Container, Typography } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  const dispatch = useDispatch();
 //hardcoding here brooooo
  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTodos());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Todo App
              </Typography>
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
