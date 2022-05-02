import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TitleBox = styled(Box)(({ theme }) => ({
  margin: '40px 0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '& span': {
    fontSize: '29px',
    lineHeight: '36px',
    fontWeight: 700,
    textTransform: 'capitalize',
  },
}));

export const ViewBox = styled(Box)(({ theme }) => ({
  '& .img_box': {
    border: '2px solid #1976d2',
    borderRadius: '20px',
    padding: '20px',
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > img': {
      maxWidth: '100%',
      maxHeight: '100%',
    },
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  padding: '40px',
  border: '2px solid #1976d2',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

export const LabelBox = styled(Box)(({ theme }) => ({
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
  lineHeight: '20px',
  border: '1px solid rgba(0,0,0,0.3)',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'justify',
}));
