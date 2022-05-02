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
import ShowCategory from './components/Show';
import AddCategory from './components/Add';
import EditCategory from './components/Edit';
import DeleteCategory from './components/Delete';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from './slice/selector';
import { useCategorySlice } from './slice';
import Alert from 'app/components/Alert';

export function CategoryPage() {
  const dispatch = useDispatch();
  const {
    listCategory,
    page,
    size,
    total_page,
    addStatus,
    updateStatus,
    deleteStatus,
  } = useSelector(selectCategory);
  const { actions } = useCategorySlice();

  const [reload, setReload] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);
  const [add, setAdd] = React.useState<boolean>(false);
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
    dispatch(actions.deleteCategoryRequest(id));
  };

  React.useEffect(() => {
    if (reload) {
      setReload(false);
      dispatch(actions.getCategoryListRequest({ page, size }));
    }
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    dispatch(actions.getCategoryListRequest({ page, size }));
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (addStatus) {
      setAdd(false);
    }

    if (updateStatus) {
      setEdit(false);
    }

    if (deleteStatus) {
      setRemove(false);
    }

    setID(-1);

    dispatch(
      actions.setDetailCategory({
        name: '',
        description: '',
        createAt: null,
        updateAt: null,
      }),
    );
  }, [addStatus, updateStatus, deleteStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Quản lý danh mục</title>
      </Helmet>
      <Layout>
        <Container>
          <Box
            sx={{
              margin: 'auto',
              mt: '50px',
              maxWidth: '726px',
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
              Danh sách danh mục
            </Box>
            <Button
              variant="contained"
              startIcon={<AddCircleIcon />}
              onClick={() => setAdd(true)}
            >
              Thêm mới
            </Button>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              margin: 'auto',
              marginTop: '20px',
              maxWidth: '726px',
            }}
          >
            <Table sx={{ minWidth: '600px' }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: '150px' }}>
                    Danh mục
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: '300px' }}>
                    Mô tả
                  </StyledTableCell>
                  <StyledTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {listCategory.map((e, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell sx={{ width: '150px' }}>
                      {e.name}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: '300px' }}>
                      {e.description}
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

      <AddCategory open={add} onClose={() => setAdd(false)} />

      {edit && (
        <EditCategory open={edit} id={id} onClose={() => setEdit(false)} />
      )}

      {show && (
        <ShowCategory open={show} id={id} onClose={() => setShow(false)} />
      )}

      {remove && (
        <DeleteCategory
          open={remove}
          handle={handleDelete}
          onClose={() => setRemove(false)}
        />
      )}

      {addStatus && (
        <Alert
          type="success"
          text="Thêm danh mục thành công!"
          isOpen={addStatus}
          handle={() => setReload(true)}
          onClose={() => dispatch(actions.setAddStatus(false))}
        />
      )}

      {updateStatus && (
        <Alert
          type="success"
          text="Cập nhật danh mục thành công!"
          isOpen={updateStatus}
          handle={() => setReload(true)}
          onClose={() => dispatch(actions.setUpdateStatus(false))}
        />
      )}

      {deleteStatus && (
        <Alert
          type="success"
          text="Xoá danh mục thành công!"
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
