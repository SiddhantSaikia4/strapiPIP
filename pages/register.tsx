import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { setToken } from '../lib/auth';
import { fetcher } from '../lib/api';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MenuItem } from '@mui/material';

const Register = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    // role: '',
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/roles`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responseData = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            username: userData.username,
          }),
          method: 'POST',
        }
      );
      setToken(responseData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setUserData({
      username: '',
      email: '',
      password: '',
    });
  };

  const defaultTheme = createTheme();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const buttonStyle = {
    mt: 3,
    mb: 2,
    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',
    color: '#fff',
    borderRadius: '20px',
  
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container style={{ height: '100vh' }}>
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
        />
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
            sx={{ mt: 1, width: '75%' }}
          >
            <Grid container direction="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
              <Typography component="h1" variant="h5">
                Register
              </Typography>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={userData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userData.email}
              onChange={handleChange}
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
              value={userData.password}
              onChange={handleChange}
            />
             {/* <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              select
              label="Role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              helperText="Please select your role"
            >
              {roles?.map((role) => (
                <MenuItem key={role.id} value={role.name}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField> */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={buttonStyle}
                  style={{    background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',}}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={buttonStyle}
                  onClick={handleCancel}
                  style={{   background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)',}}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
              <Grid item>
                <Link href="/signin" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Register;
