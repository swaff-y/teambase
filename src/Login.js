import React, {useEffect, useState} from 'react';
import Logo from './components/Logo'
import Button from '@material-ui/core/Button';
import {Helmet} from 'react-helmet';
import { useHistory } from "react-router-dom";
import fetch from 'isomorphic-fetch';
import api from './api';
import "./login.css";

const Login = (props) => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  let history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleLogin = () => {
    let request = {"auth": {"email": email, "password": password}}
    let requestLogin = {"email": email}
    const headers = {
      'Content-Type': 'application/json'
    }

    api.post(`/user_token`, request, {
      headers: headers
    })
    .then(res=>{
      // console.log("JWT", res.data);
      localStorage.setItem("jwt", res.data.jwt)

      console.log("Local:", localStorage.jwt);

      const authHeaders = {
        'Authorization': 'Bearer ' + localStorage.jwt
      }

      api.post(`/user_login`, requestLogin, {
        headers: authHeaders
      })
      .then(res=>{
        // console.log("email: ",res.data.id);
        localStorage.setItem("user", res.data.id)
        history.push(`/projects/${localStorage.user}`)
      })
      .catch(err=>{
        console.warn(err);
      })
    })
    .catch(err=>{
      console.warn(err);
    })



    // const USER = 236;
    // history.push(`/projects/${USER}`)
  }

  return(
    <div className="login">
      <Helmet>
        <title>Teambase - Login</title>
          <meta name="description" content="Team Members" />
      </Helmet>
      <div className="login__center">
        <Logo
          style={{
            margin: 'auto',
            width: '200px'
          }}
        />
        <p>Please login below</p>
        <form
          onSubmit={(event)=>event.preventDefault()}
          className="login__form"
        >
          <div className="login__input">

            <input
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleEmail}
              value={email}
            />
          </div>
          <div className="login__input">

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handlePassword}
              value={password}
            />
          </div>
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            style={{
              width: "318px",
              borderRadius: "2",
              color: "#FFFFFF",
              margin: "auto",
              marginTop: "10px",
            }}
          >
          Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
