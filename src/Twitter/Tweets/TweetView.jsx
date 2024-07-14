import { useState, useEffect } from "react";
import axios from "axios";

import { Tweet } from "./Tweet";
import { TweetsIndex } from "./TweetsIndex";

import { Container, Row, Col } from "react-bootstrap";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NewTweet } from "./NewTweet";

export function TweetView(props) {
  let user = props.user;

  const [tweet, setTweet] = useState({});

  const getTweet = () => {
    let url = window.location.href;
    let x = url.lastIndexOf("/");
    let id = url.substring(x + 1, url.length);
  
    axios.get(`http://localhost:3000/tweets/${id}.json`)
    .then(response => {
      console.log(response);
      setTweet(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  useEffect(getTweet, []);

  let navigate = useNavigate();

  const handleSubmit = (id) => {
    window.location.href = `/twitter/tweet/${id}`
  }

  if (tweet) {
    let subtweets = <></>;

    if (tweet.subtweets && tweet.subtweets.length > 0) {
      subtweets = <TweetsIndex tweets={tweet.subtweets}/>;
    }

    return (
      <div className="tweet-view">
          <div className="flex flex-row gap-10 h-10 pl-3 place-items-center">
            <div onClick={() => {navigate(-1)}} className=" w-8 h-8 rounded-2xl hover:cursor-pointer hover:shadow-black hover:bg-gray-300 flex align-items-center justify-content-center">
              <FaArrowLeft />
            </div>
            <h4>Post</h4>
          </div>
          
          <div className="big-tweet">
            <Tweet tweet={tweet}/>
          </div>

          <div className="tweet-view-new-tweet">
            <NewTweet user={user} onSubmit={handleSubmit} minHeight={40} placeholder={'Post your reply'} tweetID={tweet.id}/>
          </div>
    
          {subtweets}
      </div>
    )
  }
}