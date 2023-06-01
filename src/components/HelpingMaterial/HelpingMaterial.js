//in this page we allow the user to upload one doc at a time, ask for the difficulty level, requires tags and when u click add it goes back from 
//state passing in function in assignment page and add a helping material to the database
//renders all helping material objects as well
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploader from './FileUploader'
import Box from "@mui/material/Box";
import Chip from '@mui/material/Chip';
import Stack from "@mui/material/Stack";
import { useNavigate, useLocation } from 'react-router-dom';




const HelpingMaterial = () => {
  const { userId, classId, weekId, topicId } = useParams();
  const [helpingMaterialFile, setHelpingMaterialFile] = useState([]);
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [helpingMaterialTags, setHelpingMaterialTags] = useState([]);
  const [helpingMaterials, setHelpingMaterials] = useState([]);
  const [CurrentTag, setCurrentTag] = useState("")
  const navigate = useNavigate();
  const location = useLocation();
  //console.log("outside everything: ", helpingMaterialFile)




  const handleSubmitHelpingMaterial = (e) => {
    e.preventDefault();
    const helpingMaterial = {
      is_recommended: false,
      level: difficulty,
      tags: helpingMaterialTags,
      file: helpingMaterialFile
    };
    console.log("in handle submit: ", helpingMaterial);
    setHelpingMaterials([...helpingMaterials, helpingMaterial]);
    setHelpingMaterialFile('');
    setHelpingMaterialTags([]);
    setDifficulty('');

    // props.setFiles([...props.files, helpingMaterial]);
    // props.onAddHelpingMaterial(helpingMaterial);
    //this will send all the helping material back to parent assignment material,
    //------maybe we need to send tags too--------------
  }
  const removeFile = (filename) => {
    setHelpingMaterialFile(helpingMaterialFile.filter(file => file.name !== filename))
  }

  const handleFileChange = (event) => {
    setHelpingMaterialFile(event.target.files[0]);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };


  const handleNextClick = () => {

    const link = `/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment`;
    // Navigating to the link using react-router-dom's useNavigate hook
    navigate(link, { state: { helpingMaterials: helpingMaterials } }); // Sending the helpingMaterials array as a prop
  };

  const handleCurrentTagChange = (event) => {
    const value = event.target.value;
    if (value != "") {
      setCurrentTag(value)
    }
  };
  const handleHelpingMaterialTags = () => {
    if (CurrentTag != "") {
      setHelpingMaterialTags([...helpingMaterialTags, CurrentTag]);
      setCurrentTag("")
    }


  }
  const handleDeleteTag = (tagToDelete) => {
    setHelpingMaterialTags(helpingMaterialTags => helpingMaterialTags.filter((helpingMaterialTag) => helpingMaterialTag != tagToDelete))
  }

  return (
    <div className='Helping material left'>
      <div>
        <div className="split left" style={{ width: "50%", left: 0, marginTop: '9%' }}>
          <div className="HelpingMaterial header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
            <h1>Helping Material</h1>
          </div>
          <Box
            component="form"
            //onSubmit={handleSubmit}
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
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left'
              }}>
                <FormControl fullWidth
                  sx={{
                    width: '96%',
                    marginLeft: '8px'
                  }}>
                  <InputLabel>Difficulty</InputLabel>
                  <Select
                    value={difficulty}
                    onChange={handleDifficultyChange}
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </Select>
                </FormControl>

                <div className="Tags-HelpingMaterial"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left'
                  }}>
                  <TextField
                    required
                    id="HelpingMaterialTags"
                    label="Input Tags for Helping Material"
                    value={CurrentTag}
                    onChange={handleCurrentTagChange}
                    sx={{ width: "100%", mt: 2 }}
                  />
                  <Button className='HandleTags' onClick={handleHelpingMaterialTags} sx={{
                    backgroundColor: '#1e3c72',
                    color: 'white',
                    borderRadius: '10px',
                    padding: '5px 15px',
                    fontSize: '0.75rem',
                    width: '19%',
                    marginLeft: '8px',
                    '&:hover': {
                      backgroundColor: '#0c2461',
                    },
                  }}>Add Tag</Button>
                  {
                    helpingMaterialTags.map((tag) => (
                      <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
                    ))
                  }

                </div>
              </div>
              <Button
                onClick={handleSubmitHelpingMaterial}
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: '#1e3c72',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '10px 30px',
                  marginLeft: '8px',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#0c2461',
                  },
                }}
              >
                Upload Helping Material
              </Button>


            </Stack>

          </Box>


        </div>
        <div className="split right" >
          <div className="file-uploader-container">
            <FileUploader files={helpingMaterialFile} setFiles={setHelpingMaterialFile} remFile={removeFile}></FileUploader>
          </div>
          <Button
            onClick={handleNextClick}
            type="submit"
            variant="contained"
            style={{
              backgroundColor: '#1e3c72',
              color: 'white',
              width: 'fit-content',
              marginLeft: '8px',
              borderRadius: '10px',
              padding: '10px 30px',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#0c2461',
              },
            }}
          >
            Next
          </Button>
        </div>
      </div>

    </div>

  );
};

export default HelpingMaterial;
