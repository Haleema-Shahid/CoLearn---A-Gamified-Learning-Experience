//Add topic receives weekID, closeAddTopic as props
//closeAddTopic will close the addTopic prompt from Topics Board
//props: weekID={weekID} classID={props.classId} closeAddTopic={handleCloseTopic}
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AddTopic(props) {
  const [topicName, setTopicName] = useState('');
  const [weekID, setWeekID] = useState(props.weekID);
  const [prevTopics, setPrevTopics] = useState(null)
  const [open, setOpen] = useState(false);

  console.log("in add topic")

  //------------------backend task--------------
  //get all the previous topics of this week and set in prev topics


  const handleAddTopicSubmit = (e) => {
    e.preventDefault();
    console.log("handleaddtopic clicked");
    //checking if this topic already exists
    if (prevTopics != null) {
      if (prevTopics.filter(topic => topic.name === topicName).length > 0) {
        console.log("entered");
        return

      }
    }

    //----------------backend task--------------
    //add the new topic title with empty assignment and material to the week      

    props.closeAddTopic();
  }
  const handleTopicNameChange = (event) => {
    setTopicName(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.closeAddTopic();
  };

  const handleCancelClick = () => {
    setTopicName('');
    props.closeAddTopic();
  };


  return (
    <div >
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            This Class Exists Already!
          </Alert>
        </Snackbar>
      )}
      <Box component="form" onSubmit={handleAddTopicSubmit}
        sx={{
          margin: "auto",
          display: "flex",
          flexDirection: "column",

          paddingLeft: "50px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Stack spacing={2}>
          <TextField
            required
            id="TopicName"
            label="Topic Name"
            value={topicName}
            onChange={handleTopicNameChange}
            fullWidth
          />
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
            Add Topic
          </Button>
          <Button onClick={handleCancelClick} variant="outlined">
            Cancel
          </Button>
        </Stack>
      </Box>

    </div>
  );
}
export default AddTopic