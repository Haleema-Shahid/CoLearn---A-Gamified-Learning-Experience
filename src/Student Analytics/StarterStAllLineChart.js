import React, { useEffect, useState } from 'react';
import IndStAllAssignmentsLineChart from '../Charts/IndStAllAssignmentsLineChart';
import { Paper } from "@mui/material";
import Typography from '@mui/material/Typography';


const StarterStAllLineChart = ({ classId, userId }) => {
  console.log("in starter all line chart")
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [assignmentIds, setAssignmentIds]=useState([]);
  const [assignmentsAndSubmissions, setAssignmentsAndSubmissions]=useState([]);
  useEffect(() => {
    const fetchAssignmentsAndSubmissions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/class/${classId}/allAssignments`);
        const data = await response.json();
        setAssignmentIds(data);
        console.log("assignmrnt ",data)
  
        const assignmentPromises = data.map(async (assignmentId) => {
          const assignmentResponse = await fetch(`http://localhost:4000/backend/assignments/${assignmentId}`);
          const assignmentData = await assignmentResponse.json();
  
          const submissionResponse = await fetch(`http://localhost:4000/backend/assignment/${assignmentId}/submissions`);
          let submissionData = [];
        if (submissionResponse.status === 200) {
          submissionData = await submissionResponse.json();
        }
        console.log("submission data ",submissionData);
  
          return { assignment: assignmentData, submissions: submissionData.submissions };
        });
  
        const assignmentResults = await Promise.all(assignmentPromises);
        console.log("assignment&sub ", assignmentResults);
        setAssignmentsAndSubmissions(assignmentResults);
      } catch (error) {
        console.error('Error fetching assignments and submissions:', error);
        setAssignmentsAndSubmissions([]);
      }
    };
  
    fetchAssignmentsAndSubmissions();
  }, [classId]);
  
  
  // Create the data object
  const dataObject = assignmentsAndSubmissions.map((entry) => {
    const { assignment, submissions } = entry;
    const submission = submissions.find((submission) => submission.studentId === userId);
    const obtainedMarks = submission ? submission.obtainedmarks : 0;
    const totalMarks = assignment.totalmarks || 0;
    const percentage = totalMarks > 0 ? Math.floor((obtainedMarks / totalMarks) * 100) : 0;
  
    return { assignment, obtainedMarks: percentage };
  });
  

  
  console.log("data obj ",dataObject)

  return (
    <div>
      
      {dataObject.length > 0 && (
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px', alignItems:'center' }}>

 <Typography variant="h6" component="div" sx={{
          fontFamily: 'Montserrat',
          fontSize: '1.5rem',
          letterSpacing: '0.01rem',
          fontWeight: 'bold',
          color: '#001340',
          marginLeft: '-70px',
          paddingLeft:'12%',
        
        }}>Overall Performance</Typography>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IndStAllAssignmentsLineChart
          data={dataObject}
          width={500}
          height={400}
        />
        </div>
        </Paper>
      )}
    </div>
  );
};

export default StarterStAllLineChart;
