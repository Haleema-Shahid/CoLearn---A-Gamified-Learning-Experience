// //for this assignment page we will have userid, week id, topic id,
// //this page will ask for asignment title, description, deadline, total marks, it will also save the timestamp from when we click post
// //it will also ask for assignment material upload and helping material upload
import React, { useState } from "react";
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


import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function AssignmentPage() {
    const { userId, classId, weekId, weekNumber, topicId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");

    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");
    const [AssignmentFiles, setAssignmentFiles] = useState("")
    const [AssignmentTags, setAssignmentTags] = useState(['chip1'])
    const [CurrentTag, setCurrentTag] = useState("")
    const [HelpingMaterialFiles, setHelpingMaterialFiles] = useState(['chip1', 'chip2'])
    const today = dayjs();
    const yesterday = dayjs().subtract(1, 'day');

    const removeFile = (filename) => {
        setAssignmentFiles(AssignmentFiles.filter(file => file.name !== filename))
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
        if (value != "") {
            setCurrentTag(value)
        }
    };
    const handleAssignmentTags = () => {

        if (CurrentTag != "") {
            setAssignmentTags([...AssignmentTags, CurrentTag]);
            setCurrentTag("")
        }


    }
    const handleDeleteTag = (tagToDelete) => {
        setAssignmentTags(AssignmentTags => AssignmentTags.filter((AssignmentTag) => AssignmentTag != tagToDelete))
    }

    return (
        <div>
            <div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                        <h1>Assignment</h1>
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
                                    onChange={(newValue) => setDeadline(newValue)}
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

                            <div className="Tags-Assignment">
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
                        <FileUploader files={AssignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}></FileUploader>
                    </div>
                    <div>
                        <Link to={`/t/user/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/HelpingMaterial`}>
                            <Button

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
                        </Link>
                    </div>
                    <div>
                        {/* <HelpingMaterial></HelpingMaterial> */}
                    </div>
                    <div className="file-uploader-container" style={{ marginTop: '20px' }}>
                        <FileUploader files={AssignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}></FileUploader>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignmentPage;

