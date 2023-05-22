// //for this assignment page we will have userid, week id, topic id,
// //this page will ask for asignment title, description, deadline, total marks, it will also save the timestamp from when we click post
// //it will also ask for assignment material upload and helping material upload
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Paper } from "@mui/material";
import '../AssignmentPage/AssignmentPage.css';
import AssignmentMaterial from "./AssignmentMaterial";
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


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function AssignmentViewer( ) {
    const { userId, classId, weekId, weekNumber, topicId, assignmentId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignmentFiles, setAssignmentFiles] = useState([])
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");
    const [helpingMaterialFiles, setHelpingMaterialFiles] = useState([])

    const [helpingMaterialClick, setHelpingMaterialClick] = useState(false);
   
    
    const [assignmentTags, setAssignmentTags] = useState(['chip1'])
    const [currentTag, setCurrentTag] = useState("")
    
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');

    const location = useLocation();
//--------------------------------backend task---------------------
//we get userId, classId, topicId, assignmentId
//get the assignment object in content state
//using this object: save the title in title state, description, deadline, total marks, AssignmentFiles, helping material files



//......................................................


    
    return (
        <div>
            <div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                        <h1>Assignment</h1>
                    </div>
                    <Box
                        component="form"
                        // onSubmit={handleSubmit}
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
                    
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    disabled
                                    label="Deadline"
                                    defaultValue={deadline}
                                    disablePast
                                    views={['year', 'month', 'day', 'hours', 'minutes']}
                                />
                            </LocalizationProvider>

                            <TextField
                                disabled
                                id="total-marks"
                                label="Total Marks"
                                type="number"
                                value={totalMarks}
                                sx={{ width: "100%", mt: 2 }}
                            />

                            
                            {/* <Button
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
                            </Button> */}

                        </Stack>

                    </Box>


               
                    


                    


        </div>
        </div>
        </div>
    );
}

export default AssignmentViewer;

