//this is going to show all the assignment and material posted for a topic
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ContentCard from './contentCards/ContentCard';
import Typography from '@mui/material/Typography';
// import SplitPane from 'react-split-pane';
// import Pane from 'react-split-pane/lib/Pane';



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
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          //paddingLeft: '20%'
        }}>


        {!(assignments.length > 0) ? (
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Montserrat', fontSize: '1.25rem' }}>
            No assignments or materials yet!
          </Typography>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            //paddingLeft: '20%'
          }}>
            <div
              style={{

                left: 0,
                position: 'relative',
                overflowX: 'hidden',
                overflowY: 'auto',
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
              <h2 style={{ color: "#2a5298", fontFamily: 'Montserrat', marginBottom: '20px' }}>Assignments</h2>

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
                //onDelete={handleDelete}
                />
              ))}
            </div>
            <div style={{
              left: 0,

              position: 'relative',
              overflowX: 'hidden',
              overflowY: 'auto',
              width: '50%'
            }}>
              <h2 style={{ color: "#2a5298", fontFamily: 'Montserrat', marginBottom: '20px' }}>Materials</h2>
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
          </div>
        )}
      </Box>
    </div>


  );


}

export default ViewTopic;
