import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TitleCustom = styled(Box)(({ theme }) => ({
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

export const ListBox = styled(Box)(({ theme }) => ({
  marginBottom: '50px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const ListItem = styled(Box)(({ theme }) => ({
  padding: '20px 0px',
  width: '100%',
  height: '320px',
  border: '2px solid blue',
  borderRadius: '30px',

  '& .inner_list': {
    width: '100%',
    height: '100%',
    padding: '10px 30px',
    display: 'flex',
    gap: '15px',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
}));

export const ContentStyle = styled(Box)(({ theme }) => ({
  padding: '40px',
  border: '2px solid blue',
  borderRadius: '20px',
  display: 'flex',
  gap: '50px',

  '& > div': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
}));

export const LabelStyle = styled(Box)(({ theme }) => ({
  marginBottom: '4px',
  fontSize: '14px',
  lineHeight: '27px',
  fontWeight: 700,
}));

export const FieldStyle = styled(Box)(({ theme }) => ({
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
}));
