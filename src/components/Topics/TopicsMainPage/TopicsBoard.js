//In this component we will be getting a weekID and with that weekID we can get all the topics and display them into cards
//right now we have a default array of topics and week ID
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import TopicCard from './TopicCard';

// class TopicsBoard extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       topics: [{id: 1, title: "Boolean Values", description: "something "}, {id: 2, title: "Boolean Values", description: "something "}],
//     };
//   }

//   componentDidMount() {
//     // fetch topics data and update state accordingly
//   }

//   render() {
//     const { userID, classID, weekID,weekNumber } = this.props.match.params;
//     const { topics } = this.state;

//     return (
//       <div>
//         <h1>Week {weekNumber} Topics</h1>
//         {/* <Link to={`/users/${userID}/classes/${classID}/weeks/${weekID}/add-topic`}>Add Topic</Link> */}
//         {topics.map((topic) => (
//           <TopicCard key={topic.id} title={topic.title} description={topic.description} />
//         ))}
//       </div>
//     );
//   }
// }

// export default TopicsBoard;

import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';
import React, { useState } from 'react';
import ViewTopic from '../TopicsView/ViewTopic'

function TopicsBoard(props) {
  const [selectedTopic,setSelectedTopic]=useState(null);
  
  const [topics, setTopics] = useState([{id:1, title: "datatypes", description: "something", materials:[{
    id: 1,
    title: "Material 1",
    description: "This is the description of Material 1.",
    files: ["file1.pdf", "file2.docx"],
    creationDate: "2022-03-01",
  },
  {
    id: 2,
    title: "Material 2",
    description: "This is the description of Material 2.",
    files: ["file1.pdf"],
    creationDate: "2022-03-02",
  },], assignments:[{
    id: 1,
    title: "Assignment 1",
    description: "This is the description of Assignment 1.",
    files: ["file1.pdf", "file2.docx"],
    deadline: "2022-03-15",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    title: "Assignment 2",
    description: "This is the description of Assignment 2.",
    files: ["file1.pdf"],
    deadline: "2022-03-20",
    tags: ["tag1"],
  },]}, 
  {id:2, title: "arrays", description: "something", materials:[{
    id: 1,
    title: "Material 1",
    description: "This is the description of Material 1.",
    files: ["file1.pdf", "file2.docx"],
    creationDate: "2022-03-01",
  },
  {
    id: 2,
    title: "Material 2",
    description: "This is the description of Material 2.",
    files: ["file1.pdf"],
    creationDate: "2022-03-02",
  },], assignments:[{
    id: 1,
    title: "Assignment 1",
    description: "This is the description of Assignment 1.",
    files: ["file1.pdf", "file2.docx"],
    deadline: "2022-03-15",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    title: "Assignment 2",
    description: "This is the description of Assignment 2.",
    files: ["file1.pdf"],
    deadline: "2022-03-20",
    tags: ["tag1"],
  }], assignments:[{
    id: 1,
    title: "Assignment 1",
    description: "This is the description of Assignment 1.",
    files: ["file1.pdf", "file2.docx"],
    deadline: "2022-03-15",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    title: "Assignment 2",
    description: "This is the description of Assignment 2.",
    files: ["file1.pdf"],
    deadline: "2022-03-20",
    tags: ["tag1"],
  },]}]);

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
      {/* <Link to={`/users/${userID}/classes/${classID}/weeks/${weekID}/add-topic`}>Add Topic</Link> */}
      {
        topics.map((topic) => (
          
          <TopicCard
            
            key={topic.id}
            topicObject={topic}
            id={topic.id}
            title={topic.title}
            description={topic.description}
            onViewTopic={handleViewTopic}
            userID={userID}
            classID={classID}
            weekID={weekID} 
            weekNumber={weekNumber}
          />
    
        ))
      }
      {/* {topics.map((topic) => (
        <TopicCard key={topic.id} title={topic.title} description={topic.description} userID={userID} classID={classID} weekID={weekID} weekNumber={weekNumber}/>
      ))} */}
    </div>
  );
}

export default TopicsBoard;





