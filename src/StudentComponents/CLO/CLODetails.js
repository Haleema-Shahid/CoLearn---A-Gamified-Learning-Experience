
import React, { Component } from 'react';
import CLOCard from './CLOcards';
import './CLODetails.css'
import { Link } from 'react-router-dom';
import AddTopic from '../Topics/TopicsMainPage/AddTopic'


class CloDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekInfo: props.weeksInfo,
      showAddForm: false,
      currWeekNumber: 0//this tells on which week add topic was called
    };
  }



  addTopic = (topic) => {
    // Update the weekInfo state with the new topic
    //u need to make the backend here
    //with topic u only get the title
    //u have to assign id and then inser in db
    const updatedWeekInfo = [...this.state.weekInfo];
    updatedWeekInfo[this.state.currWeekNumber - 1].topics.push(topic);

    this.setState({ weekInfo: updatedWeekInfo });
  };

  showAddTopicForm = (week) => {
    console.log("in show add topic form in clo details")
    this.setState({ currWeekNumber: week })
    this.setState({ showAddForm: true })


  }

  render() {
    const { userID, classID, numberWeeks } = this.props;
    const { weeks } = this.state;
    console.log({ numberWeeks });


    // Map each week to a Card component
    const cards = [];
    for (let i = 1; i <= numberWeeks; i++) {
      cards.push(<CLOCard key={i} weekNumber={i} weekInfo={this.state.weekInfo[i]} onWeekSelect={() => this.props.onWeekSelect(i - 1)} />);
    }


    return (
      <div >

        <div style={{ gap: '16px', justifyContent: 'center', alignItems: 'center', marginLeft: "20%" }}>
          {cards}
        </div>
        {/* {this.state.showAddForm && (<AddTopic addToTopics={this.addTopic} topics={this.state.weekInfo[this.state.currWeekNumber].topics} ></AddTopic>)} */}
      </div>
    );
  }
}

export default CloDetails;





