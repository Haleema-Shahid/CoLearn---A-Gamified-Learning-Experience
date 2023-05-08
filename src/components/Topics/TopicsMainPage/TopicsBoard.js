//In this component we will be getting a weekID and with that weekID we can get all the topics and display them into cards
//right now we have a default array of topics and week ID
//came from CLO->clo starter after view week material in clo card is clicked...this component is rendered
//props: userId={this.state.userId} classId={this.state.classId} weekId={this.state.weekInfo[this.state.selectedWeekIndex]._id} onTopicSelect={this.handleTopicSelect}

import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';
import React, { useState } from 'react';
import ViewTopic from '../TopicsView/ViewTopic'
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddTopic from './AddTopic';

function TopicsBoard(props) {
  const[weekID, setWeekID]=useState(props.weekId);
  const [topics, setThisWeeksTopics] = useState(null);//this will have all the topics of this week
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [addTopic, setAddTopic] = useState(false);//when we click add topic this is set to true and conditionally add topic componnent is rendered instead of all the topics

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
  const handleViewTopic = (topic) => {
    console.log("in here");
    console.log(topic)
    props.onTopicSelect(topic);
  };

  const HandleAddTopic = (topic) => {
    //here we open add topic cell
    setAddTopic(true);

  };

  const handleCloseTopic = (topic) => {
    //here we open add topic cell
    setAddTopic(false);

  };


  return (
    <div>
      
        {!addTopic && (
          <div>
            <div>
              <Button onClick={HandleAddTopic} variant="outlined" startIcon={<AddCircleIcon />}>
                Add Topics
              </Button>
            </div>
            <div>
              {topics && topics.map((topic, index) => (
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
              ))}
            </div>
          </div>

        )
        }

        {
          addTopic && (
            <div>
              <AddTopic weekID={weekID} classID={props.classId} closeAddTopic={handleCloseTopic} ></AddTopic>
            </div>
          )
        }

      </div>


  
  );
}

export default TopicsBoard;





