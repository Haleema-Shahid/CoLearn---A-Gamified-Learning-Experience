//In this component we will be getting a weekID and with that weekID we can get all the topics and display them into cards
//right now we have a default array of topics and week ID


import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';
import React, { useState } from 'react';
import ViewTopic from '../TopicsView/ViewTopic'

function TopicsBoard(props) {
  console.log("in topic board");
  const [selectedTopic,setSelectedTopic]=useState(null);
  
  // useEffect(() => {
  //   // fetch topics data and update state accordingly
  //   const fetchData = async () => {
  //     const response = await fetch(`api/topics?weekID=${weekID}`);
  //     const data = await response.json();
  //     setTopics(data);
  //   };
  //   fetchData();
  // }, [weekID]);

  const handleViewTopic = (topic) => {
    console.log("in here");
    console.log(topic)
    props.onTopicSelect(topic);
  };

  
  return (
    <div>
      <h1>Week  Topics</h1>
   
      {
        props.topics.map((topic,index) => (
          <TopicCard 
          key={index}
            id={topic._id}
            topicObject={topic}
            title={topic.title}
            description={topic.description}
            onViewTopic={handleViewTopic}
            userID={props.userID}
            classID={props.classID}
            weekID={props.weekID} 
            weekNumber={props.weekNumber}
            cardKey={topic.id}
          />
    
        ))
      }
    </div>
  );
}

export default TopicsBoard;





