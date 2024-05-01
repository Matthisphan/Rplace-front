import { Grid, Link, Stack, Typography } from '@mui/material';
import AuthLogin from './AuthLogin';
import AuthCard from '../Card/AuthCard';

export default function Login() {
  return (
    <AuthCard>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Login</Typography>
            <Link variant="body1" color="primary" href="/register">
              Don&apos;t have an account?
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthCard>
  );
}
