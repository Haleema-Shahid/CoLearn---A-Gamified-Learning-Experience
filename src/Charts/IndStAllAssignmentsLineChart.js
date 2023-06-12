import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function IndStAllAssignmentsLineChart({ data, width, height }) {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const ctx = canvasRef.current.getContext('2d');
  
      // Extract assignment titles and obtained marks from data
      const labels = data.map((entry) => entry.assignment.title);
      const obtainedMarks = data.map((entry) => entry.obtainedMarks);
  
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Obtained Marks',
              data: obtainedMarks,
              borderColor: 'rgba(75, 192, 192, 1)',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            y: {
              display: true,
              beginAtZero: true,
              ticks: {
                callback: (value) => value, // Display the value on the y-axis
              },
            },
            x: {
              display: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const datasetLabel = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${datasetLabel}: ${value}`;
                },
              },
            },
          },
        },
      });
  
      return () => {
        chart.destroy();
      };
    }, [data]);
  
    return (
      <div className="card" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <div className="card-body" style={{ padding: '20px' }}>
          <div style={{ width, height }}>
            <canvas ref={canvasRef} width={width} height={height}></canvas>
          </div>
        </div>
      </div>
    );
  }
  

export default IndStAllAssignmentsLineChart;
