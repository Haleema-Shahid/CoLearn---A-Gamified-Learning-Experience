import React from 'react';

function TopThreeCard({ classId, studentId, position, name, points, biggerSize }) {
  return (
    <div
      style={{
        width: '200px',
        height: biggerSize ? '240px' : '200px', // Apply bigger height if biggerSize is true
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: '10px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <h3 style={{ margin: '0', fontWeight: 'bold' }}>{position}</h3>
      <p style={{ margin: '0' }}>{name}</p>
      <p style={{ margin: '0', fontWeight: 'bold' }}>{points} points</p>
    </div>
  );
}

export default TopThreeCard;
