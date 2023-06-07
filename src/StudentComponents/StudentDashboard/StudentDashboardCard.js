import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';




const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',

}));
const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: `linear-gradient(to right, #073980, #073980)`,
  color: 'white',
  padding: theme.spacing(3),
  '& .MuiCardHeader-title': {
    fontSize: '1.15rem',
  },

}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
}));

function TeacherDashboardCard(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAnchorEl(null);


  };





  const [open, setOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
   // e.stopPropagation();
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    props.onDelete(props.name, props.section);
    setOpen(false);
    handleMenuClose();
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };


  return (
    <StyledCard>
      <StyledCardHeader
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

<Link to={`/s/${props.userId}/class/${props.classId}`}> <MenuItem >View Class</MenuItem></Link>
                {/* <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem> */}
                {/* <Link to={`/user/${props.userID}/class/${props.id}`}> */}
                <Link to={`/s/${props.userId}/class/${props.classId}`}> <MenuItem onClick={handleMenuClose}>View Class</MenuItem></Link>
                {/* </Link> */}
                <Link to={`/user/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem >Class Analytics</MenuItem></Link>
                {/* <Link to={`/user/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link> */}
                <MenuItem onClick={(e) => { handleDeleteClick(e); }}>Leave</MenuItem>
                <Dialog open={open} onClose={handleCancelDelete}>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Are you sure you want to Leave?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">Yes</Button>
                    <Button onClick={handleCancelDelete} color="primary" autoFocus>No</Button>
                  </DialogActions>
                </Dialog>
              </Menu>
            </div>
          </div>

        }
        title={props.name}
      />
      <StyledCardContent>
        <Typography variant="body2" color="text.secondary">
          {props.section}
        </Typography>
      </StyledCardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {/* <MenuItem onClick={(e) => { handleDeleteClick(e); }}>Leave</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem> */}
        <Link to={`/s/${props.userId}/class/${props.classId}`}> <MenuItem >View Class</MenuItem></Link>
        <Link to={`/user/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem >Class Analytics</MenuItem></Link>
        <Link to={`/user/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link>
      </Menu>
    </StyledCard>
  );
}

export default TeacherDashboardCard;

// import * as React from 'react';
// import { stopPropagation } from 'react';
// import { useState } from 'react';
// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import Avatar from '@mui/material/Avatar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { Link } from 'react-router-dom';

// const styles = {


// }

// function StudentDashboardCard(props) {

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     event.stopPropagation(); // stop event propagation to the card
//     event.preventDefault();
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     setAnchorEl(null);
//   };

//   const handleDeleteClick = () => {
//     props.onDelete(props.name, props.section);
//     handleMenuClose();
//   };

//   return (
//     <Card sx={{ height: 20 + "vh", maxwidth: 300 }}>
//       <CardHeader
//         sx={{
//           height: '50%',
//           background: `linear-gradient(to right, #1e3c72, #2a5298)`,
//           color: 'white',
//           justifyContent: 'center',
//           padding: '20px',
//           '& .MuiCardHeader-title': {
//             fontSize: '1.15rem', // Adjust the font size as needed
//           },

//         }}
//         action={
//           <div>
//             <div onClick={(e) => {
//               e.preventDefault();
//             }}>
//               <IconButton aria-label="settings" onClick={(e) => {
//                 handleMenuOpen(e);
//               }}>
//                 <MoreVertIcon />
//               </IconButton>



//               <Menu
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={(e) => { handleMenuClose(e) }}
//               >
//                 {/* <MenuItem onClick={handleMenuClose}>View Assignments</MenuItem>
//                 <MenuItem onClick={handleDeleteClick}>Leave Class</MenuItem> */}
//                 {/* <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem> */}
//                 {/* <Link to={`/user/${props.userID}/class/${props.id}`}> */}
//                 <Link to={`/s/${props.userId}/class/${props.classId}`}> <MenuItem >View Class</MenuItem></Link>
//                 {/* </Link> */}
//                 <Link to={`/user/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem >Class Analytics</MenuItem></Link>
//                 {/* <Link to={`/user/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link> */}
//               </Menu>
//             </div>
//           </div>
//         }
//         title={props.name}
//       //subheader={props.section}
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {props.section}
//         </Typography>
//       </CardContent>
//     </Card>

//     // <div className="class-card">
//     //     <div className='class-name-container'>
//     //         <div className='dropdown'>
//     //             <div className='dropbtn optionContainer btn-right showLeft '>
//     //                 <li></li>
//     //                 <li></li>
//     //                 <li></li>
//     //             </div>
//     //             <div class="dropdown-content-forTeacher-class">
//     //                 <a href="#home">Delete</a>
//     //                 <a href="#about">Copy Code</a>
//     //                 <a href="#about">View CLO</a>
//     //                 <a href="#about">Class Analytics</a>
//     //                 <a href="#about">Leaderboard</a>
//     //             </div>
//     //         </div>

//     //         <h3 className="class-name">{props.name}</h3>
//     //     </div>
//     //     <div class-section-container>
//     //         <p className="class-section">{props.section}</p>
//     //     </div>
//     // </div>
//   );
// }

// export default StudentDashboardCard