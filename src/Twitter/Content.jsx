
import { Route, Routes } from "react-router-dom";

import {Home} from './Home.jsx'

import { TweetView } from "./Tweets/TweetView.jsx";
import {TweetModal} from "./Tweets/TweetModal.jsx";
import { UserPage } from "./UserPage.jsx";

import { Loading } from "./Loading.jsx";
import { LeftSidebar } from "./LeftSidebar.jsx";
import { RightSidebar } from "./RightSidebar.jsx";
import { useState } from "react";

export function Content(props) {
  let user = props.user;
  
  const scroll = (e) => {
    let doc = document.querySelector('.content');
    doc.scrollBy({
      top: e.deltaY,
      left: 0,
    });
  }


  const [tweetModalVisible, setTweetModalVisible] = useState(false);
  
  const toggleTweetModal = () => {
    setTweetModalVisible(!tweetModalVisible)
  }

  const handleScroll = () => {
    let tweets = document.getElementsByClassName('tweets-index')[0];
    let content = document.getElementsByClassName('content')[0]
    if (tweets) {
      console.log(tweets.scrollHeight)
      console.log(content.scrollTop)
    }
  }


  return (
    <div className="content">
      
      <div onWheel={scroll}>
        <LeftSidebar user={props.user} toggleTweetModal={toggleTweetModal} theme={props.theme} themeToggle={props.themeToggle}/>
      </div>


      <div className="middle-container">
        <Routes>
    
          <Route path = "/home" element={<Home user={user}/>}/>

          <Route path = "/tweet/:id" element={<TweetView user={user}/>}/>
          
          <Route path = "/users/:name" element={<UserPage user={user}/>}/>

          <Route path = "/loading" element={<Loading/>}/>
        </Routes>

        <div className="extra-space"/>
      </div>
    

      <div onWheel={scroll}>
        <RightSidebar />
      </div>
      
      <TweetModal show={tweetModalVisible} onClose={toggleTweetModal} user={user}/>

    </div>
  )
}