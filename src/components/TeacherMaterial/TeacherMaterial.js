//this comonent displays if a teacher wants to upload a simple material
//simple material can be a post, a reading material etc.
//All contents will be fully visible to all students
//for this page we will have userid, week id, topic id,
//this page will ask for Material title, description, it will also save the timestamp from when we click post
//it will also ask for material attachments upload 
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import '../AssignmentPage/AssignmentPage.css';
import FileUploader from "../AssignmentPage/FileUploader";
import Button from '@mui/material/Button';
import storage from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import FileItem from "../AssignmentPage/FileItem";
import TeacherDashboardHeader from "../DashboardHeader";
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";
import ClassHeader from "../ClassHeader/ClassHeader";
import CircularProgress from "@mui/material/CircularProgress";
// //import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

//-----------------------------------
// BACKEND NOTES:
// When the component is called you should get the name of topic from the backend using the topic id
// save this to state topicName
// so we can display in which week and topic 
// user is adding the Material
// When user clicks post assignment it should post upload the material to the backend
//-------------------------------------


function TeacherMaterial() {
    const { userId, classId, weekId, weekNumber, topicId } = useParams();
    const [topicName, setTopicName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [creationTime, setCreationTime] = useState("");
    const [MaterialAttachmentFiles, setMaterialAttachmentFiles] = useState("")
    const [isUploading, setIsUploading] = useState(false);
    const [materialData, setMaterialData]=useState([]);//full file of material

    //const [AssignmentTags, setAssignmentTags] = useState(['chip1'])

    const navigate = useNavigate();

    const removeFile = (filename) => {
        setMaterialAttachmentFiles(MaterialAttachmentFiles.filter(file => file.name !== filename))
    }

    const handleSubmit = async (event) => {
        //here goes the backend for uploading the material
        event.preventDefault();
        setIsUploading(true);

        try {
            const newMaterialFiles = [];

            for (const file of materialData) {
                if (!file) return;

                // Upload file to Firebase Storage
                const storageRef = ref(storage, `/files/${file.name}`);
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

                                newMaterialFiles.push(url);
                                // setAssignmentFiles([...assignmentFiles, url]);
                                resolve();
                            } catch (error) {
                                console.error('Error getting file URL:', error);
                                reject(error);
                            }
                        }
                    );
                });
                console.log("new material files are: " ,newMaterialFiles);

            }
            //-----------------------------
            const newMaterial = {
                topicId: topicId,
                title: title,
                description: description,
                files: newMaterialFiles,
                uploadtime: new Date()
            }

            const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/material`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ material: newMaterial })
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Response is ", data);
                const materialId=data.insertedId;
                console.log("id is ,",materialId)
                navigate(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/materialId/${materialId}/materialViewer`)

            }
            else {
                throw new Error("failed to add material");
            }


        }
       
        catch (error) {
            console.error('Error adding material:', error);
        }
        finally{
            setIsUploading(false);
        }
        

    };


    const deleteMaterialFileItem = (name) => {
        setMaterialData(Files => Files.filter((File) => File.name !== name))
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
            paddingTop: "0%",
            paddingBottom: "5%",
           
          }} >
            <div style={isUploading ? blurStyle : {}}>
            <ClassHeader userId={userId} classId={classId} />
            <div style={{ marginLeft: '10%', marginRight: '10%',  marginTop:'20px' }}>
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
          
            <div>
              <div className="HelpingMaterial header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                <h1>Teacher Material</h1>
                <h5>Upload a material for your students</h5>
              </div >
              <div style={{margin:'10px', padding:'20px'}}>
            {/* ............. */}
        
                <Box
                component="form"
                sx={{
                
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { m: 1, width: "50ch" },
                  
                  justifyContent: "center",
                  alignItems: "center",
                  
          marginLeft: "20px",
          marginRight: "20px", 
                 
                }}
                noValidate
                autoComplete="off"
              >
                        <Stack spacing={2}>
                            <TextField
                                required
                                id="assignment-title"
                                label="Title"
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
                           
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                
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
                                Post Material
                            </Button>

                        </Stack>

                    </Box>
                    </div>
                    </div>
                    </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={6}>
          <Paper elevation={3} style={{ padding: '40px' }}>
            <div>
              <div style={{ marginBottom: '30px', marginTop: '20px' }}>
                <FileUploader files={MaterialAttachmentFiles} setFiles={setMaterialAttachmentFiles} remFile={removeFile} assignmentData={materialData} setData={setMaterialData}></FileUploader>
            </div>
                    <div style={{  padding: '10px' }}>
              <div className="HelpingMaterial header" style={{ color: "#4b6cb7"}}>
                <h3>These materials have been added</h3>
             </div >
      {materialData && materialData.map((file, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <FileItem file={file} deleteFile={deleteMaterialFileItem} />
        </div>
      ))}
     </div>
     
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </div>
    
{isUploading && (
    <div style={{justifyContent:'center'}}>
  <div style={uploadingProgressStyle}>
    <CircularProgress />
    <p>Uploading...</p>
  </div>
  </div>
)}
    </div>
 
    );
}

export default TeacherMaterial;

