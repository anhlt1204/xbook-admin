import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Layout from 'app/components/Layout';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { LabelBox, ContentBox, TitleBox, ViewBox, FieldCustom } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useProductSlice } from '../ProductPage/slice';
import { selectProduct } from '../ProductPage/slice/selector';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

export function ViewProductPage() {
  const history = useHistory();

  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();

  const { actions } = useProductSlice();

  const { detailProduct, errorMessage } = useSelector(selectProduct);

  React.useEffect(() => {
    dispatch(actions.getProductDetailRequest(+id));
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Helmet>
        <title>Xem chi tiết sản phẩm</title>
      </Helmet>
      <Layout>
        <Container>
          <TitleBox>
            <span>Xem chi tiết sản phẩm</span>
            <Button variant="outlined" onClick={() => history.push('/product')}>
              Quay lại
            </Button>
          </TitleBox>
          {errorMessage === 'Không thể xem chi tiết sản phẩm!' && (
            <Typography
              component="p"
              sx={{
                mb: '20px',
                color: 'red',
              }}
            >
              {errorMessage}
            </Typography>
          )}
          <Grid container spacing={4} sx={{ pb: '50px' }}>
            <Grid item sm={12} md={7}>
              <ContentBox>
                <Box>
                  <LabelBox>Danh mục</LabelBox>
                  <FieldCustom>{detailProduct.category}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Tên sách</LabelBox>
                  <FieldCustom>{detailProduct.title}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Mô tả</LabelBox>
                  <FieldCustom>{detailProduct.longDescription}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Giá tiền</LabelBox>
                  <FieldCustom>
                    {Number(detailProduct.price).toLocaleString('en-US')}
                  </FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Tác giả</LabelBox>
                  <FieldCustom>{detailProduct.author}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Số trang</LabelBox>
                  <FieldCustom>{detailProduct.numberOfPage}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Số lượng đã bán</LabelBox>
                  <FieldCustom>{detailProduct.quantitySelled}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Số lượng hiện tại</LabelBox>
                  <FieldCustom>{detailProduct.currentNumber}</FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Ngày tạo</LabelBox>
                  <FieldCustom>
                    {detailProduct.createAt === null
                      ? null
                      : moment(detailProduct.createAt)
                          .format('DD/MM/YYYY')
                          .toString()}
                  </FieldCustom>
                </Box>

                <Box>
                  <LabelBox>Ngày cập nhật</LabelBox>
                  <FieldCustom>
                    {detailProduct.updateAt === null
                      ? null
                      : moment(detailProduct.updateAt)
                          .format('DD/MM/YYYY')
                          .toString()}
                  </FieldCustom>
                </Box>
              </ContentBox>
            </Grid>
            <Grid item sm={12} md={5}>
              <ViewBox>
                <Box className="img_box">
                  <img
                    src={
                      detailProduct.images[detailProduct.images.length - 1]
                        ?.link
                    }
                    alt={detailProduct.title}
                  />
                </Box>
              </ViewBox>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </>
  );
}
