import React, { useState } from 'react';
import './StudentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudentDashboardCard from './StudentDashboardCard';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  const[userID, setUserID]=useState(121);
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [ClassCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([{ name: "Advanced Programming", section: "B",id:"A2561" }, { name: "Database", section: "B", id:"A2562"}, { name: "Programming Fundamentals", section: "B", id:"A2563" }]);

  const handleJoinClassClick = () => {
    setShowJoinClassModal(true);
  };

  const handleClassCodeChange = (event) => {
    setClassCode(event.target.value);
  };


  const handleJoinClassSubmit = (event) => {

    if (ClassCode === '' ) {
      // Class name or section is empty, do not create new class
      setShowJoinClassModal(false);
      return;
    }

    // Create new class
    //a backend validation to check if this class code exists
    setClasses([...classes, { name: "Advanced Programming", section: "D", id:"A2563" }]);
    setShowJoinClassModal(false);
    setClassCode('')

  };

  const handleCancelClick = () => {
    setShowJoinClassModal(false);
    setClassCode('')
  };

  const handleDeleteClass = (name, section) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.section === section)));
  };

  return (
    <div className='TeacherDashboard'>
   
      <button onClick={handleJoinClassClick} className="create-class-button">Join New Class</button>
      {showJoinClassModal && (
        <div className="create-class-modal">
          <form onSubmit={handleJoinClassSubmit} className="create-class-form">
            <label htmlFor="class-name-input">Class Code:</label>
            <input
              id="class-name-input"
              type="text"
              value={ClassCode}
              onChange={handleClassCodeChange}
            />
            <br />
            <button type="submit" className='create-button'>Join</button>
            <button onClick={handleCancelClick} className="cancel-button">
              Cancel
            </button>
          </form>
        </div>
      )}
      {!showJoinClassModal && (
        <div className="classes-grid">
          {classes.map((classObj) => (
            // <Link to={`/user/${userID}/class/${classObj.id}`} key={classObj.id}>
            <div className="container_card" key={classObj.name + classObj.section} >
             <StudentDashboardCard name={classObj.name} section={classObj.section} id={classObj.id} userID={userID} onDelete={handleDeleteClass }/>
            </div>
            // </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
