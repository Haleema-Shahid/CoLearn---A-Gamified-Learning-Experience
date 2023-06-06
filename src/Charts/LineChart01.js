import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

function LineChart01({ data, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Mean Scores',
            data: data.scores,
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
              callback: (value) => value, // Display the value on y-axis
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

export default LineChart01;
