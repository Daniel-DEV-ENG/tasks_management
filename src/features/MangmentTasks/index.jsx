// App.js
import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, IconButton, Card, CardContent, Grid, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import AddTask from './AddTask';
import ViewTasks from './ViewTasks';
import { useDispatch, useSelector } from 'react-redux';
import {  getTasks } from '../../redux/tasks';

function App() {
  const [task, setTask] = useState('');
  const store = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTasks({

      })
    )
  }, [store.tasks.length])
  console.log("🚀 ~ App ~ store.data:", store?.tasks)
  const [tasks, setTasks] = useState([
  ]);

  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: task }]);
      setTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
   
     
       
<Grid container >
    <Grid xs={12} md={6} >
 
    <Box sx={{margin:'20px',}} >
        <AddTask/>
        </Box>
    </Grid>
    <Grid xs={12} md={6}>
      <Box sx={{margin:'20px',}} >
     {store?.tasks ?<ViewTasks tasks={store?.tasks}/>: null} 

      </Box>
    </Grid>
   
</Grid>
  );
}

export default App;
