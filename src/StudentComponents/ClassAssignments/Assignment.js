//This is a readable assignment
import React, { useState } from "react";
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


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Description } from "@mui/icons-material";
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function Assignment() {
    // const { userId, classId, assignmentID } = useParams();
    //we need to get title,description, deadline, totalmarks, assignment files using the assignment ID

    const [title, setTitle] = useState("Assignment 1");
    const [description, setDescription] = useState("Dear Students, this is Assignment 1 for our given course. In this assignment we have to use concept of inheritance");
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("50");
    const [AssignmentFiles, setAssignmentFiles] = useState(['Assignment.pdf', 'Another.pdf']);
    const [SubmissionFiles, setSubmissionFiles] = useState("");
    const [submissionDate, setSubmissionDate] = useState(null);
    const [grade, setGrade] = useState()

    const removeFile = (filename) => {
        setAssignmentFiles(AssignmentFiles.filter(file => file.name !== filename))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Assignment details:", {
            title,
            description
        });
    };

    const handleDeleteTag = (tagToDelete) => {
       
    }
    return (
        <div>
            <div>

               
                <Box
                

                    sx={{
                        border: 2,
                        borderRadius:"20px",
                        borderColor:"#4b6cb7",
                        width:"70%",
                        padding:"30px",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        "& .MuiTextField-root": { m: 1, width: "50ch" },
                        paddingLeft: "50px",
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                >
                     <div className="assignment header" style={{ color: "#4b6cb7", alignContent:"flex-start"}}>
                    <h1>Assignment</h1>
                    <h2>Marks: {totalMarks}</h2>
                </div>
                    <Stack spacing={2}>
                        <TextField
                            id="standard-read-only-input"
                            label="Title"
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
                            defaultValue={description}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="standard"
                        />
                        <div style={{ display:"flex", flexDirection:"row", color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }} >
                        
                        
                            {AssignmentFiles && AssignmentFiles.map((file) => (
                                <div key={file} style={{padding:"3px"}}>
                                    <Chip key={file} label={file} onDelete={() => handleDeleteTag(file)} />
                                </div>
                            ))}
                          
              
                    </div>
                        
                    <div>
                    <FileUploader files={SubmissionFiles} setFiles={setSubmissionFiles} remFile={removeFile}></FileUploader>
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
        </div>
    );
}

export default Assignment;

