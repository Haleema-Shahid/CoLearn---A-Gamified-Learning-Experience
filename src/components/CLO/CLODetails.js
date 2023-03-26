import React, { Component } from 'react';
import CLOCard from './CLOcards';
import './CLODetails.css'
import { Link } from 'react-router-dom';


class CloDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekInfo: props.weeksInfo,
    };
  }

  addTopic = (weekNumber, topic) => {
    // Update the weekInfo state with the new topic
    const updatedWeekInfo = [...this.state.weekInfo];
    updatedWeekInfo[weekNumber - 1].topics.push(topic);
    this.setState({ weekInfo: updatedWeekInfo });
  };

  render() {
    const { userID, classID, numberWeeks } = this.props;
    const { weeks } = this.state;
    console.log({numberWeeks});


    // Map each week to a Card component
    const cards = [];
    for (let i = 1; i <= numberWeeks; i++) {
      console.log({numberWeeks});
      console.log(this.state.weekInfo);
    //   const weekData = weeks[i-1];
    //   const title = `Week ${i}`;
    //   const body = weekData ? weekData.topics : 'No data available';
    //in this i place the week id is to come
      cards.push(<CLOCard key={i} weekNumber={i} weekInfo={this.state.weekInfo[i]} onAddTopic={this.addTopic} onClick={() => this.props.onWeekSelect(i-1)} />);
    }

    return (
      <div >
        {/* <h2>Class Details</h2>
        <p>User ID: {userID}</p>
        <p>Class ID: {classID}</p>
        <p>weeks: {cloWeeks}</p> */}
        <div style={{ gap: '16px', justifyContent: 'center',alignItems: 'center', paddingLeft:"20%" }}>
        {cards}
        </div>
      </div>
    );
  }
}

export default CloDetails;





