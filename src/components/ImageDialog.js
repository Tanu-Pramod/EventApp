
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useRef } from 'react'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ImageDialog(props) {




  const cropperRef = useRef(null);
  const onCrop = () => {


    const imageElement = cropperRef.current;
    const cropper = imageElement.cropper;


    const base64 = cropper.getCroppedCanvas().toDataURL();

    const startIndex = base64.indexOf("base64,") + 7;
    const b64 = base64.substr(startIndex);
    const byteCharacters = window.atob(b64);
    const byteArrays = [];
    const sliceSize = 512;
    const contentType = 'image/jpg';

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    console.log("blob",blob)

    // to get blobUrl

    // const blobUrl = URL.createObjectURL(blob);

    const file = new File([blob], '.jpg',
      {
        type: blob.type,
        lastModified: new Date().getTime()
      }
    )
    console.log("file",file)

    props.setSrc(cropper.getCroppedCanvas().toDataURL());



    props.setFieldValue("image", file);
    props.setOpen(false);





  };



  return (
    <div>

      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Image Cropper
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Cropper
            src={props.image}
            style={{ height: 'auto', width: "100%", margin: 'auto' }}
            // Cropper.js options
            initialAspectRatio={1}
            background={false}
            guides={false}
            //crop={onCrop}
            ref={cropperRef}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onCrop}>
            Crop
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
