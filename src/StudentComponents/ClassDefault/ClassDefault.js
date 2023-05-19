//this will hold the code for when we click a class.
//Approached by a router which will have the current user id, class id
//the state of classDefault will save classID and UserID for now  after connecting from the database it can take the class name and section Teacher name as well
//This component will provide a class header component which will take the class id as input
//get the number of weeks from db
//in this case a component which asks for number of weeks CLOStarter is called..this will set CLO weeks and send it back to class dafault component
//next comes clo details--to be renamed as class details


import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CLO from '../CLO/CLOstarter';
import React, { useState, useEffect } from 'react';
import CloDetails from '../CLO/CLODetails';
import ClassHeader from '../ClassHeader/ClassHeader';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentClassTabs from './StudentClassTabs';


function ClassDefault() {
  const { userId, classId } = useParams();
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [students, setStudent] = useState([]);
  //set students through API call
  const handleNumberOfWeeksChange = (weeks) => {
    setNumberOfWeeks(weeks);
    console.log("the selected number of weeks is: ")
    console.log(numberOfWeeks);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',

          bgcolor: 'background.paper',

        }}
      >
        <ClassHeader userID={userId} classID={classId} />
        <div style={{ alignContent: "center", alignItems: "center" }}>
          <StudentClassTabs userId={userId} classId={classId}></StudentClassTabs>
        </div>



        {/* {numberOfWeeks === 0 && <CLO classID={classId} cloWeeks={numberOfWeeks} onNumberOfWeeksChange={handleNumberOfWeeksChange}/>}
      {numberOfWeeks > 0 && <CloDetails userID={userId} classID={classId} cloWeeks={numberOfWeeks} />} */}
      </Box>

    </div>
  );
}

export default ClassDefault;

