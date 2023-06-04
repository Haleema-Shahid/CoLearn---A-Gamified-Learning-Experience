import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

const TRecomFileItem = ({ file, level, tags }) => {
  console.log("url: ", file);
  console.log("level: ", level);
  const url = new URL(file);
  const fileName = decodeURIComponent(url.pathname).split('/').pop();
  const fileLevel = level;

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
      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '0.5em', color: '#4b6cb7' }} />
      <p style={{ fontSize: '0.9rem', margin: '0' }}>{fileName}</p>
      <div className="actions" style={{ marginLeft: 'auto' }}>
        <div className="loading"></div>
      </div>
    </li>
  );
};

export default TRecomFileItem;
