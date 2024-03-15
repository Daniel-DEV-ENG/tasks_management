import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, Box, Select, MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../../../redux/tasks';

function AddTask() {
  const [tasks, setTasks] = useState([]);
  const { task } = useSelector((state) => state.tasks);
  console.log("🚀 ~ AddTask ~ task:", task)
const dispatch =useDispatch()
  const initialValues = {
    taskName: task?.title ?? "",
    taskDescription: task?.description ?? "",
  status: task?.status ?? "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values)
    if (task) {
      // Handle edit task logic
      dispatch(updateTask(values))
      resetForm()
    } else {
     dispatch(addTask(values))
        resetForm();
      }
    }
  

  return (
    <>
      <Typography variant="h4" align='center'>
        {task ? 'Edit Task' : 'Add New Task'}
      </Typography>
      <Box sx={{ marginX: '20px', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Formik
                initialValues={initialValues}

                onSubmit={handleSubmit}
            >
                {(formik) => (
                    <Form>
            <Field
              as={TextField}
              name="taskName"
              label="Task Name"
              placeholder="Please enter a task name"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <Field
              as={TextField}
              name="taskDescription"
              label="Task Description"
              placeholder="Please enter a task description"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            />
            <Field
              as={Select}
              name="status"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="outlined"
              fullWidth
              style={{ marginBottom: '20px' }}
            >
              <MenuItem value={'all'}></MenuItem>
              <MenuItem value={'pending'}>pending</MenuItem>
              <MenuItem value={'completed'}>completed</MenuItem>
            </Field>
            <Button type="submit" variant="contained" style={{ marginBottom: '20px' }} fullWidth>
              {task ? 'Edit Task' : 'Add Task'}
            </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
                }

export default AddTask;
