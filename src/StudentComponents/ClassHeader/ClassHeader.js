import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CLO from '../CLO/CLOstarter';
import React, { useState, useEffect } from 'react';

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
  console.log(classId)
  const [title, setTitle] = useState('');
  const [section, setSection] = useState('');

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

  return (
    <div>
      <Container sx={{ paddingBottom: "20px" }}>
        <GradientBackground >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '2.5rem' }}>
            {title}
            {console.log(classId)}
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ fontSize: '1.25rem' }}>
            {section}
          </Typography>
        </GradientBackground>
      </Container>

    </div>
  );
}

export default ClassHeader;

