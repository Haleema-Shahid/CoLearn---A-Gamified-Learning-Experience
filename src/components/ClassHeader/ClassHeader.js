// import { useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

// const StyledHeader = styled('header')(({ theme }) => ({
//   height: 200,
//   background: `linear-gradient(to bottom, #0100ec, #fb36f4)`,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// function ClassHeader() {
//   const { classId } = useParams();

//   return (
//     <StyledHeader>
//       <Typography variant="h3" color="white">
//         Class {classId} Header
//       </Typography>
//     </StyledHeader>
//   );
// }

// export default ClassHeader;
// import * as React from 'react';
// import { useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import CLO from '../CLO/CLOstarter'

// const GradientBackground = styled(Paper)(({ theme }) => ({
//   background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
//   color: 'white',
//   padding: theme.spacing(4),
// }));

// function ClassHeader() {
//   const { id } = useParams();

//   return (
//     <div>
//     <GradientBackground>
//       <Typography variant="h2" component="h1" gutterBottom>
//         Class {id} Header
//       </Typography>
//       <Typography variant="body1" gutterBottom>
//         This is the header for Class {id}. You can add more information here.
//       </Typography>
//     </GradientBackground>
//     <CLO classId={id} cloWeeks={0}></CLO>
//     </div>

//   );
// }

// export default ClassHeader;
// import * as React from 'react';
// import { useParams } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import CLO from '../CLO/CLOstarter';

// const GradientBackground = styled(Paper)(({ theme }) => ({
//   background: `linear-gradient(to right, #1e3c72, #2a5298)`,
//   color: 'white',
//   padding: theme.spacing(4),
//   borderRadius: theme.spacing(2),
//   margin: 'auto',
//   width: '90%',
//   height:'20vh'
// }));

// const Container = styled('div')(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   marginTop: theme.spacing(4),
// }));

// function ClassHeader() {
//   const { id } = useParams();

//   return (
//     <div>
//     <Container>
//       <GradientBackground >
//         <Typography variant="h2" component="h1" gutterBottom sx={{ fontSize: '3rem' }}>
//   Class {id} Header
// </Typography>
// <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5rem' }}>
//   This is the header for Class {id}. You can add more information here.
// </Typography>
//       </GradientBackground>
//       </Container>
//       <CLO classId={id} cloWeeks={0} />
//       </div>
    
//   );
// }

// export default ClassHeader;

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
  console.log(classID)


  return (
    <div>
      <Container>
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

