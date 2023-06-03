//this takes care of all the leaderboard items
//for teachers these are
//top three winners
//leaderboard
//See detailed performance
import TopThree from './TopThree';
import ClassLeaderboard from './ClassLeaderboard';
import { useParams } from 'react-router-dom';
import React, { useState } from 'react';

function BoilerClassLeaderboard() {
  // .......
  const { userId, classId } = useParams();
  const dummyStudentData = [
    { id: 1, name: 'John Doe', points: 100 },
    { id: 2, name: 'Jane Smith', points: 90 },
    { id: 3, name: 'Alice Johnson', points: 85 },
    // Add more dummy student data as needed
  ];

  const topThreePositions = dummyStudentData.slice(0, 3);
  const dataToRender = dummyStudentData;

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <TopThree positions={topThreePositions} classId={classId} />
        <ClassLeaderboard studentData={dataToRender} />
      </div>
    </div>
  );
}

export default BoilerClassLeaderboard;
