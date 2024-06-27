import { Container, Row, Col, Button } from "react-bootstrap"
import { Stack } from "react-bootstrap";

import { TweetsIndex } from "./Tweets/TweetsIndex";

import './userpage.css'

import { useState, useEffect } from "react";
import axios from 'axios';

export function UserPage(props) {

  const [tweets, setTweets] = useState([]);
  const [viewedUser, setViewedUser] = useState({});
  const [editVisible, setEditVisible] = useState('hidden');

  const getUserTweets = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let name = url.substring(x + 1, url.length);
  
    axios.get(`http://localhost:3000/tweets/users/${name}.json`)
    .then(response => {
      console.log(response);
      setTweets(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getUserTweets, []);
  

  const getUserInfo = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let name = url.substring(x + 1, url.length);
  
    axios.get(`http://localhost:3000/users/${name}.json`)
    .then(response => {
      console.log(response);
      setViewedUser(response.data);

      if (props.user.username === viewedUser.username) {
        setEditVisible('visible');
      }
      else {
        setEditVisible('hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getUserInfo, []);

  let user = props.user;
  

  if (viewedUser.username) {

    return (
      <div className="user-page">
        
        <div className="user-banner">
          <img src={viewedUser.banner}/>
        </div>
  
        <div className="user-sub-banner">
          <Stack direction="horizontal" gap={5}>
            <h6>Followers: {viewedUser.followers.length}</h6>
            <h6>Following: {viewedUser.following.length}</h6>
            <h6>tweets: {tweets.length}</h6>
            <h6>Likes: {viewedUser.likes}</h6>
            <Button style={{"visibility": editVisible}}>Edit Profile</Button>
          </Stack>
        </div>
        
        <div className="user-avi-container">
            <img src={viewedUser.avi}/>
        </div>
  
        <div className="user-page-content">
  
          <div/>
          <div className="user-bio">
            
            <h3>{viewedUser.display_name}</h3>
            <h6>@{viewedUser.username}</h6>
            <p>{viewedUser.bio}</p>
          </div>
  
          <div className="tweets-container">
  
            <TweetsIndex tweets={tweets}/>
          </div>
  
          <div className="user-suggestions">
            <div className="might-like">
              <h2>You Might Like</h2>
              <p>test</p>
              <p>test</p>
              <p>test</p>
            </div>
  
            <div className="whats-happening">
              <h2>What's Happening</h2>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </div>
          </div>
  
          <div/>
  
        </div>
  
      </div>
    )
  }
}