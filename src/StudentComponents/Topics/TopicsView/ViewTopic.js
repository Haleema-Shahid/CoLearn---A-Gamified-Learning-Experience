//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function ViewTopic({ title, description, materials, assignments, topicId, userId, classId, weekId }) {
  //get userId, weekId, classId, topicId from wherever i dont know. jhn se b ye call hora hai whn se ye Ids le kr ani hain
  //sari states wghera b ni hain idr wo b krna hai
  console.log("this is topicId ", topicId)
  console.log("this is title ", title)
  console.log("this is assignments ", assignments)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}`);
        const data = await response.json();
        if (data) {
          //setClasses(data);
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
  }, [userId]);

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
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
          <AccordionSummary>{assignment.title}</AccordionSummary>
          <AccordionDetails>
            <p>{assignment.description}</p>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default ViewTopic;
