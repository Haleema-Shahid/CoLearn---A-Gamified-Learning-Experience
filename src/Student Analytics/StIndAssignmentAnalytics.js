import React, { useEffect, useState } from 'react';
import SingleAssignmentAnalyticsChart from '../Charts/SingleAssignmentAnalyticsChart';
import { Grid, Paper } from '@mui/material';

const StIndAssignmentAnalytics = ({ userId, assignmentId }) => {
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [yourMarks, setYourMarks] = useState(null);
  const [wasMarked, setWasMarked]=useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        // Fetch the assignment data
        const assignmentResponse = await fetch(`http://localhost:4000/backend/assignments/${assignmentId}`);
        const assignmentData = await assignmentResponse.json();
        setAssignment(assignmentData);

        // Fetch the submission data for the assignment
        const response = await fetch(`http://localhost:4000/backend/t/${userId}/assignment/${assignmentId}/submissions`);
        const data = await response.json();
        console.log(data);
        if (data.error) {
          setSubmissions([]);
        } else {
          setSubmissions(data);
          const submission = data.find((submission) => submission.student._id === userId);
          if (submission) {
            setYourMarks(submission.submission.obtainedmarks);
            setWasMarked(submission.submission.marked)
          }
        }
      } catch (error) {
        console.error('Error fetching assignment and submission data:', error);
      }
    };

    fetchAssignment();
  }, [assignmentId, userId]);

  // Function to process submission data and create divisions
  const createDataObject = () => {
    const dataObject = [
      { range: '0-25', count: 0 },
      { range: '26-50', count: 0 },
      { range: '51-75', count: 0 },
      { range: '76-100', count: 0 },
    ];

    // Process the submissions and calculate the division counts
    if (submissions.length > 0) {
      submissions.forEach((submission) => {
        const obtainedMarks = Math.floor((submission.submission.obtainedmarks/assignment.totalmarks)*100);
        if (obtainedMarks >= 0 && obtainedMarks <= 25) {
          dataObject[0].count++;
        } else if (obtainedMarks > 25 && obtainedMarks <= 50) {
          dataObject[1].count++;
        } else if (obtainedMarks > 50 && obtainedMarks <= 75) {
          dataObject[2].count++;
        } else if (obtainedMarks > 75 && obtainedMarks <= 100) {
          dataObject[3].count++;
        }
      });
    }

    return dataObject;
  };

  // Create the data object
  const dataObject = createDataObject();

  // Calculate the percentage achieved
  const percentage = yourMarks !== null ? Math.floor((parseFloat(yourMarks) / parseFloat(assignment.totalmarks)) * 100) : null;

  return (
    <div> 
      <Grid container spacing={2}>
      {assignment && (
       
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <p>Assignment Name: {assignment.title}</p>
             
            </Paper>
          </Grid>
       
      )}

      {wasMarked && (
        
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <p>Marks in this assignment were: {yourMarks} / {assignment.totalmarks}</p>
              {percentage !== null && <p>You achieved {percentage}%</p>}
            </Paper>
          
        </Grid>
      )}
      {!wasMarked && (
        
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <p>Submission has not been marked</p>
              
            </Paper>
       
        </Grid>
      )}

      {submissions.length > 0 && (

          <Grid item xs={12}>
            <SingleAssignmentAnalyticsChart
              title={assignment.title}
              totalMarks={assignment ? assignment.totalmarks : 0}
              studentData={dataObject}
              width={500}
              height={400}
            />
      
        </Grid>
      )}
      </Grid>
      
    </div>
  );
};

export default StIndAssignmentAnalytics;
