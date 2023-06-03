import React, { useState } from 'react';
import ClassLeaderboardCard from './ClassLeaderboardCard';
import TopThree from './TopThree';
import { useParams } from 'react-router-dom';

function ClassLeaderboard({studentData, classId}) {

  return (
    <div>
        <div
      style={{
        width: '50%',
        margin: '0 auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        overflow: 'hidden', // Ensure the rounded corners are applied to the background image
      }}
    >
      <div className="card" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <div className="card-body" style={{ padding: '20px' , alignContent:'center'}}>
          <h2 style={{ color: '#1e3c72', fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Class Leaderboard</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItem:'center' }}></div>
      {studentData.map((student, index) => (
        <ClassLeaderboardCard
          key={student.id}
          studentId={student.id}
          position={index + 1}
          name={student.name}
          points={student.points}
          style={{
            width: '100%', // Set initial width to 100%
            maxWidth: '400px', // Set maximum width
            margin: '0 auto', // Center the card horizontally
          }}
        />
      ))}
    </div>
    </div>
        </div>
      </div>

  );
}

export default ClassLeaderboard;
