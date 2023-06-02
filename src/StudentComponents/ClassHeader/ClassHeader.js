//need some backend here
//get the class object and save it in class state

import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CLO from '../CLO/CLOstarter';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import 'typeface-montserrat';
import DashboardHeader from '../StudentDashboard/DashboardHeader';
import Box from '@mui/material/Box';

const GradientBackground = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(to right, #1e3c72, #2a5298)`,
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  margin: 'auto',
  width: '90%',
  height: '20vh',
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
  const [userId, setuserId] = useState(props.userId)
  const [classId, setclassId] = useState(props.classId)
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');
  const [clickedClass, setClickedClass] = useState(null)
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(classId);
    setIsCopied(true);
  };

  useEffect(() => {
    console.log("in header's use effect");
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/class/${classId}`);
        const data = await response.json();
        console.log(data);
        setTitle(data.name);
        setSection(data.description);
      } catch (error) {
        console.error(error);
        // Handle error case here
      }
    };
    fetchData();
  });


  console.log(classId)


  return (
    <div>
      <DashboardHeader userId={userId} />
      <Container
        sx={{
          paddingBottom: "20px",
          marginTop: '20px'
        }}>
        <GradientBackground
          sx={{
            padding: '90px'

          }}>
          <Typography variant="h2" component="h1" gutterBottom
            sx={{
              fontSize: '2.5rem',
              fontFamily: 'Montserrat'
            }}>
            {title}
            {console.log(classId)}
          </Typography>
          <Typography variant="body1" gutterBottom
            sx={{
              fontSize: '1.25rem',
              fontFamily: 'Montserrat'
            }}>
            {section}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row'
            }}>
          </Box>
        </GradientBackground>
      </Container>

    </div >
  );
}

export default ClassHeader;

