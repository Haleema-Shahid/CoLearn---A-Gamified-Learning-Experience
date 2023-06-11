import React from 'react';
import ClassLeaderboardCard from './ClassLeaderboardCard';
import TopThreeCard from './TopThreeCard';
import winnerBg from '../images/sep11.jpg';

function TopThree({ positions, classId }) {
  return (
    <div
      style={{
        width: '75%',
        margin: '0 auto',
        backgroundImage: `url(${winnerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        overflow: 'hidden', // Ensure the rounded corners are applied to the background image
      }}
    >
      <div className="card" style={{ boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
        <div className="card-body" style={{ padding: '20px' }}>
          <h2 style={{ color: 'turquoise', fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>Top Three Winners</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TopThreeCard
              key={positions[1].studentId}
              classId={classId}
              studentId={positions[1].id}
              position={2}
              name={positions[1].name}
              points={positions[1].points}
              biggerSize={false}
            />
            <TopThreeCard
              key={positions[0].studentId}
              classId={classId}
              studentId={positions[0].id}
              position={1}
              name={positions[0].name}
              points={positions[0].points}
              biggerSize={true}
            />
            <TopThreeCard
              key={positions[2].studentId}
              classId={classId}
              studentId={positions[2].id}
              position={3}
              name={positions[2].name}
              points={positions[2].points}
              biggerSize={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopThree;
