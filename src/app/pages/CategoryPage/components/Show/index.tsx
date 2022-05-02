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
import { selectCategory } from '../../slice/selector';
import { useCategorySlice } from '../../slice';
import moment from 'moment';

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

export default function ShowCategory(props: Props) {
  const dispatch = useDispatch();
  const { errorMessage, detailCategory } = useSelector(selectCategory);
  const { actions } = useCategorySlice();

  const handleClose = () => {
    props.onClose();
    dispatch(
      actions.setDetailCategory({
        name: '',
        description: '',
        createAt: null,
        updateAt: null,
      }),
    );
  };

  React.useEffect(() => {
    if (props.open) {
      dispatch(actions.getCategoryDetailRequest(props.id));
    }
  }, [props.open, props.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyleDialog
      open={props.open}
      TransitionComponent={Transition}
      onBackdropClick={handleClose}
    >
      <DialogTitle>
        Xem chi tiết danh mục
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
        {errorMessage === 'Không thể xem chi tiết danh mục!' && (
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
          <Box>
            <Box className="title">Tên danh mục</Box>
            <Box className="content">{detailCategory.name}</Box>
          </Box>
          <Box>
            <Box className="title">Mô tả</Box>
            <Box className="content">{detailCategory.description}</Box>
          </Box>
          <Box>
            <Box className="title">Ngày tạo</Box>
            <Box className="content">
              {detailCategory.createAt === null
                ? null
                : moment(detailCategory.createAt)
                    .format('DD/MM/YYYY')
                    .toString()}
            </Box>
          </Box>
          <Box>
            <Box className="title">Ngày cập nhật</Box>
            <Box className="content">
              {detailCategory.updateAt === null
                ? null
                : moment(detailCategory.updateAt)
                    .format('DD/MM/YYYY')
                    .toString()}
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
    width: '553px',
    minHeight: '525px',
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

      '& .title': {
        marginBottom: '4px',
        fontSize: '14px',
        lineHeight: '27px',
        fontWeight: 700,
        textTransform: 'capitalize',
      },

      '& .content': {
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
      },
    },
  },
}));
