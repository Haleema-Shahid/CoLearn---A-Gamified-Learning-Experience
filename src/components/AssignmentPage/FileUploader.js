



///////////////////////////////
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUploader.css';
import storage from '../../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';


const FileUploader = ({ files, setFiles, remFile }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const inputRef = useRef();
  const [progress, setProgress] = useState(0);
  const [progressShow, setProgressShow] = useState(false);

  const uploadHandler = (event) => {
    setProgressShow(true);
    const file = event.target.files[0];
    if (!file) return;
  
    // Upload file to Firebase Storage
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track upload progress if needed
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload progress: ${progress}%`);
      },
      (error) => {
        console.error('Error uploading file:', error);
      },
      async () => {
        // File upload completed
        console.log('File uploaded successfully');
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File URL:', url);
          setFiles([...files, url]);
        } catch (error) {
          console.error('Error getting file URL:', error);
        }
      }
    );
  
    setSelectedFiles([...selectedFiles, file.name]);
  };
  
  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input ref={inputRef} type="file" label="Upload a file" onChange={uploadHandler} />
          <button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            Upload
          </button>
        </div>
        {selectedFiles.length > 0 && (
          <div>
            <p className="file-name">Selected files:</p>
            <ul>
              {selectedFiles.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="main">Supported files</p>
        <p className="info">PDF, JPG, PNG</p>
      </div>
    </>
  );
};

export default FileUploader;

////////////////////////////////////////////////////////////

// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import './FileUploader.css';

// const FileUploader = ({ files, setFiles, remFile }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const uploadHandler = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
//     //file.isUploading = true;
//     console.log("file: ",file.name);
//     setFiles([...files, file]);
//     setSelectedFiles([...selectedFiles, file.name]);
    
//     // upload file
//     const formData = new FormData();
//     // ...

//   };

//   return (
//     <>
//       <div className="file-card">
//         <div className="file-inputs">
//           <input type="file" label="Upload a file" onChange={uploadHandler} />
//           <button>
//             <i>
//               <FontAwesomeIcon icon={faPlus} />
//             </i>
//             Upload
//           </button>
//         </div>
//         {selectedFiles.length > 0 && (
//           <div>
//             <p className="file-name">Selected files:</p>
//             <ul>
//               {selectedFiles.map((fileName, index) => (
//                 <li key={index}>{fileName}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <p className="main">Supported files</p>
//         <p className="info">PDF, JPG, PNG</p>
//       </div>
//     </>
//   );
// };

// export default FileUploader;


