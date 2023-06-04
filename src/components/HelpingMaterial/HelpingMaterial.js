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
import FileItem from './FileItem';
import './HelpingMaterial.css'
import HelpingFileItem from './HelpingFileItem';




const HelpingMaterial = ({ helpingData, setHelpingMaterialData, onNextClick }) => {
    console.log(setHelpingMaterialData);
    const { userId, classId, weekId, topicId } = useParams();
    const [currHelpingMaterialFile, setCurrHelpingMaterialFile ]=useState();//this has only the current file in question..file uploader can set only this
    const [helpingMaterialFile, setHelpingMaterialFile] = useState([]);
    const [tags, setTags] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [helpingMaterialTags, setHelpingMaterialTags] = useState([]);
    const [helpingMaterials, setHelpingMaterials] = useState([]);
    const [CurrentTag, setCurrentTag] = useState("")
    const navigate = useNavigate();
    const location = useLocation();

    

  const handleSubmitHelpingMaterial = (e) => {
    e.preventDefault();
    if( currHelpingMaterialFile)
    {


    
    const helpingMaterial = {
      is_recommended: false,
      level: difficulty,
      tags: helpingMaterialTags,
      file: helpingMaterialFile
    };

    //aleena part
    const helpingMaterialwithFile={
      is_recommended: false,
      level: difficulty,
      tags: helpingMaterialTags,
      file: currHelpingMaterialFile
    }
    //setHelpingMaterialData(prevPlayers => [...prevPlayers, helpingMaterialwithFile]);
    console.log("helping data: ", helpingData);
    setHelpingMaterialData([...helpingData, helpingMaterialwithFile]);
    //part end
    console.log("in handle submit: ", helpingMaterial);
    setHelpingMaterials([...helpingMaterials, helpingMaterial]);
    setHelpingMaterialFile('');
    setHelpingMaterialTags([]);
    setDifficulty('');
    setCurrHelpingMaterialFile();


    // props.setFiles([...props.files, helpingMaterial]);
    // props.onAddHelpingMaterial(helpingMaterial);
    //this will send all the helping material back to parent assignment material,
    //------maybe we need to send tags too--------------
  }
  else
  {
    console.log("empty file cannot upload");
  }
  };
  
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
    onNextClick();

    // const link = `/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment`;
    // // Navigating to the link using react-router-dom's useNavigate hook
    // navigate(link, { state: { helpingMaterials: helpingMaterials } }); // Sending the helpingMaterials array as a prop
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

  //set curent helping material file empty
  const deleteCurrHelpingMaterialFile=()=>{
    setCurrHelpingMaterialFile();
  }

  const deleteHelpingMaterialFileItem=(name)=>{
    setHelpingMaterialData(Files => Files.filter((DataFile) => DataFile.file.name !== name))
  }

  return (
    <div>
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
        {/* //............. */}

        <div
  style={{
    display: 'flex',
    justifyContent: 'flex-end',
    height: '100vh',
    paddingRight: '20px',
  }}
>
  <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ marginBottom: '30px', marginTop: '20px' }}>
            <FileUploader files={helpingMaterialFile} setFiles={setHelpingMaterialFile} remFile={removeFile} currHelpingMaterialFile={currHelpingMaterialFile} setCurrHelpingMaterialFile={setCurrHelpingMaterialFile}></FileUploader>
          </div>

          <div style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>
      
        <div style={{ marginBottom: '10px' }}>
          Curr file
          {currHelpingMaterialFile!=null &&(<FileItem file={currHelpingMaterialFile} deleteFile={deleteCurrHelpingMaterialFile} />)}
        </div>
    </div>

          <div style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>
      
      
      {helpingData && helpingData.map((Datafile, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <HelpingFileItem file={Datafile.file} deleteFile={deleteHelpingMaterialFileItem} difficulty={Datafile.level} />
        </div>
      ))}
    </div>
    <div style={{ height: '300px', overflowY: 'auto', padding: '10px' }}>

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
      </div>
    </div>

  

  );
};

export default HelpingMaterial;
