import {
  Box,
  Button,
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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import Layout from 'app/components/Layout';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct } from './slice/selector';
import { useProductSlice } from './slice';
import DeleteProduct from './DeleteProduct';
import Alert from 'app/components/Alert';

export function ProductPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const {
    listProduct,
    page,
    size,
    total_page,
    deleteStatus,
    addStatus,
    updateStatus,
  } = useSelector(selectProduct);

  const { actions } = useProductSlice();

  const [remove, setRemove] = React.useState<boolean>(false);
  const [id, setID] = React.useState<number>(-1);

  const handleOpenDelete = id => {
    dispatch(actions.setErrorMessage(''));
    setID(id);
    setRemove(true);
  };

  const handleDelete = () => {
    dispatch(actions.deleteProductRequest(id));
  };

  React.useEffect(() => {
    if (deleteStatus) {
      setRemove(false);
    }

    dispatch(
      actions.setDetailProduct({
        createAt: null,
        updateAt: null,
        title: '',
        longDescription: '',
        categoryId: -1,
        category: '',
        price: 0,
        author: '',
        currentNumber: 0,
        numberOfPage: 0,
        quantitySelled: 0,
        images: [{ link: '' }],
      }),
    );

    dispatch(actions.getProductListRequest({ page, size }));
  }, [page, deleteStatus, addStatus, updateStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Quản lý sản phẩm</title>
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
              Danh sách sản phẩm
            </Box>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => history.push('/add-product')}
            >
              Thêm mới
            </Button>
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
                  <StyledTableCell sx={{ width: '150px' }}>Ảnh</StyledTableCell>
                  <StyledTableCell sx={{ width: '300px' }}>
                    Tên sách
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>
                    Tác giả
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '200px' }}>
                    Giá tiền (VNĐ)
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {listProduct.map((e, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell
                      sx={{
                        width: '150px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {e.images[e.images.length - 1]?.link && (
                        <img
                          src={e.images[e.images.length - 1].link}
                          alt="Ảnh"
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            height: '100px',
                          }}
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '300px' }}>
                      {e.title}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '200px' }}>
                      {e.author}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '200px' }}>
                      {Number(e.price).toLocaleString('en-US')}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton
                          onClick={() => history.push(`/view-product/${e.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => history.push(`/edit-product/${e.id}`)}
                        >
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenDelete(e.id)}>
                          <DeleteIcon />
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

      {remove && (
        <DeleteProduct
          open={remove}
          handle={handleDelete}
          onClose={() => setRemove(false)}
        />
      )}

      {deleteStatus && (
        <Alert
          type="success"
          text="Xoá sản phẩm thành công!"
          isOpen={deleteStatus}
          handle={() => {}}
          onClose={() => dispatch(actions.setDeleteStatus(false))}
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
