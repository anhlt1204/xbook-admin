import { Box, TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/system';

export const ContentBox = styled(Box)(({ theme }) => ({
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

export const LeftBox = styled(Box)(({ theme }) => ({
  '& .img_box': {
    border: '2px solid blue',
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

export const RightBox = styled(Box)(({ theme }) => ({
  padding: '40px',
  border: '2px solid blue',
  borderRadius: '20px',
}));

export const FormBox = styled('form')(({ theme }) => ({
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

export const InputCustom = styled(TextField)<TextFieldProps>(({ theme }) => ({
  height: 'auto',
  width: '100%',
  fontSize: '16px',
  lineHeight: '15px',
  fontWeight: 700,

  // css for TextField

  '.MuiOutlinedInput-root': {
    height: '52px',

    '.MuiInputAdornment-root': {
      margin: '0px',
      '& button': {
        margin: '0px',
        padding: '0px',
      },
    },

    input: {
      height: '100%',
      padding: '0px 16px',
    },

    fieldset: {
      borderRadius: '6px',
    },
  },
}));
