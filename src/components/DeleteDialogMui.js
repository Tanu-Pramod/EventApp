import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    const newEvent = props.rows.filter((events) => events.id !== id)
    props.setRows(newEvent);
    localStorage.setItem("event_list", JSON.stringify(newEvent));

  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined"  onClick={handleClickOpen}  >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClick(props.id)}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
