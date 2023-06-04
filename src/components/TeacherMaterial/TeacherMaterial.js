//this comonent displays if a teacher wants to upload a simple material
//simple material can be a post, a reading material etc.
//All contents will be fully visible to all students
//for this page we will have userid, week id, topic id,
//this page will ask for Material title, description, it will also save the timestamp from when we click post
//it will also ask for material attachments upload 
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import '../AssignmentPage/AssignmentPage.css';
import FileUploader from "../AssignmentPage/FileUploader";
import Button from '@mui/material/Button';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileItem from "../AssignmentPage/FileItem";

// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//-----------------------------------
// BACKEND NOTES:
// When the component is called you should get the name of topic from the backend using the topic id
// save this to state topicName
// so we can display in which week and topic 
// user is adding the Material
// When user clicks post assignment it should post upload the material to the backend
//-------------------------------------


function TeacherMaterial() {
    const { userId, classId, weekId, weekNumber, topicId } = useParams();
    const [topicName, setTopicName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [MaterialAttachmentFiles, setMaterialAttachmentFiles] = useState("")

    const [materialData, setMaterialData]=useState([]);//full file of material

    //const [AssignmentTags, setAssignmentTags] = useState(['chip1'])

    const navigate = useNavigate();

    const removeFile = (filename) => {
        setMaterialAttachmentFiles(MaterialAttachmentFiles.filter(file => file.name !== filename))
    }


    const handleSubmit = async (event) => {
        //here goes the backend for uploading the material
        event.preventDefault();

        try {
            const newMaterialFiles = [];

            for (const file of materialData) {
                if (!file) return;

                // Upload file to Firebase Storage
                const storageRef = ref(storage, `/files/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        (snapshot) => {
                            // Track upload progress if needed
                            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log(`Upload progress: ${progress}%`);
                        },
                        (error) => {
                            console.error('Error uploading file:', error);
                            reject(error);
                        },
                        async () => {
                            // File upload completed
                            console.log('File', file.name, 'uploaded successfully');
                            try {
                                const url = await getDownloadURL(uploadTask.snapshot.ref);
                                console.log('File URL:', url);

                                newMaterialFiles.push(url);
                                // setAssignmentFiles([...assignmentFiles, url]);
                                resolve();
                            } catch (error) {
                                console.error('Error getting file URL:', error);
                                reject(error);
                            }
                        }
                    );
                });
                console.log("new material files are: " ,newMaterialFiles);

            }
            //-----------------------------
            const newMaterial = {
                topicId: topicId,
                title: title,
                description: description,
                files: newMaterialFiles,
                uploadtime: new Date()
            }

            const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/material`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ material: newMaterial })
            });
            if (response.ok) {
                const data = response.json();
                navigate(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/materialId/${data.materialId}/materialViewer`)

            }
            else {
                throw new Error("failed to add material");
            }


        }
       
        catch (error) {
            console.error('Error adding material:', error);
        }
        

    };

    const deleteMaterialFileItem = (name) => {
        setMaterialData(Files => Files.filter((File) => File.name !== name))
    }

    return (
        <div>
            <div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                        <h1>{`Material`}</h1>
                    </div>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            margin: "auto",
                            display: "flex",
                            flexDirection: "column",
                            "& .MuiTextField-root": { m: 1, width: "50ch" },
                            paddingLeft: "50px",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        noValidate
                        autoComplete="off"

                    >
                        <Stack spacing={2}>
                            <TextField
                                required
                                id="assignment-title"
                                label="Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                fullWidth
                            />
                            <TextField
                                id="assignment-description"
                                label="Description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                multiline
                                rows={4}
                                fullWidth
                            />
                            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Deadline"
                                    value={deadline}
                                    onChange={(newValue) => setDeadline(newValue)}
                                    renderInput={(params) => <TextField {...params} />}
                                    fullWidth
                                />
                            </LocalizationProvider> */}
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Deadline"
                                    defaultValue={yesterday}
                                    disablePast
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    onChange={(newValue) => setDeadline(newValue)}
                                />
                            </LocalizationProvider> */}

                            {/* <TextField
                                required
                                id="total-marks"
                                label="Total Marks"
                                type="number"
                                inputProps={{ min: 0, max: 1000 }}
                                value={totalMarks}
                                onChange={handleTotalMarksChange}
                                onKeyDown={handleTotalMarksChange}
                                error={totalMarks > 1000}
                                helperText={totalMarks > 1000 || totalMarks < 0 ? "Maximum 1000 marks allowed" : ""}
                                sx={{ width: "100%", mt: 2 }}
                            /> */}

                            {/* <div className="Tags-Assignment">
                                <TextField
                                    required
                                    id="AssignmentTags"
                                    label="Input Tags for Assignment"
                                    value={CurrentTag}
                                    onChange={handleCurrentTagChange}
                                    sx={{ width: "100%", mt: 2 }}
                                />
                                <Button className='HandleTags' onClick={handleAssignmentTags} sx={{
                                backgroundColor: '#1e3c72',
                                color: 'white',
                                borderRadius: '10px',
                                padding: '5px 15px',
                                fontSize: '0.75rem',
                                '&:hover': {
                                    backgroundColor: '#0c2461',
                                },
                            }}>Add Tag</Button>
                                {
                                    AssignmentTags.map((tag) => (
                                        <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
                                    ))
                                }

                            </div> */}
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#1e3c72',
                                    color: 'white',
                                    borderRadius: '10px',
                                    padding: '10px 30px',
                                    fontSize: '1rem',
                                    '&:hover': {
                                        backgroundColor: '#0c2461',
                                    },
                                }}
                            >
                                Post Material
                            </Button>

                        </Stack>

                    </Box>


                </div>
                <div className="split right" >
                    <div className="file-uploader-container">
                        <FileUploader files={MaterialAttachmentFiles} setFiles={setMaterialAttachmentFiles} remFile={removeFile} assignmentData={materialData} setData={setMaterialData}></FileUploader>
                    </div>
                    <div style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>
      {materialData.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <FileItem file={file} deleteFile={deleteMaterialFileItem} />
        </div>
      ))}
    </div>
                </div>
            </div>
        </div>
    );
}

export default TeacherMaterial;

