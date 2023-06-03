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
import Snackbar from '@mui/material/Snackbar';
import { Radio } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import loginbg from '../../images/loginbg.png';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https:mui.com/">
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
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate();

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

    try {
      const response = await fetch('http://localhost:4000/backend/login', requestOptions);










      if (response.ok) {
        console.log(response);
        const data = await response.json();
        if (data.error && data.error === 'Invalid email or password') {
          setInvalidCredentials(true);
          setOpenSnackbar(true);
          console.log("set to true")
        }
        else {
          console.log("in ok")

          // Do something with the user data
          const userId = data._id;
          if (data.role == 'teacher') {
            navigate(`/t/${userId}`)
          } else if (data.role == 'student') {
            navigate(`/s/${userId}`)
          }
        }

      }
    } catch (error) {
      // Handle the exception
      if (error.response && error.response.status === 401) {
        console.log("here");
        setInvalidCredentials(true);
        setOpenSnackbar(true);
      }
      console.log('Exception:', error.message);
    }
  }



  return (


    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh', // Adjust the height as needed
      }}
    >
      <Box
        sx={{
          flex: '2', // Adjust the flex value to control the width of the image side
          backgroundImage: `url(${loginbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box
        sx={{
          //flex: '1', // Adjust the flex value to control the width of the form side
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center',
          justifyContent: 'center',
          //position: 'relative'
          //marginTop: '352px'
        }}
      >
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{

                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                padding: '0px',
                margin: '0px',
                justifyContent: 'right',

                // width: '100%'


              }}
            >

              <Box component="form" onSubmit={handleSubmit} noValidate
                sx={{
                  // //mt: 1,
                  // display: 'flex',
                  // flexDirection: 'column',
                  // justifyContent: 'right'
                  position: 'relative',
                  width: '90%'
                }}>
                {invalidCredentials && (
                  <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                    message="Invalid username or password"
                  />
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label={<Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Email
                  </Typography>}
                  name="email"
                  autoComplete="email"
                  autoFocus
                  InputLabelProps={{
                    required: false, // Disable the default asterisk rendering
                  }}
                  sx={{

                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={<Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Password
                  </Typography>}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputLabelProps={{
                    required: false, // Disable the default asterisk rendering
                  }}
                />
                <Grid item xs={12}>
                  <div >
                    <FormControl>
                      <FormLabel id="radio-button" sx={{
                        marginTop: '20px',
                        marginBottom: '0px'
                      }}>Role</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="radio-button"
                        name="radio-buttons-group"
                      // value={value}
                      // onChange={handleChange}
                      >
                        <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                        <FormControlLabel value="student" control={<Radio />} label="Student" />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" size='small' />}
                  label={<Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                    Remember me
                  </Typography>}
                  sx={{
                    marginTop: '20px'
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ marginTop: '10px', mb: 2 }}
                >
                  Log In
                </Button>

                <Grid container>
                  <Grid item xs>

                    Forgot password?

                  </Grid>
                  <Grid item>
                    <Link to={`/signup`}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
          </Container>
        </ThemeProvider>
      </Box>
    </Box>






  );
}