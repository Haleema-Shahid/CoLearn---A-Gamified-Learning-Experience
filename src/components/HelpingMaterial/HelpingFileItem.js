import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

const HelpingFileItem = ({ file, deleteFile, difficulty}) => {
  //in helping material file item we have difficulty levels as well
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
      <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '0.5em', color:'4b6cb7' }} />
      <p style={{ fontSize: '0.9rem', margin: '0' }}>{file.name} </p>
      <p style={{ fontSize: '0.9rem', margin: '0' }}>{difficulty} </p>
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
      </div>
    </li>
  );
};

export default HelpingFileItem;