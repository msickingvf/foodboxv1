import React, { useEffect, useState } from 'react'
import { Link ,useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        switch(name){
            case 'username': setUsername(value);
            break;
            case 'password': setPassword(value);
            break;
            case 'passwordRepeat' : setPasswordRepeat(value);
            if (value === password) {
                setSubmitDisabled(false);
                setErrorMsg("");
            } else {
                setSubmitDisabled(true);
                setErrorMsg("Passwords don´t match");
            }
            break;
        }    
    }
    const handleSubmit =(event)=>{
      //let isLoginValid = false;
      event.preventDefault();
      fetch(process.env.REACT_APP_SERVER_URL+'/register',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'email':username,'password':password})
      })
      .then(response => response.json())
      .then(data=>{
          console.log('Success:', data);
          /*if (data.authenticated===false){
            isLoginValid=false;
            setErrorMsg('Invalid Credentials')
            console.log('Invalid credentials')
          } else if (data.authenticated===true){
            isLoginValid=true;
            sessionStorage.setItem('username', data.email);
            sessionStorage.setItem('welcomeMessage',data.message);
            console.log('login success');
            console.log('try calling parend setUser');
            navigate('/home');
          }*/
          navigate('/login');
      });
    }
  return (
    <div className='ContentBoxx'>
      <h2>Register New User</h2>
      <span className='error'>{errorMsg}</span>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="username" className="form-control inputField" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={username} onChange={handleChange}/>
        </div>
        <div className="form-group lastOne">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control inputField" id="exampleInputPassword1" name="password" value={password} placeholder="Password" onChange={handleChange}/>
        </div>
        <div className="form-group lastOne">
            <label htmlFor="exampleInputPassword2">Password</label>
            <input type="password" className="form-control inputField" id="exampleInputPassword2" name="passwordRepeat" value={passwordRepeat} placeholder="Repeat Password" onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitDisabled}>Register</button>
        </form>
    </div>
  )
}
