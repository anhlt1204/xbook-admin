import React from 'react';
import {
  ItemBuyImage,
  ItemBuyName,
  ItemBuyPrice,
  ItemBuyWrapper,
} from './style';
import { Box, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

interface Props {
  productID: number;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export default function ItemBuy(props: Props) {
  const { productID, image, title, price, quantity } = props;

  const history = useHistory();

  const onHandle = () => history.push(`/product-detail/${productID}`);

  return (
    <ItemBuyWrapper onClick={onHandle} sx={{ cursor: 'pointer' }}>
      <ItemBuyImage>
        <img src={image} alt="img" />
      </ItemBuyImage>
      <Box>
        <ItemBuyName>{title}</ItemBuyName>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <ItemBuyPrice>{price.toLocaleString('en-US')} VNĐ</ItemBuyPrice>
          <Typography component="p">x{quantity}</Typography>
        </Box>
      </Box>
    </ItemBuyWrapper>
  );
}
