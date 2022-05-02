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
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import Layout from 'app/components/Layout';
import React from 'react';

import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccount } from './slice/selector';
import { useAccountSlice } from './slice';
import ShowAccount from './components/Show';
import EditProduct from './components/Edit';
import DeleteAccount from './components/Delete';
import Alert from 'app/components/Alert';

export function AccountPage() {
  const dispatch = useDispatch();

  const { listAccount, page, size, total_page, updateStatus, deleteStatus } =
    useSelector(selectAccount);

  const { actions } = useAccountSlice();

  const [reload, setReload] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<boolean>(false);
  const [remove, setRemove] = React.useState<boolean>(false);
  const [id, setID] = React.useState<number>(-1);

  const handleOpenShow = id => {
    dispatch(actions.setErrorMessage(''));
    setID(id);
    setShow(true);
  };

  const handleOpenUpdate = id => {
    dispatch(actions.setErrorMessage(''));
    setID(id);
    setEdit(true);
  };

  const handleOpenDelete = id => {
    dispatch(actions.setErrorMessage(''));
    setID(id);
    setRemove(true);
  };

  const handleDelete = () => {
    dispatch(actions.deleteAccountRequest(id));
  };

  React.useEffect(() => {
    if (reload) {
      setReload(false);
      dispatch(actions.getAccountListRequest({ page, size }));
    }
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    dispatch(actions.getAccountListRequest({ page, size }));
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (updateStatus) {
      setEdit(false);
    }

    if (deleteStatus) {
      setRemove(false);
    }

    setID(-1);

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
  }, [updateStatus, deleteStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Quản lý tài khoản</title>
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
              Danh sách tài khoản
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              margin: 'auto',
              marginTop: '20px',
            }}
          >
            <Table sx={{ minWidth: '700px' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: '100px' }}>Họ</StyledTableCell>
                  <StyledTableCell sx={{ width: '100px' }}>Tên</StyledTableCell>
                  <StyledTableCell sx={{ width: '170px' }}>
                    Tài khoản
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '230px' }}>
                    Email
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '150px' }}>SĐT</StyledTableCell>
                  <StyledTableCell sx={{ width: '250px' }}>
                    Địa chỉ
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {listAccount.map((e, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell sx={{ width: '100px' }}>
                      {e.lastName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '100px' }}>
                      {e.firstName}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '150px' }}>
                      {e.username}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '200px' }}>
                      {e.email}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '150px' }}>
                      {e.phone}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '250px' }}>
                      {e.address}
                    </StyledTableCell>
                    <StyledTableCell>
                      <Stack direction="row" spacing={2}>
                        <IconButton onClick={() => handleOpenShow(e.id)}>
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleOpenUpdate(e.id)}>
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

      {show && (
        <ShowAccount open={show} id={id} onClose={() => setShow(false)} />
      )}

      {edit && (
        <EditProduct open={edit} id={id} onClose={() => setEdit(false)} />
      )}

      {remove && (
        <DeleteAccount
          open={remove}
          handle={handleDelete}
          onClose={() => setRemove(false)}
        />
      )}

      {updateStatus && (
        <Alert
          type="success"
          text="Cập nhật tài khoản thành công!"
          isOpen={updateStatus}
          handle={() => setReload(true)}
          onClose={() => dispatch(actions.setUpdateStatus(false))}
        />
      )}

      {deleteStatus && (
        <Alert
          type="success"
          text="Xoá danh tài khoản thành công!"
          isOpen={deleteStatus}
          handle={() => setReload(true)}
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
