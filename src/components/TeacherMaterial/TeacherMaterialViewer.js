//this comonent displays if a teacher wants to upload a simple material
//simple material can be a post, a reading material etc.
//All contents will be fully visible to all students
//for this page we will have userid, week id, topic id,
//this page will ask for Material title, description, it will also save the timestamp from when we click post
//it will also ask for material attachments upload 
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import '../AssignmentPage/AssignmentPage.css';
import FileUploader from "../AssignmentPage/FileUploader";
import { blue } from "@mui/material/colors";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import HelpingMaterial from "../HelpingMaterial/HelpingMaterial";
import { Link } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from "@mui/material";
import MaterialFileUI from "./MaterialFileUI";
import { Grid } from '@mui/material';


function TeacherMaterialViewer() {
    const [content, setContent] = useState(null);
    const { userId, classId, weekId, topicId, materialId } = useParams();
    const [topicName, setTopicName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [MaterialAttachmentFiles, setMaterialAttachmentFiles] = useState("")
    const [uploadTime, setUploadTime] = useState(null);
    //const [AssignmentTags, setAssignmentTags] = useState(['chip1'])
    const [CurrentTag, setCurrentTag] = useState("")
    const [HelpingMaterialFiles, setHelpingMaterialFiles] = useState(['chip1', 'chip2'])


    //---------------------------------backend work-------------
    //set the content using userId, classId, weekNumber, topicId, materialId
    //using content set the title, description, topic name

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

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/material/${materialId}`);
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setMaterialAttachmentFiles(data.files);
                setUploadTime(getDateTimeString(data.uploadtime));
            } catch (error) {
                console.error('Error fetching material:', error);
            }
        };

        fetchMaterial();
    }, []);


    //........................................................

    const removeFile = (filename) => {
        setMaterialAttachmentFiles(MaterialAttachmentFiles.filter(file => file.name !== filename))
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
          paddingLeft: '5%',
          paddingRight: '5%',
          borderRadius: "20px", // Adjust the value to control the roundness of the corners
          backgroundColor: "#f8f8f8",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
          justifyContent:'center'
        
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
        //   onClick={handleSubmissionsClick}
          //disabled={submitted}
        >
          Edit Material
        </Button>
        
      </Paper>
    </Grid>
    <Grid item xs={6} md={6} lg={6}>
      <Paper 
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
      
          borderRadius: "10px", // Adjust the value to control the roundness of the corners
          backgroundColor: "#f8f8f8",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)", // Add box shadow
          overflow:'auto'
        

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
              Material
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
    {MaterialAttachmentFiles.length > 0 && (
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
        <h2>Material Attachments</h2>
        
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
            marginTop:'3%'
          
          }}
        >

          <MaterialFileUI materialFiles={MaterialAttachmentFiles} />
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

export default TeacherMaterialViewer;

