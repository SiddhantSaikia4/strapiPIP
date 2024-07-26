import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { fetcher } from '../lib/api';
import { setToken } from '../lib/auth';
import { useUser } from '../lib/authContext';

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [data, setData] = React.useState({
    identifier: '',
    password: '',
  });
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            identifier: data.identifier,
            password: data.password,
          }),
        }
      );

      if (responseData.jwt) {
        console.log('Logged in user:', responseData.user); 
        setToken(responseData); // Store the token
        console.log('Redirecting to home page...');
        router.push('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      setError('Incorrect email or password');
      console.error('Login error:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  React.useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to home page if user is already logged in
    }
  }, [user, router]);

  const buttonStyle = {
    mt: 3,
    mb: 2,
    width: '100%', // Make button width 100%
    color: '#fff',
    borderRadius: '20px',
    '&:hover': {
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
      opacity: 0.8,
    },
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container style={{ height: '100vh' }}>
        {/* Left side */}
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* You can add content here for the left side if needed */}
        </Grid>

        {/* Right side */}
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '70%' }} // Adjust width of form container
          >
          <Grid container direction="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
              <Typography component="h1" variant="h5">
              Sign In
              </Typography>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="identifier"
              autoComplete="email"
              autoFocus
              value={data.identifier}
              onChange={handleChange}
              sx={{ mb: 2 }} // Add margin bottom to TextField
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleChange}
              sx={{ mb: 2 }} // Add margin bottom to TextField
            />
            <Grid container alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
              <Link href="/forgot-password" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Button
              type="submit"
              variant="outlined"
              onClick={() => {
                console.log('Redirecting to home page...');
                router.push('/');
              }}
              style={{   background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',}}
              sx={{
                ...buttonStyle,
                background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
             
              }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: '20px',
                borderColor: '#000',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#000',
              }}
            >
              <img src="/google.png" alt="Google Icon" style={{ marginRight: '8px' , height: '10px', width: '10px' }} />
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mb: 2,
                borderRadius: '20px',
                borderColor: '#000',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#000',
              }}
            >
             <img src="/discord.png" alt="Google Icon" style={{ marginRight: '8px' , height: '10px', width: '10px' }} />
              Join the Discord
            </Button>
            <Grid container justifyContent="center">
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign up for free"}
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
