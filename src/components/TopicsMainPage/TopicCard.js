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

function TopicCard(props) {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // stop event propagation to the card
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  return (
    <Card sx={{ height: 20 + "vh", maxwidth: 300 }}>
      <CardHeader
        sx={{
          height: '50%',
          background: `linear-gradient(to right, #1e3c72, #2a5298)`,
          color: 'white',
          height: '50%',

        }}
        action={
          <div>
            <div onClick={(e) => 
              {
              e.preventDefault();} }>
              <IconButton aria-label="settings" onClick={(e) => {
                handleMenuOpen(e);
              }}>
                <MoreVertIcon />
              </IconButton>
              


              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                <MenuItem onClick={handleMenuClose}>Add an Assignment</MenuItem>
                <MenuItem onClick={handleMenuClose}>Add a Material</MenuItem>
                <MenuItem onClick={handleMenuClose}>View Topic</MenuItem>
              </Menu>
            </div>
            </div>
        }
        title={props.title}
      //subheader={props.section}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>

  );
}

export default TopicCard