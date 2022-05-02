import * as React from 'react';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import success from './assets/Success.svg';
import error from './assets/Error.svg';
import { styled } from '@mui/system';
import { Dialog } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  type: 'error' | 'success';
  text: string;
  handle: Function;
  isOpen: boolean;
  onClose: Function;
}

export default function Alert(props: Props) {
  const handleClose = () => {
    props.onClose();
    return props.handle();
  };

  function createMarkup() {
    return { __html: props.text };
  }
  return (
    <>
      <ModalAlert
        open={props.isOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {props.type === 'success' ? (
            <img src={success} alt="success" />
          ) : (
            <img src={error} alt="error" />
          )}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            sx={{ color: '#000' }}
          >
            <span dangerouslySetInnerHTML={createMarkup()}></span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </ModalAlert>
    </>
  );
}

const ModalAlert = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root': {
    borderRadius: '20px',
    maxWidth: '600px',
    width: '100%',
    minHeight: '367px',
    padding: '0px 0px 24px 0px',
    backgroundColor: '#fff',
    '.MuiTypography-root': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.MuiDialogActions-root': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.MuiDialogContent-root': {
      textAlign: 'center',
    },
  },
  '.MuiButton-root': {
    minWidth: '140px',
    minHeight: '48px',
    borderRadius: '1000px',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FFF',
  },
}));
