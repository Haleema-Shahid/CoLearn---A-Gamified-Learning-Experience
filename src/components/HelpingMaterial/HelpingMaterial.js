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
import Grid from '@mui/material/Grid';
import { Paper } from "@mui/material";

const HelpingMaterial = ({ helpingData, setHelpingMaterialData, onNextClick }) => {
  console.log(setHelpingMaterialData);
  const { userId, classId, weekId, topicId } = useParams();
  const [currHelpingMaterialFile, setCurrHelpingMaterialFile] = useState();
  const [helpingMaterialFile, setHelpingMaterialFile] = useState([]);
  const [tags, setTags] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [helpingMaterialTags, setHelpingMaterialTags] = useState([]);
  const [helpingMaterials, setHelpingMaterials] = useState([]);
  const [CurrentTag, setCurrentTag] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmitHelpingMaterial = (e) => {
    e.preventDefault();
    if (currHelpingMaterialFile) {
      const helpingMaterial = {
        is_recommended: false,
        level: difficulty,
        tags: helpingMaterialTags,
        file: helpingMaterialFile
      };

      const helpingMaterialwithFile = {
        is_recommended: false,
        level: difficulty,
        tags: helpingMaterialTags,
        file: currHelpingMaterialFile
      }

      setHelpingMaterialData([...helpingData, helpingMaterialwithFile]);
      setHelpingMaterials([...helpingMaterials, helpingMaterial]);
      setHelpingMaterialFile([]);
      setHelpingMaterialTags([]);
      setDifficulty('');
      setCurrHelpingMaterialFile();
    } else {
      console.log("Empty file cannot be uploaded");
    }
  };

  const removeFile = (filename) => {
    setHelpingMaterialFile(helpingMaterialFile.filter(file => file.name !== filename));
  };

  const handleFileChange = (event) => {
    setHelpingMaterialFile([event.target.files[0]]);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handleCurrentTagChange = (event) => {
    const value = event.target.value;
    if (value !== "") {
      setCurrentTag(value);
    }
  };

  const handleHelpingMaterialTags = () => {
    if (CurrentTag !== "") {
      setHelpingMaterialTags([...helpingMaterialTags, CurrentTag]);
      setCurrentTag("");
    }
  };

  const handleDeleteTag = (tagToDelete) => {
    setHelpingMaterialTags(helpingMaterialTags => helpingMaterialTags.filter((helpingMaterialTag) => helpingMaterialTag !== tagToDelete));
  };

  const deleteCurrHelpingMaterialFile = () => {
    setCurrHelpingMaterialFile();
  };

  const deleteHelpingMaterialFileItem = (name) => {
    setHelpingMaterialData(Files => Files.filter((DataFile) => DataFile.file.name !== name));
  };

  return (
    <div style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '20px', paddingBottom: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          
            <div>
              <div className="HelpingMaterial header" style={{ color: "#4b6cb7", padding: "5%", paddingLeft: "25%" }}>
                <h1>Helping Material</h1>
              </div >
              <div style={{margin:'10px', padding:'20px'}}>
              <Box
                component="form"
                sx={{
                  margin: "5%",
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiTextField-root": { m: 1, width: "50ch" },
                  paddingLeft: "50px",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "5%",
                  marginTop: "20px",
          marginBottom: "20px", 
          marginLeft: "20px",
          marginRight: "20px", 
                 
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
                        marginLeft: '8px',
                        
                      }}
                    >
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
                      }}
                    >
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
                      {helpingMaterialTags.map((tag) => (
                        <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)} />
                      ))}
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
                  <div>
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
                </Stack>
              </Box>
            </div>
            </div>
         
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper elevation={3} style={{ padding: '40px' }}>
            <div>
              <div style={{ marginBottom: '30px', marginTop: '20px' }}>
                <FileUploader files={helpingMaterialFile} setFiles={setHelpingMaterialFile} remFile={removeFile} currHelpingMaterialFile={currHelpingMaterialFile} setCurrHelpingMaterialFile={setCurrHelpingMaterialFile}></FileUploader>
              </div>

              <div style={{  padding: '10px' }}>
                <div style={{ marginBottom: '10px' }}>
                <div className="HelpingMaterial header" style={{ color: "#4b6cb7"}}>
                <h3>Current Material</h3>
                </div >
                  {currHelpingMaterialFile != null && (<FileItem file={currHelpingMaterialFile} deleteFile={deleteCurrHelpingMaterialFile} />)}
                </div>
              </div>

              <div style={{  padding: '10px' }}>
              <div className="HelpingMaterial header" style={{ color: "#4b6cb7"}}>
                <h3>These Helping Materials have been added</h3>
                </div >
                {helpingData && helpingData.map((Datafile, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <HelpingFileItem file={Datafile.file} deleteFile={() => deleteHelpingMaterialFileItem(Datafile.file.name)} difficulty={Datafile.level} tags={Datafile.tags} />
                  </div>
                ))}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default HelpingMaterial;
