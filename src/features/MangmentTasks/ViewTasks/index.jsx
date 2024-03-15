import React ,{useState,useEffect} from 'react';
import {
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  Stack,
  IconButton,
  TextField,
  MenuItem
} from '@mui/material';
import {
  ModeEditOutlineOutlined as ModeEditOutlineOutlinedIcon,
  DeleteOutlineOutlined as DeleteOutlineOutlinedIcon,
  RemoveRedEyeOutlined as RemoveRedEyeOutlinedIcon,
} from '@mui/icons-material';
import AlertDeleteDialog from '../DeleteTask';
import { useDispatch, useSelector } from 'react-redux';
import { EditTask, openDialog, selectDialog } from '../../../redux/tasks';
import ViewTaskDialog from '../viewTask';
import { motion } from "framer-motion";


function ViewTasks({ tasks, onDelete }) {
  
  const [Fdata , setFData] = useState(tasks)
  const [Status, setStatus] = useState('')
  const dispatch = useDispatch();

  const handleOpenDialog = (task) => {
    dispatch(openDialog(task));
  };
  const handleEditTask = (task) => {
    dispatch(EditTask(task));
  };
  const option=[

    {status:'completed'},
    {status:'pending'},
  ]
  const [searchText, setsearchText] = useState()
  const [OpenDeleteDialog,setOpenDeleteDialog]=useState(false)
const [id,setId]=useState()
  const handleDelete = (taskId) => {
    console.log("🚀 ~ handleDelete ~ taskId:", taskId)
    setOpenDeleteDialog(true)
    setId(taskId)
  
  };


  const handelSearch = event => {
    if(event.target.value)
      setsearchText(event.target.value)
    else
      setsearchText(null)
  };
  useEffect(() => {
    let filterData = tasks
  
    if(Status) filterData = filterData?.filter((value, index) => value?.status == Status)
    if(searchText)filterData=filterData?.filter((value,index)=>(
      value?.title?.toLowerCase()?.includes(searchText?.toLowerCase())
    ))
    setFData(filterData)
  }, [searchText,Status,tasks])

  return (
    <>
     <Typography variant="h4" align='center' sx={{marginBottom: '4rem' }}  >
    Tasks
  </Typography>
  <Stack direction="row" spacing={2} justifyContent="space-between">
    <Box>
  <Typography variant="body2"   >
    Search
  </Typography>
  <TextField
          placeholder='search'

          InputProps={{
            startAdornment: (
              <Box paddingRight={1}>
                <svg width='14' height='15' viewBox='0 0 14 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g id='zoom-split'>
                    <path
                      id='Combined Shape'
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M5.75002 11.875C2.64341 11.875 0.125015 9.3566 0.125015 6.25C0.125015 3.1434 2.64341 0.625 5.75002 0.625C8.85662 0.625 11.375 3.1434 11.375 6.25C11.375 9.3566 8.85662 11.875 5.75002 11.875ZM5.75 10.6251C8.16625 10.6251 10.125 8.6663 10.125 6.25005C10.125 3.8338 8.16625 1.87505 5.75 1.87505C3.33376 1.87505 1.375 3.8338 1.375 6.25005C1.375 8.6663 3.33376 10.6251 5.75 10.6251ZM13.692 14.1919C13.936 13.9478 13.936 13.5521 13.692 13.308L11.192 10.808C10.9479 10.5639 10.5522 10.5639 10.3081 10.808C10.064 11.0521 10.064 11.4478 10.3081 11.6919L12.8081 14.1919C13.0522 14.436 13.4479 14.436 13.692 14.1919Z'
                      fill='#8090A7'
                    />
                  </g>
                </svg>
              </Box>
            )
          }}
          onChange={handelSearch}
          sx={{ backgroundColor: '#F5F7FA',border:'none', boxShadow: 'none',width:{sm:'320px',xs:'100%'} }}
          size='small'
        />
        </Box>
        <Box>
        <Typography variant="body2"   >
    filter
  </Typography>
    <TextField
                select
                sx={{ width:{sm:'320px',xs:'100%'} }}
         
                SelectProps={{
                  value: Status,
                  displayEmpty: true,
                   onChange: (e)=>setStatus(e.target.value)
                }}
                size='small'
              >
                <MenuItem value=''>Status</MenuItem>
                {option.map(element => (
                  <MenuItem key={element} value={element.status}>
                    {element.status}
                  </MenuItem>
                ))}
              </TextField>
              </Box>
</Stack>
        
      
      {Fdata.map((task,key) => (
            <motion.div 
            key={task.id} 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: key * 0.1 }}
        >
        <Card key={task.id} sx={{ marginY: '1rem' }}>
             
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{fontWeight:600}} >{task?.title} :</Typography>
                <Typography
                  variant="body2"
                  sx={{ marginBottom: '10px' }}
                  color='#8A8A8A'
                >
                  {task?.description}
                </Typography>
                <Chip label={task?.status} color={task.status ==='pending' ? 'error':'success'} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <IconButton onClick={() => handleDelete(task.id)}>
                  <DeleteOutlineOutlinedIcon />

                </IconButton>
                <IconButton onClick={()=>handleEditTask(task)}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick={()=>handleOpenDialog(task)} >
                  <RemoveRedEyeOutlinedIcon />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Card>
        </motion.div>
      ))}
      {OpenDeleteDialog && <AlertDeleteDialog open={OpenDeleteDialog} id={id} setOpen={setOpenDeleteDialog}/>}
      <ViewTaskDialog/>
    </>
  );
}

export default ViewTasks;
