import * as React from 'react';
import { stopPropagation } from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

const styles = {


}

function StudentDashboardCard(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // stop event propagation to the card
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    props.onDelete(props.name, props.section);
    handleMenuClose();
  };

  return (
    <Card sx={{ height: 20 + "vh", maxwidth: 300 }}>
      <CardHeader
        sx={{
          height: '50%',
          background: `linear-gradient(to right, #1e3c72, #2a5298)`,
          color: 'white',
          justifyContent: 'center',
          padding: '20px',
          '& .MuiCardHeader-title': {
            fontSize: '1.15rem', // Adjust the font size as needed
          },

        }}
        action={
          <div>
            <div onClick={(e) => {
              e.preventDefault();
            }}>
              <IconButton aria-label="settings" onClick={(e) => {
                handleMenuOpen(e);
              }}>
                <MoreVertIcon />
              </IconButton>



              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={(e) => { handleMenuClose(e) }}
              >
                {/* <MenuItem onClick={handleMenuClose}>View Assignments</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Leave Class</MenuItem> */}
                {/* <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem> */}
                {/* <Link to={`/user/${props.userID}/class/${props.id}`}> */}
                <Link to={`/s/${props.userId}/class/${props.classId}`}> <MenuItem onClick={handleMenuClose}>View Class</MenuItem></Link>
                {/* </Link> */}
                <Link to={`/user/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem >Class Analytics</MenuItem></Link>
                {/* <Link to={`/user/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link> */}
              </Menu>
            </div>
          </div>
        }
        title={props.name}
      //subheader={props.section}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.section}
        </Typography>
      </CardContent>
    </Card>

    // <div className="class-card">
    //     <div className='class-name-container'>
    //         <div className='dropdown'>
    //             <div className='dropbtn optionContainer btn-right showLeft '>
    //                 <li></li>
    //                 <li></li>
    //                 <li></li>
    //             </div>
    //             <div class="dropdown-content-forTeacher-class">
    //                 <a href="#home">Delete</a>
    //                 <a href="#about">Copy Code</a>
    //                 <a href="#about">View CLO</a>
    //                 <a href="#about">Class Analytics</a>
    //                 <a href="#about">Leaderboard</a>
    //             </div>
    //         </div>

    //         <h3 className="class-name">{props.name}</h3>
    //     </div>
    //     <div class-section-container>
    //         <p className="class-section">{props.section}</p>
    //     </div>
    // </div>
  );
}

export default StudentDashboardCard