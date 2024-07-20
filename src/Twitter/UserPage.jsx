import { Container, Row, Col, Button } from "react-bootstrap"
import { Stack } from "react-bootstrap";

import { TweetsIndex } from "./Tweets/TweetsIndex";

import './userpage.css'

import { useState, useEffect } from "react";
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function UserPage(props) {

  const [tweets, setTweets] = useState([]);
  const [viewedUser, setViewedUser] = useState({});
  const [editVisible, setEditVisible] = useState('hidden');
  const navigate = useNavigate();

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
        
        <div className="user-page-top-bar">
          <div onClick={() => {navigate(-1)}} className=" w-8 h-8 rounded-2xl hover:cursor-pointer hover:shadow-black hover:bg-gray-300 flex align-items-center justify-content-center">
            <FaArrowLeft />
          </div>
          <h4>{viewedUser.display_name}</h4>
        </div>
        
        <div className="user-banner">
          <img src={viewedUser.banner}/>
        </div>
      
        <div className="user-avi-container">
            <img src={viewedUser.avi}/>
        </div>

        <div className="user-bio">
            
          <h4>{viewedUser.display_name}</h4>
          <h6>@{viewedUser.username}</h6>
          <p>{viewedUser.bio}</p>
          <div className="flex flex-row gap-2">
            <div className="flex flex-row gap-1">
             <h6>{viewedUser.followers}</h6>
             <p>Followers</p>
            </div>

            <div className="flex flex-row gap-1">
              <h6>{viewedUser.following}</h6>
              <p>Following</p>
            </div>

          </div>
        </div>
  
        <div className="user-sub-banner">
          <div className="flex flex-row gap-10">

            <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 rounded-lg w-[80px] h-[30px]" style={{"visibility": editVisible}}>Edit Profile</button>
          </div>
        </div>

        <div className="user-tabs">
          <h2>Tweets</h2>
          <h2>Replies</h2>
          <h2>Likes</h2>
          <h2>Media</h2>
        </div>
        
        <TweetsIndex tweets={tweets}/>
  
      </div>
    )
  }
}