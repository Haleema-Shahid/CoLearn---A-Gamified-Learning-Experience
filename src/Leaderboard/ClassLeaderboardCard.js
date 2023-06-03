import React from 'react';
import cardDesign from '../images/sep11.jpg';

function ClassLeaderboardCard({ position, name, points }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '600px',
        height: '100px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        marginBottom: '10px',
        position: 'relative',
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
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the overlay color and opacity as needed
        }}
      ></div>
      <img
        src={cardDesign}
        alt="Card Design"
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      <h3 style={{ margin: '0', fontWeight: 'bold', paddingRight: '20px', color: 'white', fontFamily: 'cursive', zIndex: 1 }}>
        {position}
      </h3>
      <div style={{ flex: '1', textAlign: 'center', paddingRight: '16px', zIndex: 1 }}>
        <p style={{ margin: '0', color: 'white', fontFamily: 'cursive' }}>{name}</p>
      </div>
      <p style={{ margin: '0', fontWeight: 'bold', color: 'white', fontFamily: 'cursive', zIndex: 1 }}>
        {points} points
      </p>
    </div>
  );
}

export default ClassLeaderboardCard;
