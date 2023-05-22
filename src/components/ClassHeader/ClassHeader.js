//need some backend here
//get the class object and save it in class state

import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CLO from '../CLO/CLOstarter';
import React, { useState } from 'react';

const GradientBackground = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(to right, #1e3c72, #2a5298)`,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  margin: 'auto',
  width: '90%',
  height:'20vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));


function ClassHeader(props) {
  const [userID, setUserID]=useState(props.userID)
  const [classID, setclassID]=useState(props.classID)
  const [clickedClass, setClickedClass]=useState(null)
  
  console.log(classID)


  return (
    <div>
      <Container sx={{paddingBottom:"20px"}}>
        <GradientBackground >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Class {classID} Header
            {console.log(classID)}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: '1.25rem' }}>
            This is the header for Class {classID}. You can add more information here.
          </Typography>
        </GradientBackground>
      </Container>
      
    </div>
  );
}

export default ClassHeader;

