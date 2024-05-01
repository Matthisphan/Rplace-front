import { Box, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon, Divider } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const username = localStorage.getItem('username') !== null ? JSON.parse(localStorage.getItem('username') as string) : '';

  async function logout() {
    const token = localStorage.getItem('tokens');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
    localStorage.clear();
    navigate('/login');
  }

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          color: '#ffffff',
          bgcolor: theme.palette.primary.main,
          p: 2,
          justifyContent: 'space-between',
          height: 50,
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Rplace</Typography>
        {username && (
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>{username[0]}</Avatar>
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography sx={{ p: 2, textAlign: 'center' }} variant="subtitle1">
          {username}
        </Typography>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
