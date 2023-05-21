import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUploader.css'


const FileUploader = ({ files, setFiles, remFile }) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        file.isUploading = true;
        setFiles([...files, file])
        console.log(file.name);

        // upload file
        const formData = new FormData();
        // formData.append(
        //     "newFile",
        //     file,
        //     file.name
        // )
        // axios.post('http://localhost:8080/upload', formData)
        //     .then((res) => {
        //         file.isUploading = false;
        //         setFiles([...files, file])
        //     })
        //     .catch((err) => {
        //         // inform the user
        //         console.error(err)
        //         removeFile(file.name)
        //     });
    }

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

                <p className="main">Supported files</p>
                <p className="info">PDF, JPG, PNG</p>

            </div>
        </>
    )
}

export default FileUploader