import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Radio } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const history = useHistory();

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      Co-Learn - A Gamified Learning Experience
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData(e.currentTarget);
    const email = info.get('email');
    const password = info.get('password');
    const role = e.target['radio-buttons-group'].value;
  
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password, role: role })
    };
  
    const response = await fetch('http://localhost:4000/api/login', requestOptions);
    const data = response.json();
  
    if (response.ok) {
      // Do something with the user data
      console.log(data);
      history.push(`/user/${data.userId}`);
    } else {
      // Handle the error
      console.log('Error:', response.status);
    }
  }
  
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
    
    
  //   setemail(data.get('email'));
  //   setpassword(data.get('password'));
  //   setrole(event.target['radio-buttons-group'].value)
    
  //   const loginCredentials = {
  //     email: data.get('email'),
  //     password: data.get('password'),
  //     role: event.target['radio-buttons-group'].value
  //   }
  //   getUser(loginCredentials)


  //   console.log({
  //     email: data.get('email')
  //   });
  // };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
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
                <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                <FormControlLabel value="student" control={<Radio />} label="Student" />
              </RadioGroup>
            </FormControl>
            </Grid>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}