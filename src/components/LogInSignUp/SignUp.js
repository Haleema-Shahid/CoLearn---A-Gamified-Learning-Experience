import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Link1 from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link1 color="inherit" href="https://mui.com/">
        Co-Learn - A Gamified Learning Experience
      </Link1>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const firstName = info.get(firstName);
    const lastName = info.get(lastName);
    const email = info.get('email');
    const password = info.get('password');
    const role = e.target['radio-buttons-group'].value;
    
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName:firstName, lastName:lastName, email: email, password: password, role: role })
    };
  
    const response = await fetch('http://localhost:4000/api/login', requestOptions);
    const data = await response.json();
    
    if (response.ok) {
      // Do something with the user data
      //console.log(data._id);
     

    } else {
      // Handle the error
      console.log('Error:', response.status);
    }
  }
  
 

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: "auto",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="conpassword"
                  label="Confirm Password"
                  type="password"
                  id="conpassword"
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                <FormLabel id="radio-button">Role</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="radio-button"
                  name="radio-buttons-group"
                //  value={value}
                //  onChange={handleChange}
                >
                  <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="Student" control={<Radio />} label="Student" />
                </RadioGroup>
              </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to={'/'}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}


{/* <Radio
//  checked={selectedValue === 'Teacher'}
//  onChange={handleChange}
  value="Teacher"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'teacher' }}
/>
<Radio
//  checked={selectedValue === 'Student'}
//  onChange={handleChange}
  value="Student"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'student' }}
/> */}