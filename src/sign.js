
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import './sign.css';

class SignUpPage extends Component {


  
        state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        };
    

    handleSubmit = async event => {
        event.preventDefault();
        const { firstName, lastName, username, email, password, passwordConfirmation } = this.state;
        if (firstName === '' || lastName === '' || username === '' || email === '' || password === '' || passwordConfirmation === '') {
            return;
        }

        if (password !== passwordConfirmation) {
            console.log('Passwords do not match');
            return;
        }

        // const response = await axios.post('http://localhost:4000/app/signup', { firstName, lastName, username, email, password });
        // console.log(response);
        // if (response.data.success) {
        //     console.log('Sign up successful');
        // } else {
        //     console.log('An error occurred');
        // }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className='signup-page' >
                <div className='split right'>
                    <div>
                        <Form className='login-box' onSubmit={this.handleSubmit}>
                            <h2 className="mb-3" style={{ textAlign: 'left' }}>Sign Up</h2>
                            <div className='field-container'>
                                <FormGroup>

                                    <Label for="firstName">First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        placeholder='Enter your first name'

                                        onChange={this.handleChange} // update username state when input value changes

                                    />
                                </FormGroup>
                            </div>
                            <div className='field-container'>
                                <FormGroup>

                                    <Label for="lastName">Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        placeholder='Enter your last name'
                                        onChange={this.handleChange}// update username state when input value changes

                                    />
                                </FormGroup>
                            </div>
                            <div className='field-container'>

                                <FormGroup>

                                    <Label for="username">Username</Label>
                                    <Input
                                        type="text"
                                        name="username"
                                        placeholder='Enter your username'
                                       
                                        onChange={this.handleChange} // update username state when input value changes

                                    />
                                </FormGroup>
                            </div>
                            <div className='field-container'>
                                <FormGroup>

                                    <Label for="email">E mail Address</Label>
                                    <Input
                                        type="text"
                                        name="email"
                                        placeholder='Enter your email'
                                    
                                        onChange={this.handleChange} // update username state when input value changes

                                    />
                                </FormGroup>
                            </div>
                            <div className='field-container'>
                                <FormGroup>

                                    <Label for="password">Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        placeholder='Enter your password'
                                        
                                        onChange={this.handleChange} // update password state when input value changes

                                    />
                                </FormGroup>
                            </div>
                            <div className='field-container'>
                                <FormGroup>

                                    <Label for="passwordConfirmation">Confirm Password</Label>
                                    <Input
                                        type="password"
                                        name="passwordConfirmation"
                                        placeholder='Re-Enter your password'
                                        
                                        onChange={this.handleChange} // update password state when input value changes

                                    />
                                </FormGroup>
                            </div>

                            <input type="submit" value="Submit" />
                        </Form>
                    </div>
                </div>
                <div className="split left">
                    <div className="centered">
                        <img src="https://images.unsplash.com/photo-1593698054469-2bb6fdf4b512?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="a study image" />

                    </div>
                </div>







            </div>
        )
    }
}

export default SignUpPage
