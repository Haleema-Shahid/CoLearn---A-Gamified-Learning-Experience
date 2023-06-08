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
import { WindowSharp } from '@mui/icons-material';

const TruncatedTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%', // Set the maximum width for the title


}));

function TopicCard(props) {

  const [isHovered, setIsHovered] = useState(false);

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };


  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // stop event propagation to the card
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTopicSelection = () => {
    console.log("clicked view topic in teacher components");

    //console.log(props.topicId, props.userId, props.classId, props.weekId)
    props.onViewTopic(props.topicId, props.userId, props.classId, props.weekId);
    handleMenuClose();
  };

  const handleTopicDeletion = () => {
    console.log("clicked delete topic");
    // Rest of the code...
  };

  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const handleResize = () => {
      const cardWidth = cardRef.current.offsetWidth;
      //window.alert(cardWidth);
      const titleElement = cardRef.current.querySelector('.MuiCardHeader-title');
      const titleFontSize = window.getComputedStyle(titleElement).getPropertyValue('font-size');
      const titleLength = props.title.length;
      //window.alert(titleFontSize);
      const maxTitleLength = Math.floor(cardWidth / (parseFloat(titleFontSize) - 7));
      const truncatedTitle = props.title.slice(0, maxTitleLength) + '...';

      if (titleLength > maxTitleLength) {
        titleElement.textContent = truncatedTitle;
      } else {
        titleElement.textContent = props.title;
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.title]);

  return (
    <Card
      //onClick={handleTopicSelection}
      ref={cardRef}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      sx={{
        height: '20vh',
        width: '40%', // Adjust the width as needed
        marginBottom: '16px',
        marginTop: '10px',
      }}
    >
      <CardHeader
        sx={{
          height: '50%',
          background: 'linear-gradient(to right, #1e3c72, #2a5298)',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          //pointerEvents: 'none',
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
                onClose={handleMenuClose}
              >

                <MenuItem onClick={handleTopicSelection}>View Topic</MenuItem>

                <Link to={`/t/${props.userId}/class/${props.classId}/week/${props.weekId}/topic/${props.topicId}/assignment`}>
                  <MenuItem onClick={handleMenuClose}>Add an Assignment</MenuItem>
                </Link>
                <Link to={`/t/${props.userId}/class/${props.classId}/week/${props.weekId}/topic/${props.topicId}/material`}>
                  <MenuItem >Add a Material</MenuItem>
                </Link>
                {/* <MenuItem onClick={handleTopicDeletion}>Delete</MenuItem> */}
              </Menu>
            </div>
          </div>
        }
        title={<TruncatedTypography variant="h5" component="div">
          {props.title}
        </TruncatedTypography>}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">

        </Typography>
      </CardContent>
    </Card>
  );
}

export default TopicCard;