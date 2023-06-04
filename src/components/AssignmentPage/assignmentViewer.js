//This is a readable assignment
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Typography } from "@mui/material";
import { Grid } from '@mui/material';
import AsgnFilesUI from "./AsgnFilesUI";
import TRecomMaterialUI from "./TRecomMaterialUI";
import backgroundImage from "../../images/sample.jpg"; // Add the path to your background image



import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Description } from "@mui/icons-material";
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function AssignmentViewer() {



    // const { userId, classId, assignmentID } = useParams();
    //we need to get title,description, deadline, totalmarks, assignment files using the assignment ID

    const navigate = useNavigate();
    const { userId, classId, weekId, topicId, assignmentId } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState('');
    const [assignmentFiles, setAssignmentFiles] = useState([]);
    const [uploadTime, setUploadTime] = useState(null);


    const [submitted, setSubmitted] = useState(false);

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
        const fetchData = async () => {
            try {
                console.log("in useEffect in assignment.js");
                const response = await fetch(`http://localhost:4000/backend/t/${userId}/topic/${topicId}/assignment/${assignmentId}`);
                const data = await response.json();
                console.log("fetched: ", data);
                if (data) {
                    //setClasses(data);
                    console.log("fetched in front end: ", data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setTotalMarks(data.totalmarks);
                    setDeadline(getDateTimeString(data.deadline));
                    setUploadTime(getDateTimeString(data.uploadtime));

                    console.log("data.files: ", data.files);
                    let index = 0;
                    //console.log("assignmentfiles: ", assignmentFiles);
                    if (data.files) {
                        data.files.forEach((downloadUrl) => {
                            console.log("looping");
                            const filename = downloadUrl.substring(downloadUrl.lastIndexOf('%2F') + 3, downloadUrl.indexOf('?'));
                            const thisFile = { id: index, name: filename, link: downloadUrl };
                            console.log(thisFile);
                            setAssignmentFiles([...assignmentFiles, thisFile]);
                            //console.log(fileNames);
                            index = index + 1;
                        });
                    }


                    //console.log("F: ", fileNames);
                    console.log("A: ", assignmentFiles);
                    //setMaterials(data.materials);
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
    }, [userId, assignmentId]);

    const handleFileClick = (file) => {
        // event.preventDefault();
        // console.log("Assignment details:", {
        //     title,
        //     description
        // });
        window.open(file.link, '_blank');
        console.log("file clicked: ", file);
    };


    const handleSubmissionsClick = async (event) => {

        navigate(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment/${assignmentId}/submissions`);
    };

    const handleDeleteTag = (tagToDelete) => {

    }
    return (
        
            <div  style={{  backgroundColor: '#1e3c72',
            backgroundSize: "cover",
            minHeight: "100vh",
            paddingTop: "5%",
            paddingBottom: "5%",}} >
           <div style={{ marginLeft: '10%', marginRight: '10%',   backgroundColor: '#1e3c72' }}>
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
        <Grid item xs={12} md={6} lg={12}>
          <Paper 
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'space-between', // Add spacing between the buttons
              paddingLeft: '30%',
              paddingRight: '30%',
              borderRadius: "20px", // Adjust the value to control the roundness of the corners
              backgroundColor: "#f8f8f8",
              boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
            
            }}
          >
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
              onClick={handleSubmissionsClick}
              //disabled={submitted}
            >
              Submissions
            </Button>
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
              //disabled={submitted}
            >
              Edit Assignment
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <Paper 
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
          
              borderRadius: "10px", // Adjust the value to control the roundness of the corners
              backgroundColor: "#f8f8f8",
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
              </Stack>
            </Box>
          </Paper>
        </Grid>

        {/* Assignment Material */}
        {assignmentFiles.length > 0 && (
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                backgroundColor: '#f8f8f8',
                borderRadius: "10px", // Adjust the value to control the roundness of the corners
               
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
              
              }}
            >
              <AsgnFilesUI asgnFiles={assignmentFiles} />
            </Paper>
          </Grid>
        )}

        {/* Recommended Material */}
        {assignmentFiles.length > 0 && (
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Paper 
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                borderRadius: "10px", // Adjust the value to control the roundness of the corners
                backgroundColor: "#f8f8f8",
                boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
              
              }}
            >
              <TRecomMaterialUI recomFiles={assignmentFiles} />
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

export default AssignmentViewer;

