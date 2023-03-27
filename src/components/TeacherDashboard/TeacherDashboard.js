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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("in useEffect");
      try {
        console.log("in try block");
        console.log(userId);
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId })
        };
        const response = await fetch(`http://localhost:4000/backend/t/${userId}`);
        const data = await response.json();
        console.log("data is ");
        if (data) {
          //console.log(data);
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

  const handledescriptionChange = (event) => {
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
      navigate(`/t/${userId}`);
    }
    //checking if this class name and section already exists
    if (classes.filter(cls => cls.name === className && cls.description === description).length > 0) {
      console.log("entered");
      setOpen(true);
      return

    }


    // Create new class from backend and fetch in front end again
    // setClasses([...classes, { name: className, description }]);
    // setShowCreateClassModal(false);
    // setClassName('');
    // setdescription('');





  };

  const handleCancelClick = () => {
    setShowCreateClassModal(false);
    setClassName('');
    setdescription('');
    setCreateNewClassButton(false)
  };

  const handleDeleteClass = (name, description) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.description === description)));
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
          <Box component="form" onSubmit={handleCreateClassSubmit}
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
                value={description}
                onChange={handledescriptionChange}
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
            // <Link to={`/user/${userId}/class/${classObj.id}`} key={classObj.id}>
            <div className="container_card" key={classObj.name + classObj.description} >
              <TeacherDashboardCard name={classObj.name} description={classObj.description} id={classObj._id} userId={userId} onDelete={handleDeleteClass} />
            </div>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
