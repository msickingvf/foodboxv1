import React, { useEffect, useState } from 'react'
import { Link ,useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    //console.log("process.evn"+JSON.stringify(process.env));
    //const [users, setUsers] = useState([])
    const location = useLocation();
    //const  { from }  = location.state;
    //console.log("from: "+from);

    const navigate = useNavigate();
    const handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        switch(name){
            case 'username': setUsername(value);
            break;
            case 'password': setPassword(value);
            break;
        }    
    }
    const handleSubmit =(event)=>{
      let isLoginValid = false;
      event.preventDefault();
      console.log("Server url: "+process.env.REACT_APP_SERVER_URL)
      fetch(process.env.REACT_APP_SERVER_URL+'/authenticated',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'email':username,'password':password})
      })
      .then(response => response.json())
      .then(data=>{
          console.log('Success:', data);
          if (data.authenticated===false){
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
          }
      });
    }
  return (
    <div className='ContentBoxx'>
      <h2>User Login</h2>
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
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
        <Link to='/register' className="underlineHover">Create Account</Link>
    </div>
  )
}
