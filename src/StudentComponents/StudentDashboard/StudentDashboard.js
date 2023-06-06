import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StudentDashboardCard from './StudentDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../DashboardHeader';



function StudentDashboard() {
  const { userId } = useParams();
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);
  const [classCode, setClassCode] = useState('');
  const [classes, setClasses] = useState([]);


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
  };

  const handleClassCodeChange = (event) => {
    setClassCode(event.target.value);
  };


  const handleJoinClassSubmit = async (event) => {
    event.preventDefault();

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
    setShowJoinClassModal(false);
    setClassCode('')
  };

  const handleDeleteClass = (name, section) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.section === section)));
  };

  return (
    <div className='TeacherDashboard'>
      <DashboardHeader userId={userId} />
      <button onClick={handleJoinClassClick} className="create-class-button">Join New Class</button>
      {showJoinClassModal && (
        <div className="create-class-modal">
          <form onSubmit={handleJoinClassSubmit} className="create-class-form">
            <label htmlFor="class-name-input">Class Code:</label>
            <input
              id="class-name-input"
              type="text"
              value={classCode}
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
            // <Link to={`/user/${userId}/class/${classObj.id}`} key={classObj.id}>
            <div className="container_card" key={classObj.name + classObj.discription} >
              <Link to={`/s/${userId}/class/${classObj._id}`} style={{ textDecoration: 'none' }}>
                <StudentDashboardCard name={classObj.name} section={classObj.description} classId={classObj._id} userId={userId} onDelete={handleDeleteClass} />
              </Link>
            </div>
            // </Link>
          ))}
        </div>
      )
      }
    </div >
  );
}

export default StudentDashboard;
