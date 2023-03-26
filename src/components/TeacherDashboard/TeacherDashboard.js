import React, { useState, useEffect } from 'react';
import './TeacherDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TeacherDashboardCard from './TeacherDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

 
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TeacherDashboard() {
  const {userId} = useParams();
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [description, setdescription] = useState('');
  const [classes, setClasses] = useState([]);

  const [open, setOpen] = useState(false);
  const [createNewClassButton, setCreateNewClassButton] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/t/${userId}`);
        const data = await response.json();
        if(data)
          setClasses(data.classes);
        else{
          setClasses([]);
        }
      } catch (error) {
        console.error(error);
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
    const name = info.get('class-name-input');
    const desc = info.get('description-input');
    //fetch api here
    console.log(name);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ classname: name, description: desc, user_id: userId })
    };

    console.log(userId);
    const response = await fetch(`/t/${userId}/class`, requestOptions);
    const data = await response.json();
    if(data){
      navigate(`/t/${userId}`);
    }

    // if (className === '' || description === '') {
    //   // Class name or description is empty, do not create new class
    //   setShowCreateClassModal(false);
    //   return;
    // }else{

    // }
    //checking if this class name and description already exists
    // if(classes.filter(cls => cls.name === className && cls.description === description).length>0)
    // {
    //   console.log("entered");
    //   setOpen(true);
    //   return
    // }
    

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

        <div className="create-class-modal">
          <form onSubmit={handleCreateClassSubmit} className="create-class-form">
            <label htmlFor="class-name-input">Class Name:</label>
            <input
              id="class-name-input"
              type="text"
              value={className}
              onChange={handleClassNameChange}
            />
            <br />
            <label htmlFor="description-input">Description:</label>
            <input
              id="description-input"
              type="text"
              value={description}
              onChange={handledescriptionChange}
            />
            <br />
            <button type="submit" className='create-button'>Create Class</button>
            <button onClick={handleCancelClick} className="cancel-button">
              Cancel
            </button>
          </form>
        </div>
        
        
      )}
      {!showCreateClassModal && (
        <div className="classes-grid">
          {classes.map((classObj) => (
            // <Link to={`/user/${userId}/class/${classObj.id}`} key={classObj.id}>
            <div className="container_card" key={classObj.name + classObj.description} >
             <TeacherDashboardCard name={classObj.name} description={classObj.description} id={classObj.id} userId={userId} onDelete={handleDeleteClass }/>
            </div>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
