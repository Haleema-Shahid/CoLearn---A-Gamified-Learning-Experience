import React, { useState } from 'react';
import './TeacherDashboard.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TeacherDashboard() {
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState([{ name: "Advanced Programming", section: "B" }, { name: "Database", section: "B" }, { name: "Programming Fundamentals", section: "B" }]);

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
          {classes.map((cls) => (
            <div key={cls.name + cls.section} className="class-card">
              <div className='class-name-container'>
                <div className='dropdown'>
                  <div className='dropbtn optionContainer btn-right showLeft '>
                    <li></li>
                    <li></li>
                    <li></li>
                  </div>
                  <div class="dropdown-content-forTeacher-class">
                    <a href="#home">Delete</a>
                    <a href="#about">Copy Code</a>
                    <a href="#about">View CLO</a>
                    <a href="#about">Class Analytics</a>
                    <a href="#about">Leaderboard</a>
                  </div>
                </div>

                <h3 className="class-name">{cls.name}</h3>
              </div>
              <div class-section-container>
                <p className="class-section">{cls.section}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
