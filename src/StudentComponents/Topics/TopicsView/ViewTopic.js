//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ViewTopic(props) {
  //get userId, weekId, classId, topicId from wherever i dont know. jhn se b ye call hora hai whn se ye Ids le kr ani hain
  //sari states wghera b ni hain idr wo b krna hai
  //userId
  // classId
  // weekId
  // topicId
  // console.log("we are in viewTopic.js: ")
  // console.log("this is topicId ", props.topicId)
  // console.log("this is weekId ", props.weekId)
  // console.log("this is classId ", props.classId)
  // console.log("this is userId ", props.userId)

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
      {!topic ? (
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
