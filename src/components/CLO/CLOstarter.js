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
import TopicsBoard from '../TopicsMainPage/TopicsBoard'

class Clo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      classId: props.classId,
      weekNumber: 0,
      weekInfo: [],
      isWeekSelected: false,
      selectedWeek: null
    };
  }

  componentDidMount() {
    fetch('https://example.com/api/data')
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        this.setState({ apiData: data });
      })
      .catch(error => console.error(error));
  }
  onWeekSelect = (weekIndex) => {
    console.log(weekIndex);
    console.log("selected");
    this.setState({ selectedWeek: weekIndex, isWeekSelected: true });
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

  onAddWeekClick = () => {
    if (this.state.weekNumber < 16) {
      this.setState((prevState) => {
        const newWeekInfo = [...prevState.weekInfo, { topics: [] }];
        return {
          weekNumber: prevState.weekNumber + 1,
          weekInfo: newWeekInfo,
        };
      });
    }
  };

  render() {
    const { classId, weekNumber } = this.state;
   

    return (
      <div>
        <div style={{ gap: '16px', justifyContent: 'center', alignItems: 'center', paddingLeft: "20%" }}>
          {!this.state.isWeekSelected && (
            <div>
              <Button onClick={this.onAddWeekClick} variant="outlined" startIcon={<AddCircleIcon />}>
                Add Week
              </Button>
              <CloDetails userId={this.state.userId} classId={this.state.classId} numberWeeks={this.state.weekNumber} weeksInfo={this.state.weekInfo} onWeekSelect={this.onWeekSelect}></CloDetails>
            </div>
          )
          }
          {this.state.isWeekSelected && (
            <div>
              <TopicsBoard userId={this.state.userId} classId={this.state.classId} weekID={this.state.weekInfo[this.state.selectedWeek].id} weekNumber={this.state.weekInfo[this.state.selectedWeek].number} topics={this.state.weekInfo[this.state.selectedWeek].topics}/>
              </div>
          )
          }
        </div>
      </div>
    );
        }
      }
export default Clo;
// {/*   
//           <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <Box
//           component="form"
//           action="#"
//           onSubmit={this.handleSubmit}
//           sx={{
//             backgroundImage: `linear-gradient(to right, #1e3c72, #2a5298)`,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             backgroundColor: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             width: '80%',
//             maxWidth: '400px',
//           }}
//         >
//           <Typography variant="h6" component="h4" mb={3}>
//             Enter Number of Weeks:
//           </Typography>
//           <TextField
//             id="weekNumber"
//             name="weekNumber"
//             select
//             value={weekNumber || ''}
//             onChange={this.handleWeekNumberInput}
//             required={weekNumber === null}
//             fullWidth
//             sx={{ backgroundColor: 'white', fontSize: '0.8rem' }}
//           >
//             {Array.from(Array(16).keys()).map((num) => (
//               <MenuItem key={num + 1} value={num + 1}>
//                 {num + 1}
//               </MenuItem>
//             ))}
//           </TextField>
//           <br />
//           <br />
//           <Button
//             type="submit"
//             variant="contained"
//             sx={{
//               backgroundColor: '#1e3c72',
//               color: 'white',
//               borderRadius: '20px',
//               padding: '10px 30px',
//               fontSize: '1.2rem',
//               '&:hover': {
//                 backgroundColor: '#0c2461',
//               },
//             }}
//           >
//             Submit
//           </Button>
//         </Box>
//     </Box> */}
   

//     );
//   }
// }

// export default Clo;
