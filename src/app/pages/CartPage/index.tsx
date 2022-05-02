import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import Layout from 'app/components/Layout';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'app/components/Alert';
import { useCartSlice } from './slice';
import { selectCart } from './slice/selector';
import EditCart from './Edit';

const configDelivery = value => {
  switch (value) {
    case 1:
      return { text: 'Đặt hàng', color: '#000' };
    case 2:
      return { text: 'Chờ xác nhận', color: '#ff9800' };
    case 3:
      return { text: 'Đang giao hàng', color: '#03a9f4' };
    case 4:
      return { text: 'Hoàn thành', color: '#4caf50' };

    default:
      return { text: 'Mới', color: '#000' };
  }
};

export function CartPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { actions } = useCartSlice();

  const { page, listCart, total_page, updateStatus } = useSelector(selectCart);

  const [edit, setEdit] = React.useState<boolean>(false);
  const [id, setId] = React.useState<number>(-1);
  const [textStatus, setTextStatus] = React.useState<any>({
    text: '',
    color: '',
  });

  const handleOpenUpdate = (value, id) => {
    if (value < 4) {
      dispatch(actions.setErrorMessage(''));
      setId(id);
      setTextStatus({
        text: configDelivery(value + 1).text,
        color: configDelivery(value + 1).color,
      });
      setEdit(true);
    }
  };

  React.useEffect(() => {
    if (updateStatus) {
      setId(-1);
      setTextStatus({
        text: '',
        color: '',
      });
      setEdit(false);
    }
  }, [updateStatus]);

  return (
    <>
      <Helmet>
        <title>Quản lý đơn hàng</title>
      </Helmet>
      <Layout>
        <Container>
          <Box
            sx={{
              margin: 'auto',
              mt: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                fontSize: '24px',
                lineHeight: '28px',
                fontWeight: 700,
                textTransform: 'capitalize',
              }}
            >
              Danh sách đơn hàng
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              margin: 'auto',
              marginTop: '20px',
            }}
          >
            <Table sx={{ minWidth: '600px' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: '80px' }}>ID</StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>
                    Người nhận
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>SĐT</StyledTableCell>
                  <StyledTableCell sx={{ width: '300px' }}>
                    Địa chỉ
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>
                    Trạng thái
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {listCart.map((e, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell sx={{ width: '80px' }}>
                      {e.id}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '200px' }}>
                      {e.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '200px' }}>
                      {e.phone}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '300px' }}>
                      {e.customerAddress}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        width: '200px',
                        color: `${configDelivery(e.delivery.id).color}`,
                      }}
                    >
                      {configDelivery(e.delivery.id).text}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          onClick={() => history.push(`/view-cart/${e.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          disabled={e.delivery.id === 4}
                          onClick={() => {
                            handleOpenUpdate(e.delivery.id, e.id);
                          }}
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationCustom>
            <Box>
              <Box
                onClick={
                  page === 1
                    ? () => {}
                    : () => dispatch(actions.setPage(page - 1))
                }
                className={page === 1 ? 'disable' : 'active'}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </Box>
              <Box>{page}</Box>
              <Box
                onClick={
                  page === total_page
                    ? () => {}
                    : () => dispatch(actions.setPage(page + 1))
                }
                className={page === total_page ? 'disable' : 'active'}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </Box>
            </Box>
          </PaginationCustom>
        </Container>
      </Layout>

      {edit && (
        <EditCart
          open={edit}
          text={textStatus.text}
          color={textStatus.color}
          handle={() => dispatch(actions.updateCartRequest(id))}
          onClose={() => setEdit(false)}
        />
      )}

      {updateStatus && (
        <Alert
          type="success"
          text="Cập nhật đơn háng thành công!"
          isOpen={updateStatus}
          handle={() => {}}
          onClose={() => dispatch(actions.setUpdateStatus(false))}
        />
      )}
    </>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#1976d2',
    color: '#FFF',
  },

  '&.MuiTableCell-body': {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgb(224, 224, 224)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PaginationCustom = styled(Box)(({ theme }) => ({
  marginTop: '40px',
  paddingBottom: '30px',

  display: 'flex',
  justifyContent: 'center',

  '& > div': {
    height: '30px',
    display: 'flex',

    '& > div': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '30px',
      width: '30px',
      padding: '0px',
      border: '1px solid #000',
      color: '#000',
      cursor: 'pointer',

      '&.active': {
        '&:hover': {
          background: '#1976d2',

          '& .MuiSvgIcon-root': {
            color: '#FFF',
          },
        },
      },

      '&.disable': {
        background: 'rgba(234,231,231,0.9)',
        border: '1px solid rgba(234,231,231,0.9)',
        cursor: 'unset',

        '& .MuiSvgIcon-root': {
          color: '#FFF',
        },
      },
    },
  },
}));
