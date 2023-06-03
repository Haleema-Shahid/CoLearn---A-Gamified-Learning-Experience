//In this component we will be getting a weekID and with that weekID we can get all the topics and display them into cards
//right now we have a default array of topics and week ID
//came from CLO->clo starter after view week material in clo card is clicked...this component is rendered
//props: userId={this.state.userId} classId={this.state.classId} weekId={this.state.weekInfo[this.state.selectedWeekIndex]._id} weeknumber=index onTopicSelect={this.handleTopicSelect}

import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';
import React, { useState, useEffect } from 'react';
import ViewTopic from '../TopicsView/ViewTopic'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTopic from './AddTopic';
import Box from '@mui/material/Box';
function TopicsBoard(props) {
  const [weekId, setWeekId] = useState(props.weekId);
  const [userId, setUserId] = useState(props.userId);
  const [classId, setClassId] = useState(props.classId);

  //dummy data alert
  const [topics, setThisWeeksTopics] = useState([]);//this will have all the topics of this week--initial state will be null- for testing dummy data
  const [selectedTopic, setSelectedTopic] = useState(null);
  //const [addTopic, setAddTopic] = useState(false);//when we click add topic this is set to true and conditionally add topic componnent is rendered instead of all the topics

  // useEffect(() => {
  //   // fetch topics data and update state accordingly
  //   const fetchData = async () => {
  //     const response = await fetch(`api/topics?weekID=${weekID}`);
  //     const data = await response.json();
  //     setTopics(data);
  //   };
  //   fetchData();
  // }, [weekID]);



  //fetch all topics of this week, display them in order of upload time

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week/${weekId}/topics`);
        const data = await response.json();
        // Assuming the API response contains an array of topics with upload time property
        //const sortedTopics = data.sort((a, b) => a.uploadTime - b.uploadTime);
        setThisWeeksTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, [weekId]);


  const handleViewTopic = (topicId, userId, classId, weekIdfromChild) => {
    console.log("in topic board handle view topic :");
    console.log(topicId, userId, classId, weekIdfromChild)
    console.log("week id is", weekIdfromChild)
    props.onTopicSelect(topicId, userId, classId, weekIdfromChild);
  };

  // const HandleAddTopic = (topic) => {
  //   //here we open add topic cell

  //   setAddTopic(true);

  // };

  const HandleDeleteTopic = (topic) => {
    //Delete everything in a topic here
    //the topic object has all the topic properties--i.e topic id
    //background: this function is called by child component Topic card and is sent as a prop in it
    //-----------------------------backend----------------
    //possible algo: access the week ID, access the topic id and delete it



  };

  // const handleCloseTopic = (topic) => {
  //   //here we open add topic cell
  //   setAddTopic(false);

  // };

  const mapTopic = () => {

  }


  return (
    <div>


      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '20%'
        }}>
        {topics && Array.isArray(topics) && topics.map((topic, index) => (
          <TopicCard
            key={index}
            topicId={topic._id}
            topicObject={topic}
            title={topic.name}
            onViewTopic={handleViewTopic}
            // onDeleteTopic={HandleDeleteTopic}
            userId={props.userId}
            classId={props.classId}
            weekId={props.weekId}
            weekNumber={props.weekNumber}
            cardKey={topic._id}
          />
        ))}
      </Box>





      {/* {
        addTopic && (
          <div>
            <AddTopic weekId={weekId} classId={props.classId} userId={props.userId} closeAddTopic={handleCloseTopic} ></AddTopic>
          </div>
        )
      } */}

    </div>



  );
}

export default TopicsBoard;





