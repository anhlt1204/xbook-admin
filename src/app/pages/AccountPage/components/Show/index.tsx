import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box, styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
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

export default function ShowAccount(props: Props) {
  const dispatch = useDispatch();

  const { detailAccount, errorMessage } = useSelector(selectAccount);

  const { actions } = useAccountSlice();

  const handleClose = () => {
    props.onClose();
    dispatch(
      actions.setDetailAccount({
        firstName: '',
        lastName: '',
        username: '',
        address: '',
        email: '',
        phone: '',
        role: '',
        createAt: null,
        updateAt: null,
      }),
    );
  };

  React.useEffect(() => {
    if (props.open) {
      dispatch(actions.getAccountDetailRequest(props.id));
    }
  }, [props.open, props.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyleDialog
      open={props.open}
      TransitionComponent={Transition}
      onBackdropClick={handleClose}
    >
      <DialogTitle>
        Xem chi tiết tài khoản
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
      <>
        {errorMessage === 'Không thể xem chi tiết tài khoản!' && (
          <Typography
            sx={{
              mt: '10px',
              mb: '-20px',
              color: 'red',
              textAlign: 'center',
            }}
          >
            {errorMessage}
          </Typography>
        )}
        <DialogContent>
          <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Họ</LabelCustom>
              <FieldCustom>{detailAccount.lastName}</FieldCustom>
            </Box>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Tên</LabelCustom>
              <FieldCustom>{detailAccount.firstName}</FieldCustom>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Tài khoản</LabelCustom>
              <FieldCustom>{detailAccount.username}</FieldCustom>
            </Box>
            <Box sx={{ width: '200px' }}>
              <LabelCustom>Vai trò</LabelCustom>
              <FieldCustom>
                {detailAccount.role === 'ADMIN'
                  ? 'Quản trị viên'
                  : 'Người dùng'}
              </FieldCustom>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Email</LabelCustom>
              <FieldCustom>{detailAccount.email}</FieldCustom>
            </Box>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>SĐT</LabelCustom>
              <FieldCustom>{detailAccount.phone}</FieldCustom>
            </Box>
          </Box>
          <Box sx={{ width: '100%' }}>
            <LabelCustom>Địa chỉ</LabelCustom>
            <FieldCustom>{detailAccount.address}</FieldCustom>
          </Box>

          <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Ngày tạo</LabelCustom>
              <FieldCustom>
                {detailAccount.createAt === null
                  ? null
                  : moment(detailAccount.createAt)
                      .format('DD/MM/YYYY')
                      .toString()}
              </FieldCustom>
            </Box>
            <Box sx={{ width: '100%' }}>
              <LabelCustom>Ngày cập nhật</LabelCustom>
              <FieldCustom>
                {detailAccount.updateAt === null
                  ? null
                  : moment(detailAccount.updateAt)
                      .format('DD/MM/YYYY')
                      .toString()}
              </FieldCustom>
            </Box>
          </Box>
        </DialogContent>
      </>
    </StyleDialog>
  );
}

const StyleDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    backgroundColor: '#FFF',
    backgroundImage: 'none',
    padding: '40px',
    borderRadius: '20px',
    width: '800px',
    minHeight: '600px',
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
      gap: '12px',
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
