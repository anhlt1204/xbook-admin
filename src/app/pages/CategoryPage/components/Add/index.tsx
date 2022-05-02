import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Box, styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../slice/selector';
import { useCategorySlice } from '../../slice';
import { selectLogin } from 'app/pages/LoginPage/slice/selector';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  onClose: () => void;
}

interface IForm {
  name: string;
  description: string;
}

export default function AddCategory(props: Props) {
  const schema = yup.object().shape({
    name: yup.string().required('Không thể bỏ trống!').max(25, 'Chỉ 50 kí tự!'),
    description: yup.string().max(255, 'Chỉ 255 kí tự!'),
  });

  const form = useForm<IForm>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const { errorMessage } = useSelector(selectCategory);
  const { user } = useSelector(selectLogin);
  const { actions } = useCategorySlice();

  const onSubmit = (data: IForm) => {
    dispatch(
      actions.addCategoryRequest({
        description: data.description,
        name: data.name,
        parentsId: 0,
        username: user?.username,
      }),
    );
  };

  React.useEffect(() => {
    form.reset();
  }, [props.open]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StyleDialog
      open={props.open}
      TransitionComponent={Transition}
      onBackdropClick={() => props.onClose()}
    >
      <DialogTitle>
        Thêm danh mục
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            position: 'absolute',
            right: 24,
            top: 24,
            height: '15px',
            width: '15px',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormStyle onSubmit={form.handleSubmit(onSubmit)}>
          <Box sx={{ width: '100%' }}>
            <LabelStyle>Tên danh mục *</LabelStyle>
            <InputStyle
              type="text"
              autoComplete="off"
              {...form.register('name')}
              error={Boolean(form.formState.errors.name)}
              helperText={form.formState.errors.name?.message}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            <LabelStyle>Mô tả</LabelStyle>
            <InputStyle
              type="text"
              autoComplete="off"
              multiline
              {...form.register('description')}
              error={Boolean(form.formState.errors.description)}
              helperText={form.formState.errors.description?.message}
              sx={{
                '.MuiOutlinedInput-root': {
                  height: 'auto',
                },
              }}
            />
          </Box>

          <Box sx={{ width: '100%' }}>
            {errorMessage === 'Thêm danh mục thất bại!' && (
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
              Thêm mới
            </Button>
          </Box>
        </FormStyle>
      </DialogContent>
    </StyleDialog>
  );
}

const StyleDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    padding: '40px',
    borderRadius: '20px',
    width: '553px',
    minHeight: '442px',
    overflowY: 'hidden',

    '& h2': {
      padding: '0px',
      fontSize: '24px',
      lineHeight: '28px',
      fontWeight: 700,
      textTransform: 'capitalize',
    },
  },
}));

const FormStyle = styled('form')(({ theme }) => ({
  paddingTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
}));

const LabelStyle = styled(Box)(({ theme }) => ({
  marginBottom: '4px',
  fontSize: '14px',
  lineHeight: '27px',
  fontWeight: 700,
  textTransform: 'capitalize',
}));

const InputStyle = styled(TextField)<TextFieldProps>(({ theme }) => ({
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
