import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/actions/todoActions';
import { TextField, Button, Box, Paper } from '@mui/material';

const TodoForm = () => {
  const [todo, setTodo] = useState({
    title: '',
    description: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.title.trim()) {
      const newTodo = {
        ...todo,
        id: Date.now(),
        createdAt: new Date().toISOString() // Add current timestamp
      };
      dispatch(addTodo(newTodo));
      setTodo({
        title: '',
        description: ''
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={todo.title}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={todo.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Add Todo
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TodoForm;