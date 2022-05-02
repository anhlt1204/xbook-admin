import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box, styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from '../../slice/selector';
import { useAccountSlice } from '../../slice';

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
  id: number;
  onClose: () => void;
}

export default function EditProduct(props: Props) {
  const dispatch = useDispatch();

  const { detailAccount, errorMessage } = useSelector(selectAccount);

  const { actions } = useAccountSlice();

  const [valSelect, setValSelect] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValSelect(event.target.value);
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleButton = () => {
    dispatch(
      actions.updateAccountRequest({
        id: +props.id,
        data: {
          address: detailAccount.address,
          amount: 0,
          createBy: detailAccount.username,
          email: detailAccount.email,
          firstName: detailAccount.firstName,
          lastName: detailAccount.lastName,
          phone: detailAccount.phone,
          role: valSelect,
        },
      }),
    );
  };

  React.useEffect(() => {
    dispatch(actions.getAccountDetailRequest(+props.id));

    setValSelect(detailAccount.role);
  }, [props.open, props.id, detailAccount.role]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyleDialog
      open={props.open}
      TransitionComponent={Transition}
      onBackdropClick={handleClose}
    >
      <DialogTitle>
        Xem tài khoản
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 24,
            height: '15px',
            width: '15px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: '100%' }}>
          <LabelCustom>Tài khoản</LabelCustom>
          <FieldCustom>{detailAccount.username}</FieldCustom>
        </Box>

        <Box sx={{ width: '100%' }}>
          <LabelCustom>Vai trò</LabelCustom>
          <Select
            value={valSelect}
            onChange={handleChange}
            sx={{ width: '100%', height: '52px' }}
          >
            <MenuItem value="ADMIN">Quản trị viên</MenuItem>
            <MenuItem value="USER">Người dùng</MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: '100%' }}>
          {errorMessage === 'Cập nhật tài khoản thất bại!' && (
            <Typography
              sx={{
                color: 'red',
                textAlign: 'center',
              }}
            >
              {errorMessage}
            </Typography>
          )}

          <Button
            color="primary"
            variant="contained"
            onClick={handleButton}
            sx={{
              marginTop: '20px',
              height: '50px',
              width: '100%',
              borderRadius: '8px',
            }}
          >
            Lưu
          </Button>
        </Box>
      </DialogContent>
    </StyleDialog>
  );
}

const StyleDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    backgroundColor: '#FFF',
    backgroundImage: 'none',
    padding: '40px',
    borderRadius: '20px',
    width: '550px',
    minHeight: '350px',
    overflowY: 'hidden',

    '& h2': {
      padding: '0px',
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 700,
      textTransform: 'capitalize',
    },

    '.MuiDialogContent-root': {
      marginTop: '25px',
      padding: '0px',
      overflowY: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontSize: '15px',
      lineHeight: '17px',
    },
  },
}));

export const LabelCustom = styled(Box)(({ theme }) => ({
  marginBottom: '4px',
  fontSize: '14px',
  lineHeight: '27px',
  fontWeight: 700,
}));

export const FieldCustom = styled(Box)(({ theme }) => ({
  minHeight: '52px',
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  lineHeight: '15px',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'justify',
}));
