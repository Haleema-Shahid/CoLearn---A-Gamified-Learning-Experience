import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudentDashboardCard from './StudentDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import createClassBg from '../../images/classaddcard.jpg'
import sample from '../../images/sample.jpg'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function StudentDashboard() {
  const { userId } = useParams();
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([]);
  const [joinNewClassButton, setJoinNewClassButton] = useState(false);
  const [open, setOpen] = useState(false);



  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/s/${userId}`);
        const data = await response.json();
        if (data) {
          setClasses(data);
        }
        else {
          console.log("no classes found");
          setClasses([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId, classes]);
  const handleJoinClassClick = () => {
    setShowJoinClassModal(true);
    setJoinNewClassButton(true)
  };

  const handleClassCodeChange = (event) => {
    setClassCode(event.target.value);
  };


  const handleJoinClassSubmit = async (event) => {
    event.preventDefault();

    if (classes.some(cls => cls._id === classCode)) {
      setOpen(true);
      return;
    }

    if (classCode === '') {
      // Class code is empty, do not attempt to join class
      setShowJoinClassModal(false);
      return;
    }

    try {
      // Check if class code exists
      const response = await fetch(`http://localhost:4000/backend/s/${userId}/join-class/${classCode}`);
      if (response.ok) {
        // Class exists, add user to class
        const data = await response.json();
        setClasses([...classes, data]);
        setShowJoinClassModal(false);
        setClassCode('');
        setJoinNewClassButton(false);
      } else {
        // Class code does not exist
        console.error('Class code not found');
        setShowJoinClassModal(false);
        setClassCode('');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleCancelClick = () => {
    setJoinNewClassButton(false);
    setShowJoinClassModal(false);
    setClassCode('')
  };

  const handleDeleteClass = (name, section) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.section === section)));
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setJoinNewClassButton(false)
  };

  return (
    <div className='TeacherDashboard' sx={{
  backgroundColor: 'white',
  padding: '0px 4px',
  
}}>

  <DashboardHeader userId={userId} />

  {!joinNewClassButton && (
    
   
        <IconButton
          onClick={handleJoinClassClick}
          sx={{
            backgroundColor: '#0E3386',
            color: 'white',
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 999,
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            transition: 'background-color 0.3s ease-in-out',
            '@media (max-width: 600px)': {
              bottom: '20px',
              right: '20px',
            },

          }}
        >
          <AddIcon fontSize="large" sx={{ fontSize: '3rem' }} />
        </IconButton>
   
    
  )}

      {/* <button onClick={handleCreateClassClick} className="create-class-button" hidden={createNewClassButton}>Create New Class</button> */}
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            You have already joined this class!
          </Alert>
        </Snackbar>
      )}

      {showJoinClassModal && (
        <div style={{}}>
          <Grid container justifyContent="center" style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
            <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Paper elevation={3} style={{ padding: '40px', backgroundImage: `url(${createClassBg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '90%' }}>
                <Paper elevation={0} style={{ padding: '20px' }}>
                  <form onSubmit={handleJoinClassSubmit}>
                    <Stack spacing={2}>
                      <TextField
                        required
                        id="classcode"
                        label="Class Code"
                        value={classCode}
                        onChange={handleClassCodeChange}
                        fullWidth
                      />
                     
                      <Button
                        type="submit"
                        variant="contained"
                        style={{
                          backgroundColor: '#0E3386',
                          color: 'white',
                          borderRadius: '10px',
                          padding: '10px 30px',
                          fontSize: '1rem',
                          '&:hover': {
                            backgroundColor: '#0E3386',
                          },
                        }}
                      >
                        Join Class
                      </Button>
                      <Button
                        onClick={handleCancelClick}
                        variant="outlined"
                        sx={{ borderColor: '#0E3386', color: '#0E3386' }}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </form>
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
      {!showJoinClassModal && (
        <div style={{
          backgroundColor: 'white',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gridGap: '40px',
          padding: '20px',

        }}>
          <Grid container spacing={3}>
            {classes.map((classObj) => (
              <Grid item xs={12} sm={6} md={4} key={classObj.name + classObj.description} style={{ height: '200px', width: '300px' }}>
                <Link to={`/s/${userId}/class/${classObj._id}`} style={{ textDecoration: 'none' }}>
                  <StudentDashboardCard name={classObj.name} section={classObj.description} classId={classObj._id} userId={userId} onDelete={handleDeleteClass} style={{ height: '500px' }} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

    </div>
  );
}

export default StudentDashboard;


  // return (
  //   <div className='TeacherDashboard'>
  //     <DashboardHeader userId={userId} />
  //     <button onClick={handleJoinClassClick} className="create-class-button">Join New Class</button>
  //     {showJoinClassModal && (
  //       <div className="create-class-modal">
  //         <form onSubmit={handleJoinClassSubmit} className="create-class-form">
  //           <label htmlFor="class-name-input">Class Code:</label>
  //           <input
  //             id="class-name-input"
  //             type="text"
  //             value={classCode}
  //             onChange={handleClassCodeChange}
  //           />
  //           <br />
  //           <button type="submit" className='create-button'>Join</button>
  //           <button onClick={handleCancelClick} className="cancel-button">
  //             Cancel
  //           </button>
  //         </form>
  //       </div>
  //     )}
  //     {!showJoinClassModal && (
  //       <div className="classes-grid">
  //         {classes.map((classObj) => (
  //           // <Link to={`/user/${userId}/class/${classObj.id}`} key={classObj.id}>
  //           <div className="container_card" key={classObj.name + classObj.discription} >
  //             <Link to={`/s/${userId}/class/${classObj._id}`} style={{ textDecoration: 'none' }}>
  //               <StudentDashboardCard name={classObj.name} section={classObj.description} classId={classObj._id} userId={userId} onDelete={handleDeleteClass} />
  //             </Link>
  //           </div>
  //           // </Link>
  //         ))}
  //       </div>
  //     )
  //     }
  //   </div >
  // );

