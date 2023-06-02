//these cards display content of a selected topic like assignment and material
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


//we need userid, classId, topicId, assignmentId 
const styles = {


}

function MaterialCard(props) {

  const [content, setContent] = useState(props.material)
  const [contentType, setContentType] = useState(props.contentType)
  const [anchorEl, setAnchorEl] = useState(null);

  const [userId, setUserId] = useState(props.userId)
  const [classId, setClassId] = useState(props.classId)
  const [weekId, setWeekId] = useState(props.weekId)
  const [topicId, setTopicId] = useState(props.topicId)
  const [materialId, setMaterialId] = useState(props.materialId)


  //---------------------------------backend work--------------------
  // using userid, classId, topicId, assignmentId 
  //bring the assignment object from the backend ans save it in content


  const handleMenuOpen = (event) => {
    event.stopPropagation(); // stop event propagation to the card
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //   const handleDeleteClick = () => {
  //     props.onDelete(props.name, props.section);
  //     handleMenuClose();
  //   };

  return (
    <Card sx={{ height: 20 + "vh", width: "40%", marginBottom: "16px", marginTop: "10px" }}>
      <CardHeader
        action={
          <div>
            <div onClick={(e) => {
              e.preventDefault();
            }}>
              <IconButton style={{ color: "#2a5298" }} aria-label="settings" onClick={(e) => {
                handleMenuOpen(e);
              }}>
                <MoreVertIcon />
              </IconButton>




              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {/* <MenuItem onClick={handleDeleteClick}>Delete</MenuItem> */}

                <Link to={`/s/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/materialId/${materialId}/TeacherMaterialViewer`}><MenuItem >View Material</MenuItem></Link>

              </Menu>
            </div>
          </div>
        }
        title={content.title}
        sx={{ color: "#2a5298" }}
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

export default MaterialCard