import React, {useState,useEffect} from 'react';
import './login.css'


const LoginForm = ()=>{

     const[username,setUserName] = useState();
     const[password,setPassWord] =useState(); 

     useEffect(() => {
        // Retrieve the username from localStorage when the component mounts
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      }, []);


     const handleUserNameChange = (e) => {
     setUserName(e.target.value);
     }
     const handlePasswordChange =(e) =>{
        setPassWord(e.target.value);
     }
     const handleSubmit=(e) =>{
        //ang kani para di mo go through lahos ang submit form
     e.preventDefault()
    console.log('user',username)
    console.log('password',password)

    setPassWord('')
     }



return (
 <div>
 <h2>Login</h2>
 <form onSubmit={handleSubmit}>

  <div>
    <label htmlFor="username">UserName:</label>
    <input type='text' id='username' value={username} onChange={handleUserNameChange}/>
  </div>

  <div>
    <label htmlFor="password">Password:</label>
    <input type='text' id='password' value={password} onChange={handlePasswordChange}/>
  </div>
 
  <button type='submit'>LogIn</button>


  </form>
 </div>
);


}





export default LoginForm;