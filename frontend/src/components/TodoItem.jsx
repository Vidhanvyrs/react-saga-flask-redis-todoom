import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTodoRequest, deleteTodoRequest } from '../redux/actions/todoActions';
import { TextField, Button, Box, Card, CardContent, IconButton, Typography, Stack } from '@mui/material';
import { Delete, Edit, Save, Cancel } from '@mui/icons-material';
import { format } from 'date-fns';

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);
  const dispatch = useDispatch();

  // Format the creation time for display
  const formattedDate = format(new Date(todo.createdAt), 'MMM dd, yyyy - h:mm a');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedTodo = {
      ...editedTodo,
      createdAt: todo.createdAt
    };
    dispatch(editTodoRequest(todo.id, updatedTodo));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTodo(todo);
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodoRequest(todo.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={editedTodo.title}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={editedTodo.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
            />
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {todo.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formattedDate}
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {todo.description}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleEdit} color="primary" sx={{ p: 1 }}>
                <Edit fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete} color="error" sx={{ p: 1 }}>
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default TodoItem;