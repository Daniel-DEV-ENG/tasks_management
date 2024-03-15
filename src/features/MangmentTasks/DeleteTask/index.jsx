import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { Box, Grid, Paper } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { styled } from '@mui/material/styles';
import { deleteTask } from "../../../redux/tasks";
import { useDispatch } from "react-redux";

export default function AlertDeleteDialog({ id, open, setOpen }) {
console.log("🚀 ~ AlertDeleteDialog ~ id:", id)
const dispatch = useDispatch()
  const handleDeleteAPI = () => {
    // DeleteTeam(id)
    dispatch(deleteTask(id))
    setOpen(false)
    };
  const handleDeleteClose = () => {
    setOpen(false)
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "99px",
    width: "100%",
    borderRadius: "10px",
    position: "relative",
    overflow: "visible",
  }));

  return (
    <Dialog onClose={handleDeleteClose} open={open}>
  
      <DialogTitle style={{ fontSize: "19px", color: '#B4B4B3', textAlign: 'center' }}>Are you sure to delete this task?</DialogTitle>
      <DialogActions style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <Button onClick={handleDeleteClose} style={{ color: '#B4B4B3' }}>Cancel</Button>
        <Button sx={{ color: "#DF2E38" }} onClick={handleDeleteAPI} autoFocus>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
