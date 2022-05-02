import { Box, Button, Container } from '@mui/material';
import Layout from 'app/components/Layout';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ContentStyle,
  FieldStyle,
  LabelStyle,
  ListBox,
  ListItem,
  TitleCustom,
} from './style';
import ItemBuy from 'app/components/ItemCart';
import { useSelector } from 'react-redux';
import { selectCart } from '../CartPage/slice/selector';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';

const configDelivery = id => {
  switch (id) {
    case 0:
      return { text: 'Đặt hàng', color: '#000' };
    case 1:
      return { text: 'Chờ xác nhận', color: '#ff9800' };
    case 3:
      return { text: 'Đang giao hàng', color: '#03a9f4' };
    case 4:
      return { text: 'Hoàn thành', color: '#4caf50' };

    default:
      return { text: 'Mới', color: '#000' };
  }
};

export function ViewCartPage() {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { listCart } = useSelector(selectCart);

  const detail = listCart.find(e => e.id === Number(id));

  return (
    <>
      <Helmet>
        <title>Xem chi tiết đơn hàng</title>
      </Helmet>
      <Layout>
        <Container>
          <TitleCustom>
            <span>Xem chi tiết đơn hàng</span>
            <Button variant="outlined" onClick={() => history.push('/cart')}>
              Quay lại
            </Button>
          </TitleCustom>

          {detail && (
            <>
              <ListBox>
                <Box
                  sx={{
                    mb: '20px',
                    width: '100%',
                    fontSize: '20px',
                    lineHeight: '24px',
                    fontWeight: 700,
                    textTransform: 'capitalize',
                  }}
                >
                  Danh sách sản phẩm
                </Box>
                <ListItem>
                  <Box className="inner_list">
                    {detail.orderItems.map((e, i) => (
                      <ItemBuy
                        productID={e.product.id}
                        image={
                          e.product.product_images[
                            e.product.product_images.length - 1
                          ].imageUrl
                        }
                        title={e.product.title}
                        price={e.product.price}
                        quantity={e.quantity}
                        key={i}
                      />
                    ))}
                  </Box>
                </ListItem>
              </ListBox>

              <ContentStyle>
                <Box>
                  <Box
                    sx={{
                      mb: '20px',
                      width: '100%',
                      fontSize: '20px',
                      lineHeight: '24px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                    }}
                  >
                    Thông tin người nhận
                  </Box>
                  <Box>
                    <LabelStyle>Họ tên</LabelStyle>
                    <FieldStyle>{detail.name}</FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>SĐT</LabelStyle>
                    <FieldStyle>{detail.phone}</FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>Địa chỉ</LabelStyle>
                    <FieldStyle>{detail.customerAddress}</FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>Tổng tiền</LabelStyle>
                    <FieldStyle sx={{ color: '#F04F5B' }}>
                      {detail.totalPrice.toLocaleString('en-US')} VNĐ
                    </FieldStyle>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      mb: '20px',
                      width: '100%',
                      fontSize: '20px',
                      lineHeight: '24px',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                    }}
                  >
                    Thông tin khác
                  </Box>
                  <Box>
                    <LabelStyle>Trạng thái đơn hàng</LabelStyle>
                    <FieldStyle
                      sx={{
                        color: `${configDelivery(detail.delivery.id).color}`,
                      }}
                    >
                      {configDelivery(detail.delivery.id).text}
                    </FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>Ngày tạo</LabelStyle>
                    <FieldStyle>
                      {detail.createAt === '' || detail.createAt === null
                        ? null
                        : moment(detail.createAt)
                            .format('DD/MM/YYYY')
                            .toString()}
                    </FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>Tạo bởi</LabelStyle>
                    <FieldStyle>{detail.createBy}</FieldStyle>
                  </Box>

                  <Box>
                    <LabelStyle>Cập nhật cuối cùng</LabelStyle>
                    <FieldStyle>
                      {detail.updateAt === '' || detail.updateAt === null
                        ? null
                        : moment(detail.updateAt)
                            .format('DD/MM/YYYY')
                            .toString()}
                    </FieldStyle>
                  </Box>
                </Box>
              </ContentStyle>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
}
