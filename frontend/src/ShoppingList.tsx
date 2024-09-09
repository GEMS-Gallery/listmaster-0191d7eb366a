import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Fab, CircularProgress } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface ShoppingItem {
  id: bigint;
  description: string;
  completed: boolean;
  completedAt: bigint | null;
}

const ShoppingList: React.FC = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const result = await backend.getItems();
      setItems(result);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
    setLoading(false);
  };

  const addItem = async () => {
    if (newItem.trim() === '') return;
    setLoading(true);
    try {
      await backend.addItem(newItem);
      setNewItem('');
      await fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
    setLoading(false);
  };

  const toggleItemCompletion = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.toggleItemCompletion(id);
      await fetchItems();
    } catch (error) {
      console.error('Error toggling item completion:', error);
    }
    setLoading(false);
  };

  const deleteItem = async (id: bigint) => {
    setLoading(true);
    try {
      await backend.deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping List
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Add new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addItem()}
        sx={{ mb: 2 }}
      />
      <List>
        {items.map((item) => (
          <ListItem key={Number(item.id)} dense button onClick={() => toggleItemCompletion(item.id)}>
            <Checkbox
              edge="start"
              checked={item.completed}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={item.description} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add"
        onClick={addItem}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
      {loading && (
        <CircularProgress
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            marginTop: '-20px',
            marginLeft: '-20px',
          }}
        />
      )}
    </>
  );
};

export default ShoppingList;
