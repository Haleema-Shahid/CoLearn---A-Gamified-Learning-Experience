import React, { useState } from 'react';
import './TeacherDashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TeacherDashboardCard from './TeacherDashboardCard';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TeacherDashboard() {
  const { userID} = useParams();
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState([{ name: "Advanced Programming", section: "B",id:"A2561" }, { name: "Database", section: "B", id:"A2562"}, { name: "Programming Fundamentals", section: "B", id:"A2563" }]);

  const handleCreateClassClick = () => {
    setShowCreateClassModal(true);
  };

  const handleClassNameChange = (event) => {
    setClassName(event.target.value);
  };

  const handleSectionChange = (event) => {
    setSection(event.target.value);
  };

  const handleCreateClassSubmit = (event) => {
    //fetch api here
    if (className === '' || section === '') {
      // Class name or section is empty, do not create new class
      setShowCreateClassModal(false);
      return;
    }

    // Create new class
    setClasses([...classes, { name: className, section }]);
    setShowCreateClassModal(false);
    setClassName('');
    setSection('');

  };

  const handleCancelClick = () => {
    setShowCreateClassModal(false);
    setClassName('');
    setSection('');
  };

  const handleDeleteClass = (name, section) => {
    setClasses(classes.filter(cls => !(cls.name === name && cls.section === section)));
  };

  return (
    <div className='TeacherDashboard'>
   
      <button onClick={handleCreateClassClick} className="create-class-button">Create New Class</button>
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
            <label htmlFor="section-input">Section:</label>
            <input
              id="section-input"
              type="text"
              value={section}
              onChange={handleSectionChange}
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
            <Link to={`/user/${userID}/class/${classObj.id}`} key={classObj.id}>
            <div className="container_card" key={classObj.name + classObj.section} >
             <TeacherDashboardCard name={classObj.name} section={classObj.section} id={classObj.id} userID={userID} onDelete={handleDeleteClass }/>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
