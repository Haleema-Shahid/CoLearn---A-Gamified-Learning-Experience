import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StIndAssignmentAnalytics from './StIndAssignmentAnalytics';
import StarterStAllLineChart from './StarterStAllLineChart';
import { Grid } from '@mui/material';
import ClassHeader from '../StudentComponents/ClassHeader/ClassHeader';
import Typography from '@mui/material/Typography';


const StAnalyticsBoiler = () => {
  const { userId, classId, studentId } = useParams();
  const [assignmentIds, setAssignmentIds] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedStudentName, setSelectedStudentName]= useState();

  useEffect(() => {
    const fetchAssignmentIds = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/class/${classId}/allAssignments`);
        const data = await response.json();
        setAssignmentIds(data);
      } catch (error) {
        console.error('Error fetching assignment IDs:', error);
      }
    };

    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/user/${studentId}`);
        const data = await response.json();
        setStudent(data);
        console.log("student is ", data.firstname)
        setSelectedStudentName(data.firstname+ " "+data.lastname);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };
    


    fetchAssignmentIds();
    fetchStudent();
  }, [classId, studentId]);

  return (
    <div>
      <ClassHeader userId={userId} classId={classId} />
      <Typography variant="h6" component="div" sx={{
          fontFamily: 'Montserrat',
          fontSize: '1.5rem',
          letterSpacing: '0.01rem',
          fontWeight: 'bold',
          color: '#001340',
          marginLeft: '-70px',
          paddingLeft:'12%',
        
        }}>
          {selectedStudentName}'s Analytics Board
        </Typography>
    
      <div style={{ paddingBottom: '10%',paddingLeft: '10%',paddingRight: '10%',  }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <StarterStAllLineChart classId={classId} userId={studentId} />
          </Grid>
          {assignmentIds.map((assignmentId, index) => (
            <Grid item xs={12} key={assignmentId}>
              {/* Render the StIndAssignmentAnalytics component */}
              <Typography variant="h6" component="div" sx={{
          fontFamily: 'Montserrat',
          fontSize: '1.5rem',
          letterSpacing: '0.01rem',
          fontWeight: 'bold',
          color: '#001340',
          marginLeft: '-70px',
          paddingLeft:'12%',
        
        }}>Assignment {index + 1}</Typography>
              <StIndAssignmentAnalytics userId={studentId} assignmentId={assignmentId} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default StAnalyticsBoiler;
