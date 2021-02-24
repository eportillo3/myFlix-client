import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './login-view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixapp2021.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data)
    })
    .catch(e => {
      console.log('no such user')
    })
  };  


  //   console.log(username, password);
  //   /* Send a request to the server for authentication */
  //   /* then call props.onLoggedIn(username) */
  //   props.onLoggedIn(username);
  // };

  return (
    <Form className='login-form'>
      <h1 className='login-header'>Login Here:</h1>
    <Form.Group controlId="formUsername">
      <Form.Label className='form-label' >Username:</Form.Label>
      <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder='Type username here' />
    </Form.Group>

    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder='Type password here' />
    </Form.Group>
    <Button className='submit-button' type="submit" onClick={handleSubmit}>
      Submit
    </Button>
  </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};