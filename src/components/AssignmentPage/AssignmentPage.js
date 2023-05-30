// //for this assignment page we will have userid, week id, topic id,
// //this page will ask for asignment title, description, deadline, total marks, it will also save the timestamp from when we click post
// //it will also ask for assignment material upload and helping material upload
import React, { useState, useEffect } from "react";

import { Navigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import '../AssignmentPage/AssignmentPage.css';
import FileUploader from "./FileUploader";
import { blue } from "@mui/material/colors";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import HelpingMaterial from "../HelpingMaterial/HelpingMaterial";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import storage from '../../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';



import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function AssignmentPage(props) {
    const { userId, classId, weekId, weekNumber, topicId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");


    const [helpingMaterialClick, setHelpingMaterialClick] = useState(false);
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");
    const [assignmentFiles, setAssignmentFiles] = useState([])
    const [assignmentTags, setAssignmentTags] = useState(['chip1'])
    const [assignmentFilesData, setAssignmentFilesData] = useState([])


    const [currentTag, setCurrentTag] = useState("")
    const [helpingMaterialFiles, setHelpingMaterialFiles] = useState([])
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');


    const uploadHandler = () => {

        for (const file of assignmentFilesData) {
       
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
            console.log('File ', file.name, ' uploaded successfully');
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File URL:', url);
              setAssignmentFiles([...assignmentFiles, url]);
            } catch (error) {
              console.error('Error getting file URL:', error);
            }
          }
        );
      
        //setSelectedFiles([...selectedFiles, file.name]);
        }
      };



    const onAddHelpingMaterial = (helpingMaterial) => {

        console.log("helping material: ", helpingMaterial);
        setHelpingMaterialFiles([...helpingMaterialFiles, helpingMaterial]);
        setHelpingMaterialClick(false);
        if (!helpingMaterialFiles) {
            console.log("BITCHASS")
        }
        else {
            console.log("not empty");
        }
    }
    const removeFile = (filename) => {
        setAssignmentFiles(assignmentFiles.filter(file => file.name !== filename))
    }


    const handleSubmit = async (event) => {
        //here goes the backend for uploading the assignment
        //creation date and time setter
        console.log("handle submit clicked");
        console.log("before fetching api: helpingMaterials: ", helpingMaterialFiles);

        try {
            // Create the topic object
            //call file upload function
            uploadHandler();

            const newAssn = {
                topicId: topicId,
                title: title,
                description: description,
                uploadtime: new Date(),
                deadline: deadline,
                totalmarks: totalMarks,
                tags: assignmentTags,
                files: assignmentFiles
            };
            console.log("assignment files: ", assignmentFiles);
            //const name = topicName;
            // Send a POST request to the API endpoint
            const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newAssn: newAssn, helpingMaterials: helpingMaterialFiles })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New topic added:', data);

                //props.closeAddTopic();
            } else {
                throw new Error('Failed to add topic');
            }
        } catch (error) {
            console.error('Error adding topic:', error);
        }

        const now = dayjs();
        setCreationDate(now.format('YYYY-MM-DD'));
        setCreationTime(now.format('HH:mm:ss'));
        event.preventDefault();
        console.log("Assignment details:", {
            title,
            description,
            deadline,
            totalMarks,
        });
    };

    const handleTotalMarksChange = (event) => {
        const value = Number(event.target.value);
        if (value > 1000) {
            setTotalMarks(1000);
        }
        else if (event.key === "Backspace" && value === 0) {
            setTotalMarks("");
        }
        else if (value < 0) {
            setTotalMarks(0);
        }
        else {
            setTotalMarks(value);
        }
    };
    const handleCurrentTagChange = (event) => {
        const value = event.target.value;
        if (value !== "") {
            setCurrentTag(value)
        }
    };
    const handleAssignmentTags = () => {

        if (currentTag !== "") {
            setAssignmentTags([...assignmentTags, currentTag]);
            setCurrentTag("")
        }


    }
    const handleDeleteTag = (tagToDelete) => {
        setAssignmentTags(assignmentTags => assignmentTags.filter((AssignmentTag) => AssignmentTag !== tagToDelete))
    }


    const handleHelpingMaterialClick = () => {
        setHelpingMaterialClick(true);
    }
    return (
        <div>
            {!helpingMaterialClick && (<div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                        <Typography variant="body1" gutterBottom
                            sx={{
                                fontSize: '2rem',
                                fontFamily: 'Montserrat',
                                fontWeight: '-50'
                            }}>
                            Assignment
                        </Typography>
                    </div>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            // margin: "auto",
                            display: "flex",
                            flexDirection: "column",
                            "& .MuiTextField-root": { width: "50ch" },
                            paddingLeft: "50px",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        noValidate
                        autoComplete="off"

                    >
                        <Stack spacing={1.25}>
                            <TextField
                                required
                                id="assignment-title"
                                label="Assignment Title"
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Deadline"
                                    defaultValue={yesterday}
                                    disablePast
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                    onChange={(newValue) => setDeadline(newValue.toDate())} // Convert newValue to a Date object}
                                />
                            </LocalizationProvider>

                            <TextField
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
                            />

                            <div className="Tags-Assignment"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                <TextField
                                    required
                                    id="AssignmentTags"
                                    label="Input Tags for Assignment"
                                    value={currentTag}
                                    onChange={handleCurrentTagChange}
                                    sx={{ width: "100%", mt: 2 }}
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row'
                                    }}>
                                    <Button className='HandleTags' onClick={handleAssignmentTags} sx={{
                                        backgroundColor: '#1e3c72',
                                        color: 'white',
                                        borderRadius: '10px',
                                        padding: '5px 15px',
                                        fontSize: '0.75rem',
                                        marginRight: '5px',
                                        '&:hover': {
                                            backgroundColor: '#0c2461',
                                        },
                                    }}>Add Tag</Button>
                                    {
                                        assignmentTags.map((tag) => (
                                            <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
                                        ))
                                    }
                                </div>

                            </div>
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
                                Post Assignment
                            </Button>

                        </Stack>

                    </Box>


                </div>
                <div className="split right" >
                    <div className="file-uploader-container">
                        <FileUploader files={assignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}  assignmentData={assignmentFilesData} setData={setAssignmentFilesData}></FileUploader>
                    </div>
                    <div>
                        <Button onClick={handleHelpingMaterialClick}

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
                            Add Helping Material
                        </Button>


                    </div>



                    {/* <div className="file-uploader-container" style={{ marginTop: '20px' }}>
                        <FileUploader files={AssignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}></FileUploader>
                    </div> */}
                </div>
            </div>)}
            {
                helpingMaterialClick && <div>

                    <HelpingMaterial files={helpingMaterialFiles} setFiles={setHelpingMaterialFiles} onAddHelpingMaterial={onAddHelpingMaterial}></HelpingMaterial>
                </div>
            }


        </div>
    );
}

export default AssignmentPage;

