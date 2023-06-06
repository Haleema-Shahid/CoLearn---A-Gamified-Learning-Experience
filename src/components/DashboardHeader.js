import { useParams, useNavigate } from 'react-router-dom';
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
    //backgroundImage: `url(${dashboardHeader})`
    backgroundColor: 'white'
}));
const CustomMenuIcon = styled(MenuIcon)({
    color: 'white',
    marginRight: '10px',
    '& .MuiSvgIcon-root': {
        strokeWidth: '2px', // Adjust the line thickness
        strokeMiterlimit: '4', // Adjust the spacing between lines
        height: '20px', // Adjust the height of the icon
        width: '20px', // Adjust the width of the icon
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
        // Handle the menu item click
        console.log('Clicked:', menuItem);
        // Close the menu
        handleMenuClose();
    };

    useEffect(() => {
        // Fetch user data using userId
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/user/${userId}`);
                const data = await response.json();
                setName(data.firstname + " " + data.lastname);
                console.log("name is ", name);
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <HeaderContainer>
            <Box
                component="img"
                sx={{
                    height: 64,
                    marginLeft: '20px'
                }}
                alt="Your logo."
                src={logoblue}
            />
            <Typography variant="h6" component="div" sx={{
                fontFamily: 'Montserrat',
                fontSize: '1.5rem',
                letterSpacing: '0.01rem',
                fontWeight: '1',
                color: 'Black',
            }}>
                {name}
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
                <MenuIcon sx={{
                    color: '#545454',
                    marginRight: '30px',
                    '& .MuiSvgIcon-root': {
                        strokeWidth: '2px',
                        strokeMiterlimit: '4',
                        height: '20px',
                        width: '20px',
                    },
                }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleLogout('Option 1')}>Logout</MenuItem>
                {/* <MenuItem onClick={() => handleMenuItemClick('Option 2')}>Option 2</MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Option 3')}>Option 3</MenuItem> */}
            </Menu>

        </HeaderContainer >
    );
};

export default TeacherDashboardHeader;
