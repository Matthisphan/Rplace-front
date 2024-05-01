import { useState, SyntheticEvent, FocusEvent } from 'react';
import { Button, FormHelperText, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, IconButton } from '@mui/material';
import * as Yup from 'yup';
import { Formik, FormikErrors } from 'formik';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type ErrorType = {
  username?: string;
  password?: string;
};

export default function AuthLogin() {
  const navigate = useNavigate();
  const [capsWarning, setCapsWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const onKeyDown = (keyEvent: any) => {
    if (keyEvent.getModifierState('CapsLock')) {
      setCapsWarning(true);
    } else {
      setCapsWarning(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required('Username is required'),
          password: Yup.string().max(255).required('Password is required'),
        })}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          let username = values.username;
          let password = values.password;
          try {
            const response = fetch(`${process.env.REACT_APP_API_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });
            const data = response.then((data) => data.json());
            response.then((res) => {
              if (res.status === 200) {
                data.then((data) => {
                  localStorage.setItem('tokens', JSON.stringify(data.token));
                });
                localStorage.setItem('username', JSON.stringify(username));
                navigate('/grid');
              } else {
                const errors: FormikErrors<ErrorType> = {
                  username: 'username or password is incorrect',
                  password: 'username or password is incorrect',
                };
                setErrors(errors);
              }
            });
          } catch (error) {
            console.error('There was an error!', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="Username">Username</InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username"
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
                    color={capsWarning ? 'warning' : 'primary'}
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={(event: FocusEvent<any, Element>) => {
                      setCapsWarning(false);
                      handleBlur(event);
                    }}
                    onKeyDown={onKeyDown}
                    onChange={handleChange}
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
                  {capsWarning && (
                    <Typography variant="caption" sx={{ color: 'warning.main' }} id="warning-helper-text-password-login">
                      Caps lock on!
                    </Typography>
                  )}
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.username && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.username}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
