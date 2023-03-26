import React, { useState } from 'react';
import './TeacherDashboard.css';

import TeacherDashboardCard from './TeacherDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeacherDashboard() {
  const { userID } = useParams();
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState([{ name: "Advanced Programming", section: "B", id: "A2561" }, { name: "Database", section: "B", id: "A2562" }, { name: "Programming Fundamentals", section: "B", id: "A2563" }]);

  const [open, setOpen] = useState(false);
  const [createNewClassButton, setCreateNewClassButton] = useState(false);


  const handleCreateClassClick = () => {
    setShowCreateClassModal(true);
    setCreateNewClassButton(true)
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
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
    //fetch api here
    if (className === '' || section === '') {
      // Class name or section is empty, do not create new class
      setShowCreateClassModal(false);
      return;
    }
    //checking if this class name and section already exists
    if (classes.filter(cls => cls.name === className && cls.section === section).length > 0) {
      console.log("entered");
      setOpen(true);
      return

    }


    // Create new class from backend and fetch in front end again
    setClasses([...classes, { name: className, section }]);
    setShowCreateClassModal(false);
    setClassName('');
    setSection('');


    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userID:userID, className:className, section: section })
    // };

    // const response = await fetch('http://localhost:4000/api/login', requestOptions);
    // const data = await response.json();

    // if (response.ok) {
    //   // Do something with the user data
    //   //console.log(data._id);


    // } else {
    //   // Handle the error
    //   console.log('Error:', response.status);
    // }



  };

  const handleCancelClick = () => {
    setShowCreateClassModal(false);
    setClassName('');
    setSection('');
    setCreateNewClassButton(false)
  };

  const handleDeleteClass = (name, section) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.section === section)));
  };

  return (
    <div className='TeacherDashboard'>

      <button onClick={handleCreateClassClick} className="create-class-button" hidden={createNewClassButton}>Create New Class</button>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This Class Exists Already!
          </Alert>
        </Snackbar>
      )}

      {showCreateClassModal && (

        <div >
          <Box  component="form" onSubmit={handleCreateClassSubmit}
            sx={{
              margin: "auto",
              display: "flex",
              flexDirection: "column",

              paddingLeft: "50px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
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
                value={section}
                onChange={handleSectionChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#1e3c72',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '10px 30px',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#0c2461',
                  },
                }}
              >
                Create Class
              </Button>
              <Button onClick={handleCancelClick} variant="outlined">
                Cancel
              </Button>
            </Stack>
          </Box>

        </div>


      )}
      {!showCreateClassModal && (
        <div className="classes-grid">
          {classes.map((classObj) => (
            <Link to={`/user/${userID}/class/${classObj.id}`} key={classObj.id}>
              <div className="container_card" key={classObj.name + classObj.section} >
                <TeacherDashboardCard name={classObj.name} section={classObj.section} id={classObj.id} userID={userID} onDelete={handleDeleteClass} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
