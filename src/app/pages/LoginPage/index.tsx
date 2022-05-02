import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useLoginSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from './slice/selector';
import { styled } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface LoginForm {
  username: string;
  password: string;
}

export function LoginPage() {
  const schema = yup.object().shape({
    username: yup.string().required('Không thể bỏ trống!'),

    password: yup
      .string()
      .required('Không thể bỏ trống!')
      .max(50, 'Không quá 50 kí tự!'),
  });

  const form = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { actions } = useLoginSlice();

  const loginSelect = useSelector(selectLogin);

  const [messageError, setMessageError] = React.useState('');
  const [show, setShow] = React.useState(false);

  const onSubmit = (data: LoginForm) => {
    setMessageError('');
    dispatch(
      actions.loginRequest({
        username: data.username,
        password: data.password,
      }),
    );
  };

  React.useEffect(() => {
    if (loginSelect.success) {
      window.location.href = '/';
      return;
    }

    switch (loginSelect.errorMessage) {
      case 'INVALID_CREDENTIALS':
        setMessageError('Sai tài khoản  hoặc mật khẩu!');
        break;

      case 'Not admin':
        setMessageError('Không phải tài khoản quản trị viên!');
        break;

      default:
        setMessageError('Đăng nhập thất bại!');
        break;
    }
  }, [loginSelect.success, loginSelect.errorMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <LoginBox>
          <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
            <InputStyle
              {...form.register('username')}
              type="text"
              label="Tài khoản"
              fullWidth
              autoComplete="off"
              error={Boolean(form.formState.errors.username)}
              helperText={form.formState.errors.username?.message}
            />

            <InputStyle
              {...form.register('password')}
              type={show ? 'text' : 'password'}
              label="Mật khẩu"
              fullWidth
              autoComplete="off"
              error={Boolean(form.formState.errors.password)}
              helperText={form.formState.errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => setShow(!show)} tabIndex={-1}>
                      {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',

                p: {
                  textAlign: 'center',
                  color: 'red',
                },

                button: {
                  width: '100%',
                  height: '48px',
                },
              }}
            >
              {loginSelect.errorMessage !== '' && (
                <Typography component="span">{messageError}</Typography>
              )}

              {loginSelect.loading ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress color="info" />
                </Box>
              ) : (
                <Button type="submit" variant="contained">
                  Đăng nhập
                </Button>
              )}
            </Box>
          </form>
        </LoginBox>
      </Box>
    </Container>
  );
}

const LoginBox = styled(Box)(({ theme }) => ({
  width: '450px',
  height: 'auto',
  padding: '50px',
  border: `1px solid blue`,
  borderRadius: '30px',

  '.form': {
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
  },
}));

const InputStyle = styled(TextField)<TextFieldProps>(({ theme }) => ({
  height: 'auto',
  width: '100%',
  fontSize: '16px',
  lineHeight: '15px',
  fontWeight: 700,

  // css for TextField

  '.MuiOutlinedInput-root': {
    height: '48px',

    '.MuiInputAdornment-root': {
      margin: '0px',
    },

    input: {
      height: '100%',
      padding: '0px 14px',
    },

    fieldset: {
      borderRadius: '6px',
    },
  },
}));
