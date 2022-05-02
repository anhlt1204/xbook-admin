import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import Layout from 'app/components/Layout';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  RightBox,
  FormBox,
  InputCustom,
  LabelBox,
  ContentBox,
  LeftBox,
} from './style';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from '../LoginPage/slice/selector';
import { useCategorySlice } from '../CategoryPage/slice';
import { selectCategory } from '../CategoryPage/slice/selector';
import { useProductSlice } from '../ProductPage/slice';
import { selectProduct } from '../ProductPage/slice/selector';
import { useHistory, useParams } from 'react-router-dom';
import Alert from 'app/components/Alert';

interface IForm {
  title: string;
  longDescription: string;
  price: number;
  author: string;
  currentNumber: number;
  numberOfPage: number;
}

export function UpdateProductPage() {
  const schema = yup.object().shape({
    title: yup
      .string()
      .required('Không thể bỏ trống!')
      .max(200, 'Chỉ 200 kí tự!'),
    longDescription: yup.string().required('Không thể bỏ trống!'),
    price: yup
      .number()
      .typeError('Phải là một số!')
      .required('Không thể bỏ trống!')
      .integer('Là một số nguyên!')
      .min(0, 'Không nhỏ hơn 0!'),
    author: yup
      .string()
      .required('Không thể bỏ trống!')
      .max(50, 'Chỉ 50 kí tự!'),
    currentNumber: yup
      .number()
      .typeError('Phải là một số!')
      .required('Không thể bỏ trống!')
      .integer('Là một số nguyên!')
      .min(1, 'Phải lớn hơn 0!'),
    numberOfPage: yup
      .number()
      .typeError('Phải là một số!')
      .required('Không thể bỏ trống!')
      .integer('Là một số nguyên!')
      .min(1, 'Phải lớn hơn 0!'),
  });

  const form = useForm<IForm>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const { actions } = useProductSlice();

  const { actions: categoryActions } = useCategorySlice();

  const { user } = useSelector(selectLogin);

  const { listCategory } = useSelector(selectCategory);

  const { updateStatus, errorMessage, detailProduct, uploadImageLink } =
    useSelector(selectProduct);

  const [valSelect, setValSelect] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValSelect(event.target.value);
  };

  const handleChangeImage = e => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);

    dispatch(actions.uploadImageRequest(formData));
  };

  const onSubmit = (data: IForm) => {
    dispatch(
      actions.updateProductRequest({
        id,
        data: {
          author: data.author,
          categoryId: valSelect,
          currentNumber: data.currentNumber,
          longDescription: data.longDescription,
          numberOfPage: data.numberOfPage,
          price: data.price,
          quantitySelled: 0,
          shortDescription: '',
          title: data.title,
          username: user?.username,
          image: uploadImageLink,
        },
      }),
    );
  };

  React.useEffect(() => {
    if (listCategory.length === 0) {
      dispatch(categoryActions.getCategoryListRequest({ page: '', size: '' }));
    }

    if (detailProduct.title === '') {
      dispatch(actions.getProductDetailRequest(+id));
    }

    setValSelect(`${detailProduct.categoryId}`);

    dispatch(
      actions.setUploadImageLink(
        detailProduct.images[detailProduct.images.length - 1]?.link,
      ),
    );

    form.reset({
      ...detailProduct,
    });
  }, [id, detailProduct.categoryId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Sửa sản phẩm</title>
      </Helmet>
      <Layout>
        <Container>
          <ContentBox>
            <span>Sửa sản phẩm</span>
            <Button variant="outlined" onClick={() => history.push('/product')}>
              Quay lại
            </Button>
          </ContentBox>
          <Grid container spacing={4} sx={{ pb: '50px' }}>
            <Grid item sm={12} md={7}>
              <RightBox>
                <FormBox onSubmit={form.handleSubmit(onSubmit)}>
                  <Box>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleChangeImage}
                      style={{ width: '100%' }}
                    />

                    {errorMessage === 'Tải ảnh thất bại!' && (
                      <Typography
                        component="p"
                        sx={{ mt: '5px', color: 'red' }}
                      >
                        {errorMessage}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <LabelBox>Danh mục</LabelBox>
                    <Select
                      value={valSelect}
                      onChange={handleChange}
                      sx={{ width: '100%', height: '52px' }}
                    >
                      {listCategory.map((e, i) => (
                        <MenuItem value={e.id} key={i}>
                          {e.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>

                  <Box>
                    <LabelBox>Tên sách</LabelBox>
                    <InputCustom
                      {...form.register('title')}
                      type="text"
                      fullWidth
                      autoComplete="off"
                      defaultValue={detailProduct.title}
                      error={Boolean(form.formState.errors.title)}
                      helperText={form.formState.errors.title?.message}
                    />
                  </Box>

                  <Box>
                    <LabelBox>Mô tả</LabelBox>
                    <InputCustom
                      {...form.register('longDescription')}
                      type="text"
                      fullWidth
                      multiline
                      autoComplete="off"
                      defaultValue={detailProduct.longDescription}
                      error={Boolean(form.formState.errors.longDescription)}
                      helperText={
                        form.formState.errors.longDescription?.message
                      }
                      sx={{
                        '.MuiOutlinedInput-root': {
                          height: 'auto',
                        },
                      }}
                    />
                  </Box>

                  <Box>
                    <LabelBox>Giá tiền</LabelBox>
                    <InputCustom
                      {...form.register('price')}
                      type="number"
                      fullWidth
                      autoComplete="off"
                      defaultValue={detailProduct.price}
                      error={Boolean(form.formState.errors.price)}
                      helperText={form.formState.errors.price?.message}
                    />
                  </Box>

                  <Box>
                    <LabelBox>Tác giả</LabelBox>
                    <InputCustom
                      {...form.register('author')}
                      type="text"
                      fullWidth
                      autoComplete="off"
                      defaultValue={detailProduct.author}
                      error={Boolean(form.formState.errors.author)}
                      helperText={form.formState.errors.author?.message}
                    />
                  </Box>

                  <Box>
                    <LabelBox>Số trang</LabelBox>
                    <InputCustom
                      {...form.register('numberOfPage')}
                      type="number"
                      fullWidth
                      autoComplete="off"
                      defaultValue={detailProduct.numberOfPage}
                      error={Boolean(form.formState.errors.numberOfPage)}
                      helperText={form.formState.errors.numberOfPage?.message}
                    />
                  </Box>

                  <Box>
                    <LabelBox>Số lượng</LabelBox>
                    <InputCustom
                      {...form.register('currentNumber')}
                      type="number"
                      fullWidth
                      autoComplete="off"
                      defaultValue={detailProduct.currentNumber}
                      error={Boolean(form.formState.errors.currentNumber)}
                      helperText={form.formState.errors.currentNumber?.message}
                    />
                  </Box>

                  <Box sx={{ width: '100%' }}>
                    {errorMessage !== '' && (
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
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{
                        marginTop: '20px',
                        height: '50px',
                        width: '100%',
                        borderRadius: '8px',
                      }}
                    >
                      Cập nhật
                    </Button>
                  </Box>
                </FormBox>
              </RightBox>
            </Grid>
            <Grid item sm={12} md={5}>
              <LeftBox>
                <Box className="img_box">
                  <img src={uploadImageLink} alt={detailProduct.title} />
                </Box>
              </LeftBox>
            </Grid>
          </Grid>
        </Container>
      </Layout>

      {updateStatus && (
        <Alert
          type="success"
          text="Cập nhật sản phẩm thành công!"
          isOpen={updateStatus}
          handle={() => history.push('/product')}
          onClose={() => dispatch(actions.setUpdateStatus(false))}
        />
      )}
    </>
  );
}
