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

function TeacherMaterialViewer() {
    const [content, setContent] = useState(null);
    const { userId, classId, weekId, topicId, materialId } = useParams();
    const [topicName, setTopicName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [MaterialAttachmentFiles, setMaterialAttachmentFiles] = useState("")
    //const [AssignmentTags, setAssignmentTags] = useState(['chip1'])
    const [CurrentTag, setCurrentTag] = useState("")
    const [HelpingMaterialFiles, setHelpingMaterialFiles] = useState(['chip1', 'chip2'])


    //---------------------------------backend work-------------
    //set the content using userId, classId, weekNumber, topicId, materialId
    //using content set the title, description, topic name

    useEffect(() => {
        const fetchMaterial = async () => {
            try {
                const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/material/${materialId}`);
                const data = await response.json();
                setTitle(data.title);
                setDescription(data.description);
                setMaterialAttachmentFiles(data.files);
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
        <div>
            <div>
                <div className="split left" style={{ width: "50%", left: 0 }}>
                    <div className="assignment header" style={{ padding: "5%", paddingLeft: "25%" }}>
                        <Typography variant="h4" sx={{
                            fontFamily: 'Montserrat',
                            color: "#4b6cb7"
                        }}>
                            {title}
                        </Typography>
                        <Typography variant="h6" sx={{
                            fontFamily: 'Montserrat',
                            color: "#1a1c1f"
                        }}>
                            {description}
                        </Typography>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default TeacherMaterialViewer;

