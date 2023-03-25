import React, { Component } from 'react';
import CLOCard from './CLOcards';
import './CLODetails.css'
import { Link } from 'react-router-dom';


class CloDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weeks: [],
      weekID:"1A4"
    };
  }
  render() {
    const { userID, classID, cloWeeks } = this.props;
    const { weeks } = this.state;

    // Map each week to a Card component
    const cards = [];
    for (let i = 1; i <= cloWeeks; i++) {
      console.log({cloWeeks})
    //   const weekData = weeks[i-1];
    //   const title = `Week ${i}`;
    //   const body = weekData ? weekData.topics : 'No data available';
    //in this i place the week id is to come
      cards.push(<Link to={`/user/${userID}/class/${classID}/week/${this.state.weekID}/${i}`}><CLOCard key={i} weekNumber={i} /></Link>);
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





