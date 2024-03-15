// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'
import { showSuccesToast } from '../utiltis/toastError'
import toast from 'react-hot-toast'
// import { showSuccesToast } from '../utiltis/toastError'

export const getTasks = createAsyncThunk('appTodo/getTasks', async params => {
  const response = await axios.get('/apps/todo/tasks', { params })

  return {
    params,
    data: response.data
  }
})

export const addTask = createAsyncThunk('appTodo/addTask', async (task, { dispatch, getState }) => {
  const response = await axios.post('/apps/todo/add-tasks', { task })
  await dispatch(getTasks(getState().todo.params))
  showSuccesToast('Update successfully')
  return response.data
})

export const updateTask = createAsyncThunk('appTodo/updateTask', async (task, { dispatch, getState }) => {
try{
  const response = await axios.post('/apps/todo/update-task', { task })
  toast.success('Update task successfully');
  await dispatch(getTasks(getState().todo.params))
  return response.data
}
catch(error){
  toast.error('Something went wrong');

}
  
})

export const deleteTask = createAsyncThunk('appTodo/deleteTask', async (taskId, { dispatch, getState }) => {
  try{

  const response = await axios.delete('/apps/todo/delete-task', { taskId })

    await dispatch(getTasks(getState().todo.params))
      toast.success('Delete task successfully');

    return response.data
  }
  catch(error){
    toast.error('Something went wrong');

  }
  
})

export const appTodoSlice = createSlice({
  name: 'appTodo',
  initialState: {
    tasks: [],
    open: false,
    task: null,
    selectedTask: {},
    params: {
      filter: '',
      q: '',
      sort: '',
      tag: ''
    }
  },
  reducers: {
    reOrderTasks: (state, action) => {
      state.tasks = action.payload
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload
    },
    openDialog: (state, action) => {
        state.open = true;
        state.task = action.payload;
      },
      EditTask: (state, action) => {
        state.task = action.payload;
      },
      closeDialog: (state) => {
        state.open = false;
        state.task = null;
      },
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.data
      state.params = action.payload.params
    })
  }
})

export const { reOrderTasks,openDialog, closeDialog, selectTask,EditTask } = appTodoSlice.actions
export const selectDialog = (state) => state.appTodo;

export default appTodoSlice.reducer
