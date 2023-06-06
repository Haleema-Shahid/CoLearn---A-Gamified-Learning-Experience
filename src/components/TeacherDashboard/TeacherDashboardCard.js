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

  const handleMenuClose = () => {
    setAnchorEl(null);
  };





  const [open, setOpen] = useState(false);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    props.onDelete(props.name, props.section, props.classId);
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
                onClose={handleMenuClose}
              >
                <MenuItem onClick={(e) => { handleDeleteClick(e); }}>Delete</MenuItem>
                <Dialog open={open} onClose={handleCancelDelete}>
                  <DialogTitle>Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Are you sure you want to delete?</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleConfirmDelete} color="primary">Yes</Button>
                    <Button onClick={handleCancelDelete} color="primary" autoFocus>No</Button>
                  </DialogActions>
                </Dialog>
                <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem>
                <Link to={`/t/${props.userId}/class/${props.classId}`}><MenuItem >View Class</MenuItem></Link>

                <Link to={`/t/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem >Class Analytics</MenuItem></Link>
                <Link to={`/t/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link>
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
        <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>Copy Code</MenuItem>
        <Link to={`/t/${props.userId}/class/${props.classId}`}><MenuItem>View Class</MenuItem></Link>
        <Link to={`/t/${props.userId}/class/${props.classId}/classAnalytics`}><MenuItem>Class Analytics</MenuItem></Link>
        <Link to={`/t/${props.userId}/class/${props.classId}/classLeaderboard`}><MenuItem>Leaderboard</MenuItem></Link>
      </Menu>
    </StyledCard>
  );
}

export default TeacherDashboardCard;
