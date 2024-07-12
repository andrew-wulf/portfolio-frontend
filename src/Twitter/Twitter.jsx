
import { Content } from "./Content";

import './twitter.css';

import { useState, useEffect } from "react";
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import { Loading } from "./Loading";

import { Redirect } from "./Redirect";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";


export function Twitter() {

  const [currentUser, setCurrentUser] = useState("none");

  const getUser = () => {
    if (localStorage.jwt) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.jwt
      axios.get('http://localhost:3000/user.json')
        .then(response => {
          console.log(response);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.log(error);
          setCurrentUser("")
        });
    }
    else {
      setCurrentUser("")
    }
  }
  useEffect(getUser, []);


  if (currentUser === "none") {

    return (
      <Loading />
    )
  }

  else {
    return (
      <div className="twitter">
        <Routes>
          <Route path = "/" element= {<Redirect user={currentUser} setUser={setCurrentUser}/>}/>
          <Route path = "/signin" element={<SignIn user={currentUser}/>}/>
          <Route path = "/signup" element={<SignUp user={currentUser}/>}/>

          <Route path = "/*" element={<Content user={currentUser} setUser={setCurrentUser} />}/>
        </Routes>
    
      </div>
    );
  }
}