import { Header } from "./Header";
import { Content } from "./Content";
import { Footer } from "./Footer";

import './twitter.css';

import { useState, useEffect } from "react";
import axios from 'axios'



export function Twitter() {

  const [currentUser, setCurrentUser] = useState("");

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
        });
    }
  }
  useEffect(getUser, []);


  return (
    <div>
      <Header user={currentUser}/>
      <Content user={currentUser} setUser={setCurrentUser} />
      <Footer />
    </div>
  );
}