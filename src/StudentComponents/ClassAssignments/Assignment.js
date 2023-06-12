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
import { Typography } from "@mui/material";
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
import ClassHeader from "../ClassHeader/ClassHeader";
import createClassBg from '../../images/classaddcard.jpg'

import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import AsgnFilesUI from "./AsgnFilesUI";
import FileItem from "../../components/AssignmentPage/FileItem";

import TRecomMaterialUI from "../../components/AssignmentPage/TRecomMaterialUI";
import CircularProgress from "@mui/material/CircularProgress";


function Assignment() {
    const { userId, classId, weekId, topicId, assignmentId } = useParams();
    const [isUploading, setIsUploading] = useState(false);
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
    const [submissionData, setSubmissionData] = useState([]);

    const [submitted, setSubmitted] = useState(false);
    const [marked, setMarked] = useState(false);

    //To-Do: I want helping material ID in submission and want to save helping material objects in a state
    const [helpingMaterials, setHelpingMaterials] = useState([]);
    const [asgnTags, setAsgnTags]=useState([]);
    const [weakTags, setWeakTags]=useState([])

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
                    setUploadTime(getDateTimeString(data.assignment.uploadtime));
                    setAsgnTags(data.assignment.tags);
                    setWeakTags(data.submission.weaktags);
                    //setAssignmentFiles(data.assignment.files);

                   

                    let index = 0;
                    console.log("assignmentfiles: ", assignmentFiles);
                    if (data.assignment.files) {
                        const files = data.assignment.files.map((downloadUrl, index) => {
                          const filename = downloadUrl.substring(downloadUrl.lastIndexOf('%2F') + 3, downloadUrl.indexOf('?'));
                          return { id: index, name: filename, link: downloadUrl };
                        });
                        setAssignmentFiles(files);
                      }
                    console.log("outside marked is ", data.submission.marked)
                    console.log("submitted is ", submitted);

                    console.log("marked is ", data.submission.marked)
                    setMarked(data.submission.marked);

                    setObtainedMarks(data.submission.obtainedmarks)



                    //setMaterials(data.assignment.materials);
                    setHelpingMaterials(data.submission.recommended);
                    console.log("data.recommended: ", data.submission.recommended);
                    console.log("helping material: ", helpingMaterials);
                    console.log("obtained marks", obtainedMarks)



                    //
                }
                else {
                    console.log("no classes found");
                    //setClasses([]);
                }
                console.log( data.assignment.files);


            } catch (error) {
                console.log(error);
            }
            
                    //console.log("F: ", fileNames);
                    console.log("A: ", assignmentFiles);
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
       // event.preventDefault();
        setIsUploading(true);
        try {
            const newSubmissionFiles = []

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
                console.log("new material files are: ", newSubmissionFiles);

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
        catch {

        }
        finally{
            setSubmitted(true);
            setIsUploading(false);
        }
    };

    const handleDeleteTag = (tagToDelete) => {

    }
    const defaultTheme = createTheme();

    const deleteSubmissionFileItem = (name) => {
        setSubmissionData(Files => Files.filter((File) => File.name !== name))
    }

    
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
        <div style={{
            backgroundColor: 'white',
            backgroundSize: "cover",
            minHeight: "100vh",
            paddingTop: "5%",
            paddingBottom: "5%",
        }} >
            <div style={isUploading ? blurStyle : {}}>
             <ClassHeader userId={userId} classId={classId} />

            <Box
                sx={{
                    marginLeft: '10%',
                    marginRight: '10%',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 80px)', // Adjust the value based on your page layout
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',

                    borderRadius: "10px", // Adjust the value to control the roundness of the corners
                    backgroundColor: "white",
                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                  }}
                >
                  <Box
                    sx={{
                      margin: 'auto',
                      border: 2,
                      borderRadius: "10px",
                      borderColor: "#4b6cb7",
                      width: "100%",
                      padding: "30px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: 'center',
                      alignItems: 'center',
                      "& .MuiTextField-root": { m: 1, width: "50ch" },
                      paddingLeft: "50px"
                    }}
                  >
                    <div className="assignment header" style={{ color: "#4b6cb7", alignContent: "flex-start" }}>
                      <Typography variant="h4" component="h1" gutterBottom sx={{
                        fontFamily: 'Montserrat'
                      }}>
                        Assignment
                      </Typography>
                      <Typography variant="h5" component="h2" gutterBottom sx={{
                        fontFamily: 'Montserrat'
                      }}>
                        Marks: {totalMarks}
                      </Typography>
                      <Typography variant="h5" component="h2" gutterBottom sx={{
                        fontFamily: 'Montserrat'
                      }}>
                        Deadline: {deadline}
                      </Typography>
                      <Typography variant="h5" component="h2" gutterBottom sx={{
                        fontFamily: 'Montserrat'
                      }}>
                        Uploaded on: {uploadTime}
                      </Typography>
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
                      <div>
                      <Typography variant="h5" component="h2" gutterBottom sx={{
                        fontFamily: 'Montserrat'
                      }}>
                        Assignment is tagged as: 
                      </Typography>
                        {asgnTags.map((tag, index) => (
                          <Chip key={index} label={tag} style={{ marginRight: '5px' }} />
                        ))}
                      </div>
                    </Stack>
                  </Box>
                </Paper>
              </Grid>

                            <Grid item xs={12} md={6} lg={4} style={{ display: 'flex', }}>
                            <Paper elevation={3} style={{ padding: '40px', flexGrow: 1 }}>

                                <div >
                                    <div style={{ marginBottom: '30px', marginTop: '20px' }}>

                                    <div>
                                        {submitted ? (
                                            <p>Already submitted!</p>
                                        ) : (
                                            <FileUploader files={submissionFiles} setFiles={setSubmissionFiles} remFile={removeFile} fileData={submissionData} setData={setSubmissionData} />
                                           
                                        )}
                                         {console.log("submissions ", submissionData)}
                                    </div>
                                   


<div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: submitted ? '#999999' : '#1e3c72',
                                            color: 'white',
                                            borderRadius: '10px',
                                            padding: '10px 30px',
                                            width: '100%',
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
                                    </div>
                                    <div style={{ padding: '10px' }}>
                                        {submissionData.map((file, index) => (
                                            <div key={index} style={{ marginBottom: '10px', }}>
                                                <FileItem file={file} deleteFile={deleteSubmissionFileItem} />
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                    </div>
                                </Paper>
                            </Grid>

                            {/* Chart */}
                        {obtainedMarks>=0 && (<Grid item xs={12} sm={12} md={12} lg={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'auto',
                                    backgroundColor: 'white',
                                    borderRadius: "10px", // Adjust the value to control the roundness of the corners

                                    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow



                                }}
                            >
                                <CircleProgress percentage={(obtainedMarks / totalMarks) * 100} circleWidth="200" marked={marked} />
                                <h5>Your Teacher Marked your weak areas as: </h5>
                                {weakTags.map((tag, index) => (
                          <Chip key={index} label={tag} style={{ marginRight: '5px' , marginBottom:'5px'}} />
                        ))}
                            </Paper>
                            
                               
                            
                        </Grid>)}
                         


                            {assignmentFiles.length > 0 && (
                <Grid item xs={12} sm={12} md={6} lg={6}>

                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      borderRadius: "10px", // Adjust the value to control the roundness of the corners
                      backgroundColor: "white",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                      backgroundImage: `url(${createClassBg})`, backgroundSize: 'cover', backgroundPosition: 'center'

                    }}
                  >
                    <h2 style={{ color: 'white' }}>Assignment Attachments</h2>

                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                        width: 'auto',
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

{helpingMaterials.length > 0 && (
                <Grid item xs={12} sm={12} md={6} lg={6} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'auto',
                      borderRadius: "10px", // Adjust the value to control the roundness of the corners
                      backgroundColor: "white",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                      backgroundImage: `url(${createClassBg})`, backgroundSize: 'cover', backgroundPosition: 'center'

                    }}
                  >
                    <h2 style={{ color: 'white' }}>Helping Material</h2>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                        width: 'auto',
                        backgroundColor: '#f8f8f8',
                        borderRadius: "10px", // Adjust the value to control the roundness of the corners


                        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
                        overflow: "auto",
                        marginTop: '3%'

                      }}
                    >
                      <RecomMaterialUI recomFiles={helpingMaterials} />
                    </Paper>
                  </Paper>
                </Grid>
                            )}

                      

                        
                        {/* Recommended Material */}









                    </Grid>
                </Box>
            </Box>





            {/* </div> */}
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


export default Assignment;

