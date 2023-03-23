// //for this assignment page we will have userid, week id, topic id,
// //this page will ask for asignment title, description, deadline, total marks, it will also save the timestamp from when we click post
// //it will also ask for assignment material upload and helping material upload
// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";

// export default function FormPropsTextFields() {
//   return (
//     <Box
//       component="form"
//       sx={{
//         display: "flex", // Add this line to enable flexbox layout
//         flexDirection: "column", // Add this line to stack the fields vertically
//         alignItems: "flex-start", // Add this line to align items to the left
//         "& .MuiTextField-root": { m: 1, width: "25ch",marginLeft: 0 },
//         width: "50%", // Add this line to adjust the width of the form
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <div>
//         <TextField required id="outlined-required" label="Assignment Title" />
//       </div>
//       <div>
//         <TextField
//           id="outlined-textarea"
//           label="Multiline Placeholder"
//           placeholder="Placeholder"
//           multiline
//         />
//       </div>
//     </Box>
//   );
// }
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
import AssignmentMaterial from "./AssignmentMaterial";
import FileUploader from "./FileUploader"

// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// function AssignmentPage() {
//     //const { userId, classId, weekId, topicId } = useParams();

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [deadline, setDeadline] = useState(null);
//     const [totalMarks, setTotalMarks] = useState("");

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Assignment details:", {
//             title,
//             description,
//             deadline,
//             totalMarks,
//         });
//     };
//     const handleTotalMarksChange = (event) => {
//         const value = Number(event.target.value);
//         if (value > 1000) {
//           setTotalMarks(1000);
//         } 
//         else if (event.key === "Backspace" && value === 0) {
//           setTotalMarks("");
//         } 
//         else if ( value < 0) {
//             setTotalMarks(0);
//         }
//         else {
//           setTotalMarks(value);
//         }
//       };

//     return (
//         <div className="split left" style={{ display: "flex", justifyContent: "flex-start" }}>
//             <Paper sx={{ marginLeft: "auto", padding: "16px" }}>
//                 <form onSubmit={handleSubmit}>
//                     <Stack spacing={2}>
//                         <TextField
//                             required
//                             id="assignment-title"
//                             label="Assignment Title"
//                             value={title}
//                             onChange={(event) => setTitle(event.target.value)}
//                             fullWidth
//                             sx={{ borderColor: "darkblue", color: "darkblue" }}
//                         />
//                         <TextField
//                             id="assignment-description"
//                             label="Description"
//                             value={description}
//                             onChange={(event) => setDescription(event.target.value)}
//                             multiline
//                             rows={4}
//                             fullWidth
//                             sx={{ borderColor: "darkblue", color: "darkblue" }}
//                         />
//                         <LocalizationProvider dateAdapter={AdapterDateFns}>
//                             <DatePicker
//                                 label="Deadline"
//                                 value={deadline}
//                                 onChange={(newValue) => setDeadline(newValue)}
//                                 renderInput={(params) => <TextField {...params} />}
//                                 fullWidth
//                                 sx={{ borderColor: "darkblue", color: "darkblue" }}
//                             />
//                         </LocalizationProvider>
//                         <TextField
//                             required
//                             id="total-marks"
//                             label="Total Marks"
//                             type="number"
//                             inputProps={{ min: 0, max: 1000 }}
//                             value={totalMarks}
//                             onChange={handleTotalMarksChange}
//                             onKeyDown={handleTotalMarksChange}
//                             error={totalMarks > 1000}
//                             helperText={totalMarks > 1000 || totalMarks< 0 ? "Maximum 1000 marks allowed" : ""}
//                             sx={{ width: "100%", mt: 2 , borderColor: "darkblue", color: "darkblue" }}
                            
//                         />
//                         <TextField type="submit" value="Submit" fullWidth />

//                     </Stack>
//                 </form>
//             </Paper>
//             <div className="split right">
//                 <AssignmentMaterial/>
//             </div>
//         </div>
//     );
// }

// export default AssignmentPage;
function AssignmentPage() {
    //const { userId, classId, weekId, topicId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState(null);
    const [totalMarks, setTotalMarks] = useState("");
    const [AssignmentFiles, setAssignmentFiles]=useState("")
    const [HelpingMaterialFiles, setHelpingMaterialFiles]=useState("")
    
  const removeFile = (filename) => {
    setAssignmentFiles(AssignmentFiles.filter(file => file.name !== filename))
  }


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
        <div className="split left" style={{ width:"50%",left: 0}}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiTextField-root": { m: 1, width: "50ch" },
                    paddingLeft:"50px"
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Deadline"
                            value={deadline}
                            onChange={(newValue) => setDeadline(newValue)}
                            renderInput={(params) => <TextField {...params} />}
                            fullWidth
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
                        helperText={totalMarks > 1000 || totalMarks< 0 ? "Maximum 1000 marks allowed" : ""}
                        sx={{ width: "100%", mt: 2 }}
                    />
                    <TextField type="submit" value="Submit" fullWidth />
                </Stack>
            </Box>
            
        </div>
        <div className="split right">
            <div className="file-uploader-container">
            <FileUploader files={AssignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}></FileUploader>
            </div>
            <div className="file-uploader-container" style={{ marginTop: '20px' }}>
            <FileUploader files={AssignmentFiles} setFiles={setAssignmentFiles} remFile={removeFile}></FileUploader>
            </div>
        </div>
        </div>
    );
}

export default AssignmentPage;

