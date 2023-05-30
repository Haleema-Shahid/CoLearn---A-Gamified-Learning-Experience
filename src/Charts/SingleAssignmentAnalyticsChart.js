import React, { useRef, useEffect } from 'react';
import { Chart, BarController, BarElement, LinearScale, Tooltip } from 'chart.js';

Chart.register(BarController, BarElement, LinearScale, Tooltip);

function SingleAssignmentAnalyticsChart({ title, totalMarks, studentData, width, height }) {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: studentData.map((data) => data.range),
        datasets: [
          {
            label: 'Number of Students',
            data: studentData.map((data) => data.count),
            backgroundColor: 'rgba(75, 192, 192, 1)',
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
              label: (context) => 'Count: ' + context.parsed.y,
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [studentData]);

  return (
    <div className="card" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1), 0 -6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
      <div className="card-body" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px' }}>
        <h2 className="card-title">{title}</h2>
        <p>Total Marks: {totalMarks}</p>
        <div style={{ width, height }}>
          <canvas ref={canvas} width={width} height={height}></canvas>
        </div>
      </div>
    </div>
  );
}

export default SingleAssignmentAnalyticsChart;
