//from backend we need to get number of weeks, week Info
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloDetails from './CLODetails';
import TopicsBoard from '../Topics/TopicsMainPage/TopicsBoard'
import ViewTopic from '../Topics/TopicsView/ViewTopic';

class Clo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      classId: props.classId,
      slectedWeekIndex: -1,
      weekNumber: 0,//this is for dummy change it to 0 after backend is implemented
      //week info is a week array 
      //if implementing backend we can get the week id that already exist and if we click the week then on topic board we can get all
      //data related to that week
      //for now weekinfo has almost all the data for ease to show how data is being processes
      weekInfo: [],
      isWeekSelected: false,
      selectedWeek: null,
      selectedTopic: null,//after opening a week and selecting a topic
      showViewTopic: false,
      selectedTopicsWeekId: null
    };
  }

  async componentDidMount() {
    const { userId, classId } = this.state;
    try {
      const response = await fetch(`http://localhost:4000/backend/s/${userId}/class/${classId}/weeks`);
      const data = await response.json();
      if (data.length > 0) {
        console.log("data is ", data);
        this.setState({ weekNumber: data.length, weekInfo: data });
      }
      else {
        this.setState({ weekNumber: 0, weekInfo: [] });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // componentDidMount = () => {
  //   // console.log("ENTERED COMPONENT DID MOUNT");
  //   // const {userId, classId} = this.state;
  //   // //const classId = this.props.classId;
  //   // console.log("user id is ",userId);
  //   // console.log("class id is ",classId);
  //   // fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/weeks`)
  //   //   .then(response => response.json())
  //   //   .then(data => {
  //   //     // Update state with API data
  //   //     this.setState({ weekInfo: data });
  //   //   })
  //   //   .catch(error => {console.error(error); console.log("HHAHAHA BITCH")});
  // }
  onWeekSelect = (weekIndex) => {
    console.log("weekIndex is:")
    console.log(weekIndex);
    console.log("selected");

    const selectedWeek = this.state.weekInfo[weekIndex];
    this.setState({
      isWeekSelected: true,
      selectedWeekIndex: weekIndex,
      selectedWeek: selectedWeek
    });
    // this.setState({ selectedWeek: weekIndex, isWeekSelected: true }, () => {
    //   console.log("selected week number is: ", this.state.selectedWeek);
    // });
  };

  handleWeekNumberInput = (event) => {
    this.setState({ weekNumber: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const weekNumber = parseInt(formData.get('weekNumber'));
    this.setState({ weekNumber });
    const { onNumberOfWeeksChange } = this.props;

    // Call the callback function with the selected number of weeks
    onNumberOfWeeksChange(weekNumber);
  };

  // onAddWeekClick = () => {
  //   const { userId, classId } = this.state;
  //   console.log("week number is ", this.state.weekNumber);
  //   if (this.state.weekNumber < 16) {
  //     this.setState((prevState) => {
  //       //const newWeekInfo = prevState.weekInfo.concat({ topics: [] });
  //       console.log("prevState.weekinfo is ");
  //       console.log(prevState.weekInfo);
  //       return {
  //         weekNumber: prevState.weekNumber + 1,
  //         weekInfo: [...prevState.weekInfo, { topics: [] }],
  //       };
  //     }, () => {
  //       // Make API call to add new week to database
  //       fetch(`http://localhost:4000/backend/t/${userId}/class/${classId}/week`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ weekNumber: this.state.weekNumber, topics: [] }),
  //       })
  //         .then(response => response.json())
  //         .then(data => console.log(data))
  //         .catch(error => console.error(error));
  //     });
  //   }
  // };


  handleTopicSelect = (topicId, userId, classId, weekId) => {

    console.log("topic selected");
    this.setState({ selectedTopic: topicId })
    this.setState({ showViewTopic: true })
    this.setState({ selectedTopicsWeekId: weekId });


  }

  render() {
    const { classId, weekNumber } = this.state;
    console.log("in clo starter");


    return (
      <div>
        <div style={{ gap: '16px', justifyContent: 'center', alignItems: 'center', paddingLeft: "0%" }}>
          {!this.state.isWeekSelected && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '20%'
              }}>

              {/* <Button onClick={this.onAddWeekClick} variant="outlined" startIcon={<AddCircleIcon />}>
                Add Week
              </Button> */}
              <CloDetails userId={this.state.userId} classId={this.state.classId} numberWeeks={this.state.weekNumber} weeksInfo={this.state.weekInfo} onWeekSelect={this.onWeekSelect}></CloDetails>

            </Box>
          )
          }
          {this.state.isWeekSelected && !this.state.showViewTopic && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '20%'
              }}>
              <TopicsBoard userId={this.state.userId} classId={this.state.classId} weekId={this.state.weekInfo[this.state.selectedWeekIndex]._id} weekNumber={this.state.selectedWeekIndex + 1} onTopicSelect={this.handleTopicSelect} />
            </Box>
          )
          }
          {
            this.state.isWeekSelected && this.state.showViewTopic && (
              <ViewTopic
                userId={this.state.userId}
                classId={this.state.classId}
                weekId={this.state.selectedTopicsWeekId}
                topicId={this.state.selectedTopic}

              ></ViewTopic>

            )
          }
        </div>
      </div>
    );
  }
}
export default Clo;
