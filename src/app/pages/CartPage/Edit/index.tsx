import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { styled } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../slice/selector';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  text: string;
  color: string;
  handle: () => void;
  onClose: () => void;
}

export default function EditCart(props: Props) {
  const { errorMessage } = useSelector(selectCart);

  const onNo = () => {
    props.onClose();
  };

  const onYes = () => {
    props.handle();
  };

  return (
    <StyleDialog
      open={props.open}
      TransitionComponent={Transition}
      onBackdropClick={() => props.onClose()}
    >
      <DialogContent>
        <Typography gutterBottom>
          Bạn có muốn cập nhật trạng thái{' '}
          <span style={{ color: `${props.color}` }}>{props.text}</span>?
        </Typography>
      </DialogContent>
      {errorMessage === 'Cập nhật đơn hàng thất bại!' && (
        <Typography
          component="p"
          sx={{ mb: '10px', color: 'red', textAlign: 'center' }}
        >
          {errorMessage}
        </Typography>
      )}
      <DialogActions sx={{ justifyContent: 'center', gap: '50px' }}>
        <Button onClick={onNo} variant="outlined">
          Không
        </Button>
        <Button onClick={onYes} variant="contained">
          Có
        </Button>
      </DialogActions>
    </StyleDialog>
  );
}

const StyleDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    padding: '40px',
    borderRadius: '20px',
    width: '553px',
    height: '230px',
    overflowY: 'hidden',

    '.MuiDialogContent-root': {
      padding: '0px',
      overflowY: 'hidden',
      '& p, span': {
        fontSize: '20px',
        fontWeight: 400,
        lineHeight: '36px',
        textAlign: 'center',
        marginBottom: '24px',
      },
    },

    '.MuiDialogActions-root': {
      padding: '0px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',

      button: {
        margin: '0px',
        width: '150px',
        height: '52px',
        fontSize: '16px',
        fontWeight: 700,
        lineHeight: '24px',
        borderRadius: '8px',
      },
    },
  },
}));
