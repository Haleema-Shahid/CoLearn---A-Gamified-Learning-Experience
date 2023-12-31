// //for this assignment page we will have userid, week id, topic id,
// //this page will ask for asignment title, description, deadline, total marks, it will also save the timestamp from when we click post
// //it will also ask for assignment material upload and helping material upload
import React, { useState, useEffect } from "react";
import moment from 'moment';
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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileItem from "./FileItem";
import ClassHeader from "../ClassHeader/ClassHeader";
import CircularProgress from "@mui/material/CircularProgress";

import Grid from '@mui/material/Grid';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function AssignmentPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const { userId, classId, weekId, weekNumber, topicId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");


    const [helpingMaterialClick, setHelpingMaterialClick] = useState(true);
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");
    const [assignmentFiles, setAssignmentFiles] = useState([])
    const [assignmentTags, setAssignmentTags] = useState([]);
    const [assignmentFilesData, setAssignmentFilesData] = useState([])
    const [helpingMaterialData, setHelpingMaterialData] = useState([])
    //an array that has all the helping material data
    //like is_Recommended, full file, difficulty level and tags for all the files


    const [currentTag, setCurrentTag] = useState("")
    const [helpingMaterialFiles, setHelpingMaterialFiles] = useState([])

    const [isUploading, setIsUploading] = useState(false);

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

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                console.log("materials fetched: ", location.state?.helpingMaterials)

            } catch (error) {
                console.error('Error fetching materials:', error);
            }
        };

        fetchMaterials();
    }, [weekId]);

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
        event.preventDefault();
        setIsUploading(true);
        //here goes the backend for uploading the assignment
        //creation date and time setter
        console.log("here: ", location.state?.helpingMaterials);
        setHelpingMaterialFiles(location.state?.helpingMaterials);
        console.log("handle submit clicked");
        console.log("before fetching api: helpingMaterials: ", helpingMaterialFiles);
        console.log(assignmentFilesData)
        console.log(helpingMaterialData)

        try {
            const newAssignmentFiles = [];
            const newHelpingMaterialData = [];

            for (const data of helpingMaterialData) {

                if (!data.file) continue;
                const storageRef = ref(storage, `/helping-material/${data.file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, data.file);

                try {
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
                                console.log('File', data.file.name, 'uploaded successfully');
                                try {
                                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                                    console.log('File URL:', url);

                                    const newData = {
                                        is_recommended: data.is_recommended,
                                        level: data.level,
                                        tags: data.tags,
                                        file: url
                                    };

                                    newHelpingMaterialData.push(newData);
                                    resolve();
                                } catch (error) {
                                    console.error('Error getting file URL:', error);
                                    reject(error);
                                }
                            }
                        );

                    });
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }


            for (const file of assignmentFilesData) {
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

                                newAssignmentFiles.push(url);
                                // setAssignmentFiles([...assignmentFiles, url]);
                                resolve();
                            } catch (error) {
                                console.error('Error getting file URL:', error);
                                reject(error);
                            }
                        }
                    );
                });
                console.log("new assignment files are: ", newAssignmentFiles);
                console.log("new helping materials are: ", newHelpingMaterialData);

            }
            //-----------------------------



            const newAssn = {
                topicId: topicId,
                title: title,
                description: description,
                uploadtime: moment().toDate(),
                deadline: deadline,
                totalmarks: totalMarks,
                tags: assignmentTags,
                files: newAssignmentFiles
            };
            //setAssignmentFiles((prevAssignmentFiles) => [...prevAssignmentFiles, ...newAssignmentFiles]);
            console.log("assignment files: ", assignmentFiles);
            //const name = topicName;
            // Send a POST request to the API endpoint
            const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newAssn: newAssn, helpingMaterials: newHelpingMaterialData })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New assignment added:', data);
                navigate(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment/${data.assignmentId}/AssignmentViewer`)

                //props.closeAddTopic();
            } else {
                throw new Error('Failed to add assignment');
            }
        } catch (error) {
            console.error('Error adding assignment:', error);
        }
        finally {

            const now = dayjs();
        // setCreationDate(now.format('YYYY-MM-DD'));
        // setCreationTime(now.format('HH:mm:ss'));
        event.preventDefault();
        console.log("Assignment details:", {
            title,
            description,
            deadline,
            totalMarks,
            assignmentFiles
        });

        setIsUploading(false);
        }

        
    };
    const handleTotalMarksChange = (event) => {
        let value = event.target.value.trim(); // Trim any leading/trailing spaces
        value = value.replace(/^0+/, ''); // Remove leading zeros

        if (value === "") {
            setTotalMarks(""); // If the input becomes empty, set it as an empty string
        } else {
            const numericValue = Number(value); // Convert the value to a number
            if (!isNaN(numericValue)) { // Check if the numeric value is valid
                if (numericValue > 1000) {
                    setTotalMarks(1000);
                } else if (numericValue < 0) {
                    setTotalMarks(0);
                } else {
                    setTotalMarks(numericValue);
                }
            }
        }
    };

    const handleCurrentTagChange = (event) => {
        const value = event.target.value;
        setCurrentTag(value);
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

    const deleteAssignmentFileItem = (name) => {
        setAssignmentFilesData(Files => Files.filter((File) => File.name !== name))
    }

    const handleHelpingMaterialClick = () => {
        setHelpingMaterialClick(!helpingMaterialClick);
    }



    const handleKeyDownforTag = (event) => {
        if (event.key === "Backspace" && currentTag === "") {
            // Handle backspace to delete the last tag
            setAssignmentTags(assignmentTags =>
                assignmentTags.slice(0, assignmentTags.length - 1)
            );
        }
    };

    
const uploadingProgressStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '20px',
    color: 'white',
    borderRadius: '8px',
    zIndex: '9999',
  };
  
  const blurStyle = {
    filter: 'blur(5px)',
    pointerEvents: 'none',
  };



    return (

        <div style={{ justifyContent: 'center' }}>
            <div style={isUploading ? blurStyle : {}}>
            <div>
                <ClassHeader userId={userId} classId={classId} />
            </div>
            {!helpingMaterialClick && (
                <div style={{ paddingLeft: '8%', paddingRight: '10%', paddingTop: '20px', paddingBottom: '20px' }}>
                    <Grid container spacing={3} >
                        {/* Assignment Information */}
                        <Grid item xs={12} md={6} lg={8} style={{ display: 'flex' }}>
                            <Paper elevation={3} style={{ flexGrow: 1 }}>
                                <div>
                                    
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            "& .MuiTextField-root": { width: "50ch" },
                                            paddingLeft: "20px",
                                            paddingRight: '20px',
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <Stack spacing={1.25}>
                                        <div style={{ color: "#4b6cb7" }}>
                                        <Typography variant="body1" gutterBottom
                                            sx={{
                                                fontSize: '1rem',
                                                fontFamily: 'Montserrat',
                                                fontWeight: '-50',
                                                paddingTop:'5px',
                                            }}>
                                            <h1>Assignment</h1>
                                        </Typography>
                                    </div>
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

                                            <div className="Tags-Assignment" style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                                <TextField
                                                    required
                                                    id="AssignmentTags"
                                                    label="Input Tags for Assignment"
                                                    value={currentTag}
                                                    onChange={handleCurrentTagChange}
                                                    sx={{ width: "100%", mt: 2, marginBottom: '10px' }}
                                                />
                                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    <Button
                                                        className='HandleTags'
                                                        onClick={handleAssignmentTags}
                                                        onKeyDown={handleKeyDownforTag}
                                                        sx={{
                                                            backgroundColor: '#1e3c72',
                                                            color: 'white',
                                                            borderRadius: '10px',
                                                            padding: '5px 15px',
                                                            fontSize: '0.75rem',
                                                            marginBottom: '5px',
                                                            marginRight: '5px',
                                                            '&:hover': {
                                                                backgroundColor: '#0c2461',
                                                            },
                                                        }}
                                                    >
                                                        Add Tag
                                                    </Button>
                                                    
                                                    {assignmentTags.map((tag) => (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            onDelete={() => handleDeleteTag(tag)}
                                                            sx={{ marginRight: '5px', marginBottom: '5px' }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                        </Stack>

                                        {/* Buttons */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '10px', marginBottom: '20px' }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#1e3c72',
                                                    color: 'white',
                                                    borderRadius: '10px',
                                                    padding: '5px 20px',
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        backgroundColor: '#0c2461',
                                                    },
                                                }}
                                            >
                                                Post Assignment
                                            </Button>
                                            <Button
                                                onClick={handleHelpingMaterialClick}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#1e3c72',
                                                    color: 'white',
                                                    borderRadius: '10px',
                                                    padding: '5px 20px',
                                                    fontSize: '0.9rem',
                                                    '&:hover': {
                                                        backgroundColor: '#0c2461',
                                                    },
                                                }}
                                            >
                                                Go back to Helping Material
                                            </Button>
                                        </div>

                                    </Box>
                                </div>
                            </Paper>
                        </Grid>

                        {/* File Uploader */}
                        <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', }}>
                            <Paper elevation={3} style={{ padding: '40px', flexGrow: 1 }}>

                                <div >
                                    <div style={{ marginBottom: '30px', marginTop: '20px' }}>
                                        <FileUploader
                                            files={assignmentFiles}
                                            setFiles={setAssignmentFiles}
                                            remFile={removeFile}
                                            assignmentData={assignmentFilesData}
                                            setData={setAssignmentFilesData}
                                        ></FileUploader>
                                    </div>

                                    <div style={{ padding: '10px' }}>
                                        {assignmentFilesData.map((file, index) => (
                                            <div key={index} style={{ marginBottom: '10px', }}>
                                                <FileItem file={file} deleteFile={deleteAssignmentFileItem} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>)}
            {
                helpingMaterialClick &&
                <div>

                    {console.log("helping material data: ", helpingMaterialData)}
                    <HelpingMaterial helpingData={helpingMaterialData} setHelpingMaterialData={setHelpingMaterialData} onNextClick={handleHelpingMaterialClick} />
                </div>
            }
            </div>
            {isUploading && (
  <div style={uploadingProgressStyle}>
    <CircularProgress />
    <p>Uploading...</p>
  </div>
)}
        </div>
    );

}

export default AssignmentPage;

