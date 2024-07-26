import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher } from '../lib/api';
import { getTokenFromLocalCookie, setToken, unsetToken } from '../lib/auth';
import { useUser } from '../lib/authContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

const Nav = () => {
  const [data, setData] = useState({
    identifier: '',
    password: '',
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState(null); // Updated state initialization

  const { user, loading } = useUser();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const jwt = getTokenFromLocalCookie(); // Retrieve the token

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
        };

        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/users-permissions/permissions`, options);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Roles:', data);
        setRoles(data.permissions); // Update state with permissions object
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    setToken(responseData);
  };

  const logout = () => {
    unsetToken();
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleInviteUsers = async () => {
    try {
      const response = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('User invited successfully!');
      } else {
        const errorData = await response.json();
        console.error('Error inviting user:', errorData);
        alert(`Failed to invite user: ${errorData.error}`);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error inviting user:', error);
      alert('An error occurred while inviting the user.');
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Determine if the Invite Users button should be shown
  const showInviteButton = roles && Object.keys(roles).length > 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0} sx={{ boxShadow: '0 2px 17px rgba(0,0,0,0.1)' }}>
        <Toolbar>
        <Link href="/" passHref>
            <Typography variant="h6" component="a" sx={{ flexGrow: 1, textDecoration: 'none', color: '#333', fontFamily: 'cursive', fontStyle: 'italic', fontWeight: "bold" }}>
              Performance Improvement Plan
              {showInviteButton && (
                <Typography variant="caption" sx={{ marginLeft: 1, fontStyle: 'italic', color: 'gray' }}>
                  (ADMIN)
                </Typography>
              )}
            </Typography>
          </Link>
          {user && showInviteButton && (
            <Button color="inherit" onClick={handleModalOpen}>
              Invite Users
            </Button>
          )}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {!loading && user && (
              <Link href="/form" passHref>
                <Button color="inherit" sx={{ mr: 2 }}>
                  PIP Form
                </Button>
              </Link>
            )}
            {!loading && user && (
              <Link href="/profile" passHref>
                <Button color="inherit" sx={{ mr: 2 }}>
                  Profile
                </Button>
              </Link>
            )}
            {!loading && user && (
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            )}
            {!loading && !user && (
              <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    name="identifier"
                    onChange={handleChange}
                    placeholder="Username"
                    style={{ padding: '8px', borderRadius: '4px', marginBottom: '8px', width: '200px', marginRight:'10px' }}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                    style={{ padding: '8px', borderRadius: '4px', marginBottom: '8px', width: '200px' ,marginRight:'10px'}}
                    required
                  />
                  <button
                    style={{ padding: '8px', borderRadius: '4px', backgroundColor: 'purple', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s', width: '100%' }}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            )}
            {!loading && !user && (
              <Link href="/register" passHref>
                <Button color="inherit">
                  Register
                </Button>
              </Link>
            )}
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={toggleMenu}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={toggleMenu}>
              <Link href="/" passHref>
                <Typography variant="inherit" color="textPrimary" component="a" sx={{ textDecoration: 'none', color: 'gray' }}>
                  Home
                </Typography>
              </Link>
            </MenuItem>
            {!loading && user && (
              <MenuItem onClick={toggleMenu}>
                <Link href="/form" passHref>
                  <Typography variant="inherit" color="textPrimary" component="a" sx={{ textDecoration: 'none', color: 'gray' }}>
                    PIP Form
                  </Typography>
                </Link>
              </MenuItem>
            )}
            {!loading && user && (
              <MenuItem onClick={toggleMenu}>
                <Link href="/profile" passHref>
                  <Typography variant="inherit" color="textPrimary" component="a" sx={{ textDecoration: 'none', color: 'gray' }}>
                    Profile
                  </Typography>
                </Link>
              </MenuItem>
            )}
            {!loading && user && (
              <MenuItem onClick={() => { toggleMenu(); logout(); }}>
                <Typography variant="inherit" color="textPrimary" sx={{ cursor: 'pointer', textDecoration: 'none', color: 'gray' }}>
                  Logout
                </Typography>
              </MenuItem>
            )}
            {!loading && !user && (
              <MenuItem onClick={toggleMenu}>
                <Link href="/register" passHref>
                  <Typography variant="inherit" color="textPrimary" component="a" sx={{ textDecoration: 'none', color: 'gray' }}>
                    Register
                  </Typography>
                </Link>
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="invite-user-modal"
        aria-describedby="invite-user-modal-description"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 24, margin: 'auto', marginTop: '10%', width: 300 }}>
          <Typography id="invite-user-modal" variant="h6" component="h2">
            Invite User
          </Typography>
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2, width: '100%' }}
          />
          <Button onClick={handleInviteUsers} variant="contained" color="primary">
            Send Invite
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Nav;
