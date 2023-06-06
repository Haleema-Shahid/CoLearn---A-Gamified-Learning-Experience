import React from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import AllAssignmentsAnalyticsChart from '../Charts/AllAssignmentsAnalyticsChart';
import SingleAssignmentAnalyticsChart from '../Charts/SingleAssignmentAnalyticsChart';
import LineChart01 from '../Charts/LineChart01';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);
/*
assId all assId for this class
studentId of students who have submitted assignment assId
student's obtained marks in this assignment
*/
function TeacherAnalyticsDashboard() {

  const { userId, classId } = useParams();
  const [classData, setClassData] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    console.log("classData loaded: ", classData)
    if (classData.length > 0) {
      setLineChartData(getDataForLineChart());
      console.log("lineChart: ", getDataForLineChart());
      setBarChartData(getDataForBarChart());
    }
  }, [classData])

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/class/${classId}/analytics`);
        const data = await response.json();
        setClassData(data);
        if (data.length > 0) {

        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);
  // Sample data for the assignment analytics chart
  function getDataForLineChart() {
    const labels = [];
    const scores = [];

    for (let i = 0; i < classData.length; i++) {
      const assignmentData = classData[i];
      const submissions = assignmentData.submissions;
      const assignment = assignmentData.assignment;

      const obtainedMarksSum = submissions.reduce((sum, submission) => sum + Number(submission.obtainedmarks), 0);
      const averageMarks = obtainedMarksSum / submissions.length;
      labels.push(assignment.title);
      scores.push(averageMarks);
    }

    const chartData = {
      labels: labels,
      scores: scores,
    };

    return chartData;
  }

  function getDataForBarChart() {
    const assignmentStats = [];

    for (let i = 0; i < classData.length; i++) {
      const assignmentData = classData[i];
      const submissions = assignmentData.submissions;
      const assignment = assignmentData.assignment;

      const marks = submissions.map((submission) => Number(submission.obtainedmarks));
      const mean = calculateMean(marks);
      const maximum = Math.max(...marks);
      const minimum = Math.min(...marks);

      const assignmentStat = {
        label: assignment.title,
        mean: mean,
        maximum: maximum,
        minimum: minimum,
      };

      assignmentStats.push(assignmentStat);
    }

    return assignmentStats;
  }

  function calculateMean(marks) {
    const sum = marks.reduce((total, mark) => total + mark, 0);
    return sum / marks.length;
  }

  const assignmentData = [
    {
      label: 'Assignment 1',
      mean: 85,
      maximum: 95,
      minimum: 75,
    },
    {
      label: 'Assignment 2',
      mean: 92,
      maximum: 98,
      minimum: 87,
    },
    {
      label: 'Assignment 3',
      mean: 78,
      maximum: 85,
      minimum: 72,
    },
  ];

  // Sample data for the assignment analytics chart
  const assignmentData2 = {
    title: 'Assignment 1',
    totalMarks: 100,
    studentData: [
      { range: '0-25', count: 5 },
      { range: '26-50', count: 10 },
      { range: '51-75', count: 8 },
      { range: '76-100', count: 15 },
    ],
  };

  //sample data for line chart
  // const lineChartData = {
  //   labels: ['Assignment 1', 'Assignment 2', 'Assignment 3'],
  //   scores: [80, 65, 90], //average 
  // };

  return (
    <div className="flex flex-col">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%'
        }}>

        <Typography variant="h3" component="h3" style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}>
          Class Analytics
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
          <div className="chart-container">
            <AllAssignmentsAnalyticsChart assignmentData={barChartData} width={595} height={248} />
          </div>
          {/* <div className="chart-container">
        <SingleAssignmentAnalyticsChart
          title={assignmentData2.title}
          totalMarks={assignmentData2.totalMarks}
          studentData={assignmentData2.studentData}
          width={595}
          height={248}
        />
      </div> */}
          <div className="chart-container">
            <LineChart01
              data={lineChartData}
              width={595}
              height={248}
            />
          </div>
        </div>
        <style jsx>{`
        .chart-container {
          display: inline-block;
          margin: 1rem;
        }
      `}</style>
      </div>
    </div>
  );
}

export default TeacherAnalyticsDashboard;
