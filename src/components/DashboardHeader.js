import { useParams, useNavigate, Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button/Button';
import dashboardHeader from '../images/dashboardheader.png';
import { IconButton, MenuItem, Menu } from '@mui/material';
import logoblue from '../images/logoblue.png'
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';

const HeaderContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(1),
  height: '64px',
  borderRadius: '0px',
  backgroundColor: 'white'
}));

const CustomMenuIcon = styled(MenuIcon)({
  color: 'grey',
  marginRight: '10px',
  '& .MuiSvgIcon-root': {
    strokeWidth: '2px',
    strokeMiterlimit: '4',
    height: '20px',
    width: '20px',
  },
});

const TeacherDashboardHeader = () => {
  const { userId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  }

  const handleMenuItemClick = (menuItem) => {
    console.log('Clicked:', menuItem);
    handleMenuClose();
  };

  useEffect(() => {
    // Fetch user data using userId

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/user/${userId}`);
        const data = await response.json();
        setName(data.firstname + " " + data.lastname);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <HeaderContainer>
      <Link to={`/t/${userId}`} style={{ textDecoration: 'none' }}>
        <Box component="img" sx={{ height: 64, marginLeft: '20px' }} alt="Your logo." src={logoblue} />
      </Link>
      <Link to={`/t/${userId}`} style={{ textDecoration: 'none' }}>
        <Typography variant="h6" component="div" sx={{
          fontFamily: 'Montserrat',
          fontSize: '1.5rem',
          letterSpacing: '0.01rem',
          fontWeight: 'bold',
          color: '#001340',
          marginLeft: '-70px'
        }}>
          {name}
        </Typography>
      </Link>
      <IconButton color="inherit" sx={{ marginRight: '30px' }} onClick={handleMenuOpen}>
        <CustomMenuIcon />
      </IconButton>
      <Menu sx={{ marginRight: '30px' }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleLogout('Option 1')}>Logout</MenuItem>
      </Menu>
    </HeaderContainer>
  );
};

export default TeacherDashboardHeader;
