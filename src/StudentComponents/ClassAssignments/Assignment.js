//This is a readable assignment
import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
//import '../AssignmentPage/AssignmentPage.css';
//import AssignmentMaterial from "./AssignmentMaterial";
import FileUploader from "./FileUploader";
import { blue } from "@mui/material/colors";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
//import HelpingMaterial from "../HelpingMaterial/HelpingMaterial";
import { Link } from 'react-router-dom';
import FileViewer from "./FileViewer";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Description } from "@mui/icons-material";
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import CircleProgress from "./CircleProgress";
import RecomMaterialUI from "./RecomMaterialUI";

import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AsgnFilesUI from "./AsgnFilesUI";


function Assignment() {
    const { userId, classId, weekId, topicId, assignmentId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState('');
    const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [submissionFiles, setSubmissionFiles] = useState("");
    const [obtainedMarks, setObtainedMarks] = useState();
    const [uploadTime, setUploadTime] = useState();
    const [submissionDate, setSubmissionDate] = useState(null);
    const [grade, setGrade] = useState();
    const [submissionData, setSubmissionData]=useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [marked, setMarked] = useState(false);

    //To-Do: I want helping material ID in submission and want to save helping material objects in a state
    const [helpingMaterials, setHelpingMaterials] = useState([]);

    const removeFile = (filename) => {
        setAssignmentFiles(assignmentFiles.filter(file => file.name !== filename))
    }

    const getDateTimeString = (datetime) => {
        console.log(datetime);
        const date = new Date(datetime);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'UTC',
        });
        const result = `${formattedDate}, ${formattedTime}`;
        return result;
    }
    const getDateFromDateTimeString = (datetimeString) => {
        const [formattedDate, formattedTime] = datetimeString.split(', ');
        const [month, day] = formattedDate.split(' ');
        const [time, period] = formattedTime.split(/(?<=\d)(?=am|pm)/i);

        const currentDate = new Date();
        const year = currentDate.getFullYear();

        const formattedDateTime = `${month} ${day}, ${year} ${time} ${period}`;

        return new Date(formattedDateTime);
    };

    useEffect(() => {
        console.log("ahmads use effect: ", helpingMaterials)
    }, [helpingMaterials])
    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log("in useEffect in assignment.js");
                const response = await fetch(`http://localhost:4000/backend/s/${userId}/topic/${topicId}/assignment/${assignmentId}`);
                const data = await response.json();
                console.log("fetched: ", data);
                if (data) {
                    //setClasses(data);
                    console.log("fetched in front end: ", data);
                    setSubmitted(data.submitted);

                    setTitle(data.assignment.title);
                    setDescription(data.assignment.description);
                    setTotalMarks(data.assignment.totalmarks);
                    setDeadline(getDateTimeString(data.assignment.deadline));


                    console.log("data.assignment.files: ", data.assignment.files);
                    let index = 0;
                    //console.log("assignmentfiles: ", assignmentFiles);
                    if (data.assignment.files) {
                        data.assignment.files.forEach((downloadUrl) => {
                            console.log("looping");
                            const filename = downloadUrl.substring(downloadUrl.lastIndexOf('%2F') + 3, downloadUrl.indexOf('?'));
                            const thisFile = { id: index, name: filename, link: downloadUrl };
                            console.log(thisFile);
                            setAssignmentFiles([...assignmentFiles, thisFile]);
                            //console.log(fileNames);
                            index = index + 1;
                        });
                    }
                    console.log("outside marked is ", data.submission.marked)
                    console.log("submitted is ", submitted);

                    console.log("marked is ", data.submission.marked)
                    setMarked(data.submission.marked);

                    setObtainedMarks(data.submission.obtainedmarks)



                    //console.log("F: ", fileNames);
                    console.log("A: ", assignmentFiles);
                    //setMaterials(data.assignment.materials);
                    setHelpingMaterials(data.submission.recommended);
                    console.log("data.recommended: ", data.submission.recommended);
                    console.log("helping material: ", helpingMaterials);



                    //
                }
                else {
                    console.log("no classes found");
                    //setClasses([]);
                }


            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [topicId]);

    const handleFileClick = (file) => {
        // event.preventDefault();
        // console.log("Assignment details:", {
        //     title,
        //     description
        // });
        window.open(file.link, '_blank');
        console.log("file clicked: ", file);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
        const newSubmissionFiles=[]

        for (const file of submissionData) {
            if (!file) return;

            // Upload file to Firebase Storage
            const storageRef = ref(storage, `/student-submission/${file.name}`);
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

                            newSubmissionFiles.push(url);
                            // setAssignmentFiles([...assignmentFiles, url]);
                            resolve();
                        } catch (error) {
                            console.error('Error getting file URL:', error);
                            reject(error);
                        }
                    }
                );
            });
            console.log("new material files are: " ,newSubmissionFiles);

        }


        console.log("submission files: ", newSubmissionFiles);
        const currentDateTime = new Date();
        const assignmentDeadline = getDateFromDateTimeString(deadline);
        let flag = false;
        if (currentDateTime > assignmentDeadline) {
            flag = true;
        }
        else {
            flag = false;
        }
        try {
            const submissionObject = {
                marked: false,
                late: flag,
                files: newSubmissionFiles
            }
            const response = await fetch(`http://localhost:4000/backend/s/${userId}/assignment/${assignmentId}/submission`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ submission: submissionObject })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('New submission added:', data);

                //props.closeAddTopic();
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Error submitting:', error);
        }


        console.log();
    }
    catch{

    }
    };

    const handleDeleteTag = (tagToDelete) => {

    }
    const defaultTheme = createTheme();

    return (
        <div style={{
            backgroundColor: '#1e3c72',
            backgroundSize: "cover",
            minHeight: "100vh",
            paddingTop: "5%",
            paddingBottom: "5%",
        }} >
            <div style={{ marginLeft: '10%', marginRight: '10%', backgroundColor: '#1e3c72' }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 'calc(100vh - 80px)', // Adjust the value based on your page layout
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item  xs={6} md={6} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',

                                        borderRadius: "10px", // Adjust the value to control the roundness of the corners
                                        backgroundColor: "#f8f8f8",
                                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                                        overflow: 'auto'


                                    }}
                                >



                                    <Box


                                        sx={{
                                            border: 2,
                                            borderRadius: "20px",
                                            borderColor: "#4b6cb7",
                                            width: "100%",
                                            padding: "30px",
                                            margin: "auto",
                                            display: "flex",
                                            flexDirection: "column",
                                            "& .MuiTextField-root": { m: 1, width: "50ch" },
                                            paddingLeft: "50px",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}

                                    >
                                        <div className="assignment header" style={{ color: "#4b6cb7", alignContent: "flex-start" }}>
                                            <h1>Assignment</h1>
                                            <h2>Marks: {totalMarks}</h2>
                                            <h2>Deadline: {deadline}</h2>
                                            {console.log(marked)}
                                            {marked ? <h2>Obtained Marks: {obtainedMarks}</h2> : null}
                                        </div>
                                        <Stack spacing={2}>
                                            <TextField
                                                id="standard-read-only-input"
                                                label="Title"
                                                value={title}
                                                defaultValue={title}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="standard"
                                            />
                                            <TextField
                                                id="standard-multiline-static"
                                                label="Description"
                                                multiline
                                                rows={4}
                                                value={description}
                                                defaultValue={description}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="standard"
                                            />
                                        </Stack>
                                    </Box>
                                </Paper>
                            </Grid>



                            {assignmentFiles.length > 0 && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 350,
                                            backgroundColor: '#f8f8f8',
                                            borderRadius: "10px", // Adjust the value to control the roundness of the corners

                                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                                        }}
                                    >
                                        <h2>Assignment Attachments</h2>

                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 350,
                                                backgroundColor: '#f8f8f8',
                                                borderRadius: "10px", // Adjust the value to control the roundness of the corners
                                                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                                                overflow: "auto",
                                                marginTop: '3%'

                                            }}
                                        >

                                            <AsgnFilesUI asgnFiles={assignmentFiles} />
                                        </Paper>
                                    </Paper>
                                </Grid>
                            )}
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 350,
                                        backgroundColor: '#f8f8f8',
                                        borderRadius: "10px", // Adjust the value to control the roundness of the corners

                                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                                    }}
                                >

                                    <div>
                                        {submitted ? (
                                            <p>Already submitted!</p>
                                        ) : (
                                            <FileUploader files={submissionFiles} setFiles={setSubmissionFiles} remFile={removeFile} fileData={submissionData} setData={setSubmissionData}/>
                                        )}
                                    </div>


                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: submitted ? '#999999' : '#1e3c72',
                                            color: 'white',
                                            borderRadius: '10px',
                                            padding: '10px 30px',
                                            fontSize: '1rem',
                                            '&:hover': {
                                                backgroundColor: submitted ? '#999999' : '#0c2461',
                                            },
                                        }}
                                        onClick={handleSubmit}
                                        disabled={submitted}
                                    >
                                        {submitted ? 'Submitted' : 'Submit'}
                                    </Button>
                                </Paper>
                            </Grid>


                            {/* Chart */}
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 350,
                                        backgroundColor: '#f8f8f8',
                                        borderRadius: "10px", // Adjust the value to control the roundness of the corners

                                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                                    }}
                                >
                                    <CircleProgress percentage={(obtainedMarks / totalMarks) * 100} circleWidth="200" marked={marked} />
                                </Paper>
                            </Grid>
                            {/* Recommended Material */}

                            {helpingMaterials.length > 0 && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 350,
                                            backgroundColor: '#f8f8f8',
                                            borderRadius: "10px", // Adjust the value to control the roundness of the corners

                                            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                                        }}
                                    >
                                        <h2>Recommended Material Attachments</h2>

                                        <Paper
                                            sx={{
                                                p: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: 350,
                                                backgroundColor: '#f8f8f8',
                                                borderRadius: "10px", // Adjust the value to control the roundness of the corners
                                                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                                                overflow: "auto",
                                                marginTop: '3%'

                                            }}
                                        >

                                            <RecomMaterialUI
                                                recomFiles={helpingMaterials}
                                            />
                                        </Paper>
                                    </Paper>
                                </Grid>
                            )}








                        </Grid>
                    </Box>
                </Box>





            </div>
        </div>
    );
}


export default Assignment;

