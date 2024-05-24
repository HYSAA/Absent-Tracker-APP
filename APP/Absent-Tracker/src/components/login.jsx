import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState(''); 


   // Retrieve the username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUserName(storedUsername);
    }
    console.log(storedUsername)
  }, []);
 

  const handleLogIn = () => {
    // Implement your login authentication logic here
    if (username === 'admin' && password === 'password') {
      // For simplicity, assume login is successful
      navigate('/calendar'); // Redirect to the calendar component
    } else {
      alert('Invalid username or password');
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call handleLogin to handle the login process
    handleLogIn();
  };

  return (
    <div className='cen'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">UserName:</label>
          <input type='text' id='username' value={username} onChange={handleUserNameChange}  autoComplete="username"/>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange}   autoComplete="current-password"  />
        </div>
        
        <button type='submit'>LogIn</button>
      </form>
    </div>
  );
};

export default LoginForm;
