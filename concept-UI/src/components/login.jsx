import React, { useState } from 'react';
import { user_login, user_sign_up } from '../services/user.service';

import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();


  const toggleForm = () => {
    setIsLogin(!isLogin);
  };


  const navigateToHome = () =>{
    navigate("/notes")
  }

  const handleClick = (e) =>{
    e.preventDefault()
    if(isLogin){
      let body = {
        "email" : email,
        "password" : password
      } 
      const res = user_login(body)
      if(res){
        navigateToHome()
      }
    }
    else{
      let body = {
      "username" : username,
      "email" : email,
      "password" : password
      }
      const res = user_sign_up(body);
      if(res){
        navigateToHome()
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="form-container">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form>
            {!isLogin && (
              <div className="form-group">
                <label>Username</label>
                <input type="text" placeholder="Enter username" onChange={(e)=>{setUserName(e.target.value)}}/>
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
            <button type="submit" onClick={(e)=>{handleClick(e)}}>{isLogin ? 'Login' : 'Sign Up'}</button>
          </form>
          <button onClick={toggleForm} className="toggle-btn">
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
