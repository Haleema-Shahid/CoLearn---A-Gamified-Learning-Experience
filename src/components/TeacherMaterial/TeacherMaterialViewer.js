//this comonent displays if a teacher wants to upload a simple material
//simple material can be a post, a reading material etc.
//All contents will be fully visible to all students
//for this page we will have userid, week id, topic id,
//this page will ask for Material title, description, it will also save the timestamp from when we click post
//it will also ask for material attachments upload 
import React, { useState } from "react";
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


function TeacherMaterialViewer() {
    const [content, setContent]=useState(null);
    const { userId, classId, weekId, weekNumber, topicId, materialId } = useParams();
    const [topicName, setTopicName]=useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate]=useState("");
    const [creationTime, setCreationTime]=useState("");
    const [MaterialAttachmentFiles, setMaterialAttachmentFiles] = useState("")
    //const [AssignmentTags, setAssignmentTags] = useState(['chip1'])
    const [CurrentTag, setCurrentTag] = useState("")
    const [HelpingMaterialFiles, setHelpingMaterialFiles] = useState(['chip1', 'chip2'])
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');


    //---------------------------------backend work-------------
    //set the content using userId, classId, weekNumber, topicId, materialId
    //using content set the title, description, topic name



    //........................................................

    const removeFile = (filename) => {
        setMaterialAttachmentFiles(MaterialAttachmentFiles.filter(file => file.name !== filename))
    }


    const handleSubmit = (event) => {
        //here goes the backend for uploading the assignment
        //creation date and time setter
        const now = dayjs();
        setCreationDate(now.format('YYYY-MM-DD'));
        setCreationTime(now.format('HH:mm:ss'));
        event.preventDefault();
        console.log("Assignment details:", {
            title,
            description
        });
    };

   
    return (
        <div>
            <div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                        <h1>{`Material for ${topicName}`}</h1>
                    </div>
                    <Box
                        component="form"
                        
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
                                disabled
                                id="assignment-title"
                                label="Assignment Title"
                                value={title}
                                fullWidth
                            />
                            <TextField
                            disabled
                                id="assignment-description"
                                label="Description"
                                value={description}
                                multiline
                                rows={4}
                                fullWidth
                            />
                            
                            

                        </Stack>

                    </Box>


                </div>
            </div>
        </div>
    );
}

export default TeacherMaterialViewer;

