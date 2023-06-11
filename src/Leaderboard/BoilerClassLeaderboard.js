import React, { useState } from 'react';
import ClassHeader from '../StudentComponents/ClassHeader/ClassHeader';
import TopThree from './TopThree';
import ClassLeaderboard from './ClassLeaderboard';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function BoilerClassLeaderboard() {
  const { userId, classId } = useParams();
  const dummyStudentData = [
    { id: 1, name: 'John Doe', points: 100 },
    { id: 2, name: 'Jane Smith', points: 90 },
    { id: 3, name: 'Alice Johnson', points: 85 },
    // Add more dummy student data as needed
  ];

  const navigate = useNavigate();
  const handleProgressClick = (userId) => {
    console.log(userId, " clicked!")
    navigate(`/t/${userId}/class/${classId}/student/${userId}`);
  }

  const topThreePositions = dummyStudentData.slice(0, 3);
  const dataToRender = dummyStudentData;

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <ClassHeader userId={userId} classId={classId} />

      <div style={{ width: '90%' }}>

        <div style={{ display: 'flex' }}>
          <div style={{ width: '85%', marginRight: '20px', marginLeft: '0', alignItems: 'left-align' }}>
            <TopThree positions={topThreePositions} classId={classId} />

            <ClassLeaderboard studentData={dataToRender} classId={classId} />

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '15%', textAlign: 'left', height: '100%' }}>
            <div className="class-position" style={{ flex: '1' }}>
              {/* Show student's class position here */}
              <div className="position-number">
                <span style={{ color: '#082c73', fontSize: '8rem', fontWeight: 'bold' }}>5</span>
                <span className="suffix">th</span>
              </div>
              <h3>5th out of 30 students</h3>
              {/* <p>Your current position in class: 5 out of 30 students</p> */}
              <span style={{ fontSize: '3rem' }} role="img" aria-label="emoji">😊</span>
            </div>

            <div style={{ flex: '1' }}>
              <br></br>
              <br></br>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#1e3c72',
                  color: 'white',
                  borderRadius: '10px',
                  padding: '10px 30px',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#0c2461',
                  },
                }}
                style={{ cursor: 'pointer', color: 'black' }}
                onClick={() => handleProgressClick(userId)}
              >
                Your Progress
              </Button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default BoilerClassLeaderboard;
