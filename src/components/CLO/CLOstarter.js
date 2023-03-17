import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

class Clo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: props.classID,
      weekNumber: props.cloWeeks === 0 ? null : props.cloWeeks,
    };
  }



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

  render() {
    const { classId, weekNumber } = this.state;

    return (
      <div>

        <Box
          component="form"
          action="#"
          onSubmit={this.handleSubmit}
          sx={{
            backgroundImage: `linear-gradient(to right, #1e3c72, #2a5298)`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '400px',
          }}
        >
          <Typography variant="h6" component="h4" mb={3}>
            Enter Number of Weeks:
          </Typography>
          <TextField
            id="weekNumber"
            name="weekNumber"
            select
            value={weekNumber || ''}
            onChange={this.handleWeekNumberInput}
            required={weekNumber === null}
            fullWidth
            sx={{ backgroundColor: 'white', fontSize: '0.8rem' }}
          >
            {Array.from(Array(30).keys()).map((num) => (
              <MenuItem key={num + 1} value={num + 1}>
                {num + 1}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#1e3c72',
              color: 'white',
              borderRadius: '20px',
              padding: '10px 30px',
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#0c2461',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </div>

    );
  }
}

export default Clo;
