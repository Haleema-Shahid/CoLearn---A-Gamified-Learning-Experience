//Add topic receives weekID, closeAddTopic as props
//closeAddTopic will close the addTopic prompt from Topics Board
//props: weekId={weekId} classId={props.classId} closeAddTopic={handleCloseTopic}
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
  const [weekId, setWeekID] = useState(props.weekId);
  const userId = props.userId;
  const classId = props.classId;
  const [prevTopics, setPrevTopics] = useState(null)
  const [open, setOpen] = useState(false);

  console.log("in add topic")

  //------------------backend task--------------
  //get all the previous topics of this week and set in prev topics


  const handleAddTopicSubmit = async (e) => {
    //e.preventDefault();
    console.log("handleaddtopic clicked");

    // Checking if this topic already exists
    if (prevTopics != null) {
      if (prevTopics.filter(topic => topic.name === topicName).length > 0) {
        console.log("Topic already exists");
        return;
      }
    }

    try {
      // Create the topic object
      const newTopic = {
        name: topicName,
        materials: [],
        assignments: [],
      };
      //const name = topicName;
      // Send a POST request to the API endpoint
      const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: topicName })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New topic added:', data);
        props.closeAddTopic();
      } else {
        throw new Error('Failed to add topic');
      }
    } catch (error) {
      console.error('Error adding topic:', error);
    }
  };

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