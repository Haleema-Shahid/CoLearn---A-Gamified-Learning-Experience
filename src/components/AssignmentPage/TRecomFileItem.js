//shows teacher side assignment viewer component's added recommended material
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faFileAlt, faSpinner, faTrash, faCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';


const TRecomFileItem = ({ file, difficulty, tags }) => {
  console.log("url: ", file);
 
  const url = new URL(file);
  const fileName = decodeURIComponent(url.pathname).split('/').pop();
  const fileLevel = difficulty;

  const [showTags, setShowTags] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = (event) => {
    event.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const renderTags = () => {
    if (tags.length === 0) {
      return <span>No tags available</span>;
    }

    return <span>{tags.join(', ')}</span>;
  };

  const getCircleColor = () => {
    if (difficulty === 'easy') {
      return '#80b918';
    } else if (difficulty === 'medium') {
      return '#fe7f2d';
    } else if (difficulty === 'hard') {
      return '#00509d';
    } else {
      return 'gray';
    }
  };

  const getCircleHoverText = () => {
    if (difficulty === 'easy') {
      return 'Easy';
    } else if (difficulty === 'medium') {
      return 'Medium';
    } else if (difficulty === 'hard') {
      return 'Hard';
    } else {
      return 'Unknown';
    }
  };

  const handleFileClick = (event) => {
    event.preventDefault();

    window.open(file, '_blank');
    console.log("file clicked: ", file);
  };

  return (
    <li
      style={{
        listStyle: 'none',
        margin: '1.2em 0',
        backgroundColor: '#edf2f7',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        padding: '1.2em 1.5em',
      }}
      key={file}
      onClick={handleFileClick}
    >
      <FontAwesomeIcon
        icon={faCircle}
        style={{ marginRight: '0.5em', color: getCircleColor() }}
        title={getCircleHoverText()}
      />
      <p style={{ fontSize: '0.9rem', margin: '0' }}>{fileName}</p>
      <div className="actions" style={{ marginLeft: 'auto' }}>
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ cursor: 'pointer' }}
          onClick={(e)=>{handleDropdownClick(e);}}
        />
      </div>
      {dropdownOpen && (
        <div
          style={{
            marginTop: '0.5em',
            backgroundColor: 'white',
            padding: '0.5em',
            borderRadius: '5px',
          }}
        >
          {renderTags()}
        </div>
      )}
    </li>
  );
};

export default TRecomFileItem;
