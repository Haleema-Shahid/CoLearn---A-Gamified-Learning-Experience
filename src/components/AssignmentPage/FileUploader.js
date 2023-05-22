// import React, { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import './FileUploader.css';
// import storage from '../../firebase';


// const FileUploader = ({ files, setFiles, remFile }) => {
//   const [selectedFiles, setSelectedFiles] = useState([]);

//   const uploadHandler = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;
  
//     // Upload file to Firebase Storage
//     const storageRef = ref(storage);
//     const fileRef = storageRef.child(file.name);
//     const uploadTask = fileRef.put(file);
  
//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         // Track upload progress if needed
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log(`Upload progress: ${progress}%`);
//       },
//       (error) => {
//         console.error('Error uploading file:', error);
//       },
//       () => {
//         // File upload completed
//         console.log('File uploaded successfully');
//         fileRef.getDownloadURL()
//           .then((url) => {
//             // Send the file URL to the server to store in MongoDB
//             // You can make a fetch request to your server endpoint here
//             console.log('File URL:', url);
//           })
//           .catch((error) => {
//             console.error('Error getting file URL:', error);
//           });
//       }
//     );
//     setFiles([...files, file]);
//     setSelectedFiles([...selectedFiles, file.name]);  
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

////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './FileUploader.css';

const FileUploader = ({ files, setFiles, remFile }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    //file.isUploading = true;
    console.log("file: ",file.name);
    setFiles([...files, file]);
    setSelectedFiles([...selectedFiles, file.name]);
    
    // upload file
    const formData = new FormData();
    // ...

  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <input type="file" label="Upload a file" onChange={uploadHandler} />
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







//////////////////////////////////////

// const FileUploader = ({ files, setFiles, remFile }) => {
//     const uploadHandler = (event) => {
//         const file = event.target.files[0];
//         if(!file) return;
//         file.isUploading = true;
//         setFiles([...files, file])

//         // upload file
//         const formData = new FormData();
        
//     }

//     return (
//         <>
//             <div className="file-card">

//                 <div className="file-inputs">
//                     <input type="file" label="Upload a file" onChange={uploadHandler} />
//                     <button>
//                         <i>
//                             <FontAwesomeIcon icon={faPlus} />
//                         </i>
//                         Upload
//                     </button>
//                 </div>

//                 <p className="main">Supported files</p>
//                 <p className="info">PDF, JPG, PNG</p>

//             </div>
//         </>
//     )
// }

// export default FileUploader