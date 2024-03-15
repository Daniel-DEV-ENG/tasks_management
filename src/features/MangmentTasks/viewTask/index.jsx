import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip } from "@mui/material";
import { closeDialog, selectDialog } from "../../../redux/tasks";

export default function ViewTaskDialog() {
  const dispatch = useDispatch();
  const { open, task } = useSelector((state) => state.tasks);

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog onClose={handleCloseDialog} open={open} maxWidth="sm" fullWidth>
      <DialogTitle>{task?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{task?.description}</DialogContentText>
        <div>
          <Chip label={`Assignee: ${task?.assignee.fullName}`} style={{ marginRight: '5px', marginBottom: '5px' }} />
          {task?.tags.map(tag => (
            <Chip key={tag} label={tag} style={{ marginRight: '5px', marginBottom: '5px' }} />
          ))}
          <Chip label={`Due Date: ${task?.dueDate}`} style={{ marginRight: '5px', marginBottom: '5px' }} />
        </div>
   
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}
