import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSpinner, faTrash, faCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';

const HelpingFileItem = ({ file, deleteFile, difficulty, tags }) => {
  const [showTags, setShowTags] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
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
    >
      <FontAwesomeIcon icon={faCircle} style={{ marginRight: '0.5em', color: getCircleColor() }} title={getCircleHoverText()} />
      <p style={{ fontSize: '0.9rem', margin: '0' }}>{file.name}</p>
      
      <div className="actions" style={{ marginLeft: 'auto' }}>
        <div className="loading"></div>
        {file.isUploading && (
          <FontAwesomeIcon
            style={{ fontSize: '1.2em', color: '4b6cb7', marginLeft: '0.5em' }}
            icon={faSpinner}
            className="fa-spin"
            onClick={() => deleteFile(file.name)}
          />
        )}
        {!file.isUploading && (
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: '4b6cb7', marginLeft: '0.5em' }}
            onClick={() => deleteFile(file.name)}
          />
        )}
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{ color: '4b6cb7', marginLeft: '0.5em', cursor: 'pointer' }}
          onClick={handleDropdownClick}
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

export default HelpingFileItem;
