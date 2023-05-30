import React from 'react';
import { Chart, BarController, BarElement, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import AllAssignmentsAnalyticsChart from '../Charts/AllAssignmentsAnalyticsChart';
import SingleAssignmentAnalyticsChart from '../Charts/SingleAssignmentAnalyticsChart';

Chart.register(BarController, BarElement, LinearScale, CategoryScale, Tooltip);

function TeacherAnalyticsDashboard() {
  // Sample data for the assignment analytics chart
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

  return (
    <div className="flex flex-col">
      <header className="px-5 py-4 border-b border-slate-100">
        <span className="analytics" style={{ color: 'rgb(30, 41, 59)', fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: 700, marginRight: '0.5rem', pointerEvents: 'none' }}>Analytics</span>
      </header>
      <div className="chart-container">
        <AllAssignmentsAnalyticsChart assignmentData={assignmentData} width={595} height={248} />
      </div>
      <div className="chart-container">
        <SingleAssignmentAnalyticsChart
          title={assignmentData2.title}
          totalMarks={assignmentData2.totalMarks}
          studentData={assignmentData2.studentData}
          width={595}
          height={248}
        />
      </div>
      <style jsx>{`
        .chart-container {
          display: inline-block;
          margin: 1rem;
        }
      `}</style>
    </div>
  );
}

export default TeacherAnalyticsDashboard;
