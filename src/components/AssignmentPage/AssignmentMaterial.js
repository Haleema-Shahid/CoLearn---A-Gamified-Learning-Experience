
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Paper } from "@mui/material";
import '../AssignmentPage/AssignmentPage.css'

//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function AssignmentMaterial() {
    //const { userId, classId, weekId, topicId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");

    const handleSubmit = (event) => {
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
        else if ( value < 0) {
            setTotalMarks(0);
        }
        else {
          setTotalMarks(value);
        }
      };

    return (
        <div>
            <p>Upload Assignment</p>
        </div>
    
    );
}

export default AssignmentMaterial;
