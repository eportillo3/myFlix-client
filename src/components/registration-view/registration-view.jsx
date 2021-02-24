import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'react-bootstrap';

import './registration-view.scss';
import axios from 'axios';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://myflixapp2021.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
    }

    return(
      <React.Fragment>
          <Form className='register-form'>
              <h1 className='register-header'>Registration Welcome!</h1>
              <Form.Group controlId='formBasicText'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control 
                  type='username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder='Enter usename'
                  />
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter email'
                  />
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter new password'
                  />
              </Form.Group>
              <Form.Group controlId='formBasicConfirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='Confirm your password'
                  />
              </Form.Group>
              <Form.Group controlId='formBasicDate'>
                  <Form.Label>Birthdate</Form.Label>
                  <Form.Control
                  type='date'
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  placeholder='Enter your birthdate'
                  />
              </Form.Group>
              <Button className='submit-button' type='button' variant='dark' onClick={handleSubmit}>Submit</Button>
          </Form>
      </React.Fragment>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      confirmPassword: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func,
};