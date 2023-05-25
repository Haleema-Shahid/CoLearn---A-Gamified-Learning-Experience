//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function ViewTopic(props) {
  //get userId, weekId, classId, topicId from wherever i dont know. jhn se b ye call hora hai whn se ye Ids le kr ani hain
  //sari states wghera b ni hain idr wo b krna hai
  //userId
  // classId
  // weekId
  // topicId

  const [topic, setTopic] = useState(null)//Save topic object from db in here first
  const [userId, setUserId] = useState(props.userId)
  const [classId, setClassId] = useState(props.classId)
  const [weekId, setWeekId] = useState(props.weekId)
  const [topicId, setTopicId] = useState(props.topicId)
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);


  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("in useEffect in viewtopic.js");
        const response = await fetch(`http://localhost:4000/backend/s/${userId}/class/${classId}/week/${weekId}/topic/${topicId}`);
        const data = await response.json();
        console.log("fetched: ", data);
        if (data) {
          //setClasses(data);
          console.log("fetched in front end: ", data);
          setTopic(data.topicObject);
          // Sort assignments by uploadtime in descending order
          const sortedAssignments = data.assignments.sort((a, b) => new Date(b.uploadtime) - new Date(a.uploadtime));
          setAssignments(sortedAssignments);

          // Sort materials by uploadtime in descending order
          const sortedMaterials = data.materials.sort((a, b) => new Date(b.uploadtime) - new Date(a.uploadtime));
          setMaterials(sortedMaterials);
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



  const handleAddAssignment = () => {

  }
  const handleAddMaterial = () => {

  }

  const handleAssignmentClick = (assignmentId) => {

    const url = `/s/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment/${assignmentId}`;
    console.log("clicked assignment");
    navigate(url);
  };

  /*for some reason, it was going to assignment as soon it loaded the week assignments and materials. chatgpt said to make
  a new function and do this*/
  const handleClick = (assignmentId) => (event) => {
    event.stopPropagation();
    handleAssignmentClick(assignmentId);
  };
  return (
    <div>
      <Box
        sx={{
          backgroundColor: 'pink'
        }}>
        <Button onClick={handleAddAssignment} variant="outlined" startIcon={<AddCircleIcon />}
          sx={{
            width: '150px',
            marginBottom: '30px'
          }}>
          Assignment
        </Button>
        <Button onClick={handleAddMaterial} variant="outlined" startIcon={<AddCircleIcon />}
          sx={{
            width: '150px',
            marginBottom: '30px'
          }}>
          Material
        </Button>
      </Box>

      {!(assignments && materials) ? (

        <p>Topic not fetched</p>

      ) : (
        <div>

          {/* <h2>{topic.title}</h2>
          <p>{topic.description}</p> */}
          <h3>Materials</h3>
          {materials.map((material) => (
            <Accordion>
              <AccordionSummary>{material.title}</AccordionSummary>
              <AccordionDetails>
                <p>{material.description}</p>
              </AccordionDetails>
            </Accordion>
          ))}
          <h3>Assignments</h3>
          {assignments.map((assignment) => (
            <Accordion>
              <AccordionSummary onClick={handleClick(assignment._id)}>{assignment.title}</AccordionSummary>
              <AccordionDetails>
                <p>{assignment.description}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );

  //   return (
  //     <div>
  //       <h2>{title}</h2>
  //       <p>{description}</p>
  //       <h3>Materials</h3>
  //       {materials.map((material) => (
  //         <Accordion>
  //           <AccordionSummary>{material.title}</AccordionSummary>
  //           <AccordionDetails>
  //             <p>{material.description}</p>
  //           </AccordionDetails>
  //         </Accordion>
  //       ))}
  //       <h3>Assignments</h3>
  //       {assignments.map((assignment) => (
  //         <Accordion>
  //           <AccordionSummary>{assignment.title}</AccordionSummary>
  //           <AccordionDetails>
  //             <p>{assignment.description}</p>
  //           </AccordionDetails>
  //         </Accordion>
  //       ))}
  //     </div>
  //   );
}

export default ViewTopic;
