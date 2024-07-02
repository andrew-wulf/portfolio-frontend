import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

import './twitter.css';

import { useState, useEffect } from "react";
import axios from 'axios'
import { Routes, Route } from "react-router-dom";
import { Loading } from "./Loading";



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
          <Route path = "/home" element={<Header user={currentUser}/>}/>
          <Route path = "/tweet/:id" element={<Header user={currentUser}/>}/>
          <Route path = "/users/:name" element={<Header user={currentUser}/>}/>
        </Routes>
        
        <Content user={currentUser} setUser={setCurrentUser} />
        <Footer />
      </div>
    );
  }
}