import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css';

import TeacherDashboardCard from './TeacherDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import TeacherDashboardHeader from '../DashboardHeader';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import createClassBg from '../../images/classaddcard.jpg'
import sample from '../../images/sample.jpg'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';




const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeacherDashboard() {
  const { userId } = useParams();
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [description, setdescription] = useState('');
  const [classes, setClasses] = useState([]);

  const [open, setOpen] = useState(false);
  const [createNewClassButton, setCreateNewClassButton] = useState(false);

  const [newClass, setNewClass] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("in useEffect");
      try {
        console.log("in try block");
        console.log(userId);
        const response = await fetch(`http://localhost:4000/backend/t/${userId}`);
        const data = await response.json();
        console.log("data is ");
        if (data) {
          console.log("data is not empty");
          setClasses(data);
          //setClasses(Object.assign([], data.classes));          
          //console.log(classes);
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
  }, [userId]);

  const handleCreateClassClick = () => {
    setShowCreateClassModal(true);
    setCreateNewClassButton(true)
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setCreateNewClassButton(false)
  };

  const handleCreateClassSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData(e.currentTarget);
    const name = className;
    const desc = description;

    //check for duplicalte classes
    if (classes.some(cls => cls.name === name && cls.description === desc)) {
      setOpen(true);
      return;
    }

    //fetch api here
    console.log(name);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classname: name, description: desc, user_id: userId })
    };

    console.log(userId);
    const response = await fetch(`http://localhost:4000/backend/create-class`, requestOptions);
    const data = await response.json();
    if (data) {
      const newClass = { name: className, description };
      setClasses(prevClasses => [...prevClasses, newClass]); // Append the new class to the existing array
    }

    setShowCreateClassModal(false);
    setClassName('');
    setdescription('');
    setCreateNewClassButton(false)



  };

  const handleCancelClick = () => {

    setCreateNewClassButton(false);
    setShowCreateClassModal(false);
    setClassName('');
    setdescription('');



  };

  const handleDeleteClass = async (name, description, _id) => {
    console.log("in delete class");
    console.log(classes);
    const thisClass = classes.find(cls => cls._id === _id);
    const thisClassId = thisClass._id;
    try {
      const response = await fetch(`http://localhost:4000/backend/delete-class/${thisClassId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        console.log('Class deleted successfully');
        // Update the classes state by filtering out the deleted class
        setClasses(prevClasses => prevClasses.filter(cls => !(cls.name === name && cls.description === description)));
        // Handle any additional logic after successful deletion
      } else {
        console.error('Failed to delete class:', response.statusText);
        // Handle error case appropriately
      }
    } catch (error) {
      console.error('An error occurred while deleting the class:', error);
      // Handle error case appropriately
    }
  };

  return (
    <div className='TeacherDashboard' sx={{
      backgroundColor: 'white',
      padding: '0px 4px'
    }}>

      <TeacherDashboardHeader userId={userId} />



      {!createNewClassButton && (
        <Tooltip title="Add a new class">
          <IconButton
            onClick={handleCreateClassClick}
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
        </Tooltip>
      )}

      {/* <button onClick={handleCreateClassClick} className="create-class-button" hidden={createNewClassButton}>Create New Class</button> */}
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This Class Exists Already!
          </Alert>
        </Snackbar>
      )}

      {showCreateClassModal && (
        <div style={{}}>
          <Grid container justifyContent="center" style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0 }}>
            <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Paper elevation={3} style={{ padding: '40px', backgroundImage: `url(${createClassBg})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '90%' }}>
                <Paper elevation={0} style={{ padding: '20px' }}>
                  <form onSubmit={handleCreateClassSubmit}>
                    <Stack spacing={2}>
                      <TextField
                        required
                        id="className"
                        label="Class Name"
                        value={className}
                        onChange={handleClassNameChange}
                        fullWidth
                      />
                      <TextField
                        required
                        id="sectionInput"
                        label="Section"
                        value={description}
                        onChange={handleDescriptionChange}
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
                        Create Class
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
      {!showCreateClassModal && (
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
                <Link to={`/t/${userId}/class/${classObj._id}`} style={{ textDecoration: 'none' }}>
                  <TeacherDashboardCard
                    name={classObj.name}
                    section={classObj.description}
                    classId={classObj._id}
                    userId={userId}
                    onDelete={handleDeleteClass}
                    style={{ height: '500px' }}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

    </div>
  );
}

export default TeacherDashboard;