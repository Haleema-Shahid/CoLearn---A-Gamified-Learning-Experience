
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ContentCard from './contentCards/ContentCard'

function ViewTopic(props) {
  //get userId, weekId, classId, topicId from wherever i dont know. jhn se b ye call hora hai whn se ye Ids le kr ani hain
  //sari states wghera b ni hain idr wo b krna hai
  //userId
  // classId
  // weekId
  // topicId
  console.log("we are in viewTopic.js: ")
  // console.log("this is topicId ", props.topicId)
  // console.log("this is weekId ", props.weekId)
  // console.log("this is classId ", props.classId)
  // console.log("this is userId ", props.userId)

  const [topic, setTopic] = useState(null)//Save topic object from db in here first
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [userId, setUserId] = useState(props.userId)
  const [classId, setClassId] = useState(props.classId)
  const [weekId, setWeekId] = useState(props.weekId)
  const [topicId, setTopicId] = useState(props.topicId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("in useEffect in viewtopic.js");
        const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}`);
        const data = await response.json();
        console.log("fetched: ", data);
        if (data) {
          //setClasses(data);
          setTopic(data.topicObject);
          setAssignments(data.assignments);
          setMaterials(data.materials);
        }
        else {
          console.log("no classes found");
          //setClasses([]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [topicId]);



  return (
    <div>
      {!topic ? (
        <p>Topic not fetched</p>
      ) : (
        <div>

          <h2 style={{ color: "#2a5298", textDecoration: 'underline', marginBottom: '20px' }}>Assignments</h2>

          {assignments.map((assignment) => (
            <ContentCard
              key={assignment._id}
              contentType="assignmentContent"
              userId={userId}
              classId={classId}
              weekId={weekId}
              topicId={topicId}
              materialId={assignment._id}
              materialContent={assignment}
            />
          ))}

          <h2 style={{ color: "#2a5298", textDecoration: 'underline', marginBottom: '20px', marginTop: '20px' }}>Materials</h2>
          {materials.map((material) => (
            <ContentCard
              key={material._id}
              contentType="materialContent"
              userId={userId}
              classId={classId}
              weekId={weekId}
              topicId={topicId}
              materialId={material._id}
              materialContent={material}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewTopic;

