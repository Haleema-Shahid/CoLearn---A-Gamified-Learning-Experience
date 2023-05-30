
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ContentCard from './contentCards/ContentCard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ViewTopic(props) {

  console.log("we are in viewTopic.js: ")

  const [topic, setTopic] = useState(null)//Save topic object from db in here first
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [userId, setUserId] = useState(props.userId)
  const [classId, setClassId] = useState(props.classId)
  const [weekId, setWeekId] = useState(props.weekId)
  const [topicId, setTopicId] = useState(props.topicId)

  const navigate = useNavigate();

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
          // if (topic.assignments)
          setAssignments(data.assignments);

          // if (topic.materials)
          setMaterials(data.materials);
          console.log('asses: ', assignments);
          console.log('materials: ', materials);
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
    navigate(`/t/${userId}/class/${classId}/week/${weekId}/topic/${topicId}/assignment`)
  }
  const handleAddMaterial = () => {

  }

  const handleDelete = (materialId) => {
    // Remove the deleted assignment from the assignments array
    setAssignments(assignments.filter((assignment) => assignment.materialId !== materialId));
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '20%'
        }}>
        <Box
          sx={{
          }}>
          <Button onClick={handleAddAssignment} variant="outlined" startIcon={<AddCircleIcon />}
            sx={{
              width: '150px',
              marginRight: '30px',
              marginBottom: '30px'

            }}>
            Assignment
          </Button>
          <Button onClick={handleAddMaterial} variant="outlined" startIcon={<AddCircleIcon />}
            sx={{
              width: '150px',
              marginLeft: '30px',
              marginBottom: '30px'
            }}>
            Material
          </Button>
        </Box>

        {!topic ? (
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Montserrat', fontSize: '1.25rem' }}>
            No assignments or materials yet!
          </Typography>
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
                onDelete={handleDelete}
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
      </Box>
    </div>
  );
}

export default ViewTopic;

