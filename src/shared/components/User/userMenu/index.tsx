import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';

export function BasicMenu() {
  const { userLogin, getLoggedUsers } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [token, setToken] = useState<string>(
    localStorage.getItem('token') || ''
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getLoggedUsers();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/login');
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '1.4rem',
          width: '100%',
        }}
      >
        {userLogin}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => handleLogout()}
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1.2rem',
            width: '100%',
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
