import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { eventContext } from '../App';
import axios from 'axios';
import { useEffect } from 'react';


export default function DeleteDialog(props) {

  const { isGuestPage, guest, setGuest, setEvents } = React.useContext(eventContext)


  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    axios.get("http://localhost:3000/list").then(
      (response) => {
        let event = response.data.data
        const eData = event.map((ev) => {
          return {
            _id: ev._id,
            event_name: ev.event_name,
            date: ev.date.slice(0, 10),
            venue: ev.venue
          }
        })
        
        setEvents(eData)

      }
    )

    axios.get("http://localhost:3000/guestIndex/guestlist").then((response) => {
      setGuest(response.data.data)
    })
  }, [open])

  const handleDeleteClick = (id) => (event) => {

    console.log("id", id)
    event.stopPropagation();
    if (isGuestPage) {

      axios.get(`http://localhost:3000/guestIndex/delete/${id}`)
      setOpen(false);
      // const newGuest = guest.filter((guest) => guest.id !== id)
      // setGuest(newGuest);
      // localStorage.setItem("guest_list", JSON.stringify(newGuest));
    }
    else {

      axios.get(`http://localhost:3000/delete/${id}`)
      setOpen(false);


    }


  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}  >
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
