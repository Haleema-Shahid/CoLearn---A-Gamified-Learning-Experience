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

function TopicsBoard() {
  const { userID, classID, weekID, weekNumber } = useParams();
  const [topics, setTopics] = useState([{id:1, title: "datatypes", description: "something"}, {id:2, title: "arrays", description: "something"}]);

  // useEffect(() => {
  //   // fetch topics data and update state accordingly
  //   const fetchData = async () => {
  //     const response = await fetch(`api/topics?weekID=${weekID}`);
  //     const data = await response.json();
  //     setTopics(data);
  //   };
  //   fetchData();
  // }, [weekID]);

  return (
    <div>
      <h1>Week {weekNumber} Topics</h1>
      {/* <Link to={`/users/${userID}/classes/${classID}/weeks/${weekID}/add-topic`}>Add Topic</Link> */}
      {topics.map((topic) => (
        <TopicCard key={topic.id} title={topic.title} description={topic.description} userID={userID} classID={classID} weekID={weekID} weekNumber={weekNumber}/>
      ))}
    </div>
  );
}

export default TopicsBoard;





