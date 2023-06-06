// import React, { useRef, useEffect } from 'react';
// import { Chart, BarController, BarElement, LinearScale } from 'chart.js';

// import { CategoryScale } from 'chart.js';
// import moment from 'moment';


// Chart.register(BarController, CategoryScale, LinearScale, BarElement);

// function AllAssignmentsAnalyticsChart({ assignmentData, width, height }) {
//   const canvas = useRef(null);

//   useEffect(() => {
//     const ctx = canvas.current;
//     const chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: assignmentData.map((assignment) => assignment.label),
//         datasets: [
//           {
//             label: 'Mean',
//             data: assignmentData.map((assignment) => assignment.mean),
//             backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           },
//           {
//             label: 'Maximum',
//             data: assignmentData.map((assignment) => assignment.maximum),
//             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//           },
//           {
//             label: 'Minimum',
//             data: assignmentData.map((assignment) => assignment.minimum),
//             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               precision: 0,
//             },
//           },
//         },
//       },
//     });

//     return () => chart.destroy();
//   }, [assignmentData]);

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h2 className="card-title">All Assignments Analytics</h2>
//         <div style={{ width, height }}>
//           <canvas ref={canvas} width={width} height={height}></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllAssignmentsAnalyticsChart;
// import React, { useRef, useEffect } from 'react';
// import { Chart, BarController, BarElement, LinearScale } from 'chart.js';

// import { CategoryScale } from 'chart.js';
// import moment from 'moment';

// Chart.register(BarController, CategoryScale, LinearScale, BarElement);

// function AllAssignmentsAnalyticsChart({ assignmentData, width, height }) {
//   const canvas = useRef(null);

//   useEffect(() => {
//     const ctx = canvas.current;
//     const chart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: assignmentData.map((assignment) => assignment.label),
//         datasets: [
//           {
//             label: 'Mean',
//             data: assignmentData.map((assignment) => assignment.mean),
//             backgroundColor: 'rgba(75, 192, 192, 1)',
//           },
//           {
//             label: 'Maximum',
//             data: assignmentData.map((assignment) => assignment.maximum),
//             backgroundColor: 'rgba(255, 99, 132, 1)',
//           },
//           {
//             label: 'Minimum',
//             data: assignmentData.map((assignment) => assignment.minimum),
//             backgroundColor: 'rgba(54, 162, 235, 1)',
//           },
//         ],
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               precision: 0,
//             },
//             grid: {
//               display: true, // Remove gridlines on the y-axis
//             },
//           },
//           x: {
//             grid: {
//               display: false, // Remove gridlines on the x-axis
//             },
//           },
//         },
//       },
//     });

//     return () => chart.destroy();
//   }, [assignmentData]);

//   return (
//     <div className="card">
//       <div className="card-body">
//         <h2 className="card-title">All Assignments Analytics</h2>
//         <div style={{ width, height }}>
//           <canvas ref={canvas} width={width} height={height}></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllAssignmentsAnalyticsChart;

import React, { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, Tooltip);

function AllAssignmentsAnalyticsChart({ assignmentData, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: assignmentData.map((assignment) => assignment.label),
        datasets: [
          {
            label: 'Mean',
            data: assignmentData.map((assignment) => assignment.mean),
            backgroundColor: 'rgba(75, 192, 192, 1)',
          },
          {
            label: 'Maximum',
            data: assignmentData.map((assignment) => assignment.maximum),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Minimum',
            data: assignmentData.map((assignment) => assignment.minimum),
            backgroundColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
            },
            grid: {
              display: true, // Remove gridlines on the y-axis
            },
          },
          x: {
            grid: {
              display: false, // Remove gridlines on the x-axis
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => context.dataset.label + ': ' + context.parsed.y,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [assignmentData]);

  return (
    <div className="card" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <div className="card-body" style={{ padding: '20px' }}>

        <div style={{ width, height }}>
          <canvas ref={canvas} width={width} height={height}></canvas>
        </div>
      </div>
    </div>
  );
}

export default AllAssignmentsAnalyticsChart;
