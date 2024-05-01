import { useState, SyntheticEvent, useEffect } from 'react';
import {
  Box,
  Button,
  FormHelperText,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik, FormikErrors } from 'formik';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { StringColorProps } from '../../types/password';
import { useNavigate } from 'react-router-dom';

type ErrorType = {
  email?: string;
  password?: string;
};

export default function AuthRegister() {
  const navigate = useNavigate();
  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          let username = values.username;
          let password = values.password;
          fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          }).then((res) => {
            if (res.status === 201) {
              navigate('/login');
            } else {
              if (res.status === 409) {
                const errors: FormikErrors<ErrorType> = { email: 'Email already exists', password: 'Email already exists' };
                setErrors(errors);
              } else if (res.status === 400) {
                res.json().then((res) => {
                  const errors: FormikErrors<ErrorType> = { password: res.error };
                  setErrors(errors);
                });
              }
              const errors: FormikErrors<ErrorType> = {
                email: 'Email or password is incorrect',
                password: 'Email or password is incorrect',
              };
              setErrors(errors);
            }
            setSubmitting(false);
          });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="username-login">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="text"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-username-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      changePassword(e.target.value);
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level?.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </FormControl>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
