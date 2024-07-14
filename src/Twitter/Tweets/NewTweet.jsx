import { useEffect, useState } from "react";

import { IoImageOutline } from "react-icons/io5";
import { FaRegFaceSmileBeam } from "react-icons/fa6";

import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';

export function NewTweet(props) {

  let user = props.user;
  let minHeight = props.minHeight;
  let tweetID = props.tweetID;

  let placeholder = "What is happening?!";
  if (props.placeholder) {
    placeholder = props.placeholder;
  }

 

  const [inputVal, setInputVal] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();


    e.target.style.height = '0';
    e.target.style.height = Math.max(minHeight, e.target.scrollHeight) + 'px';

    let text = e.target.value;

    if (text.length < 281) {
      setInputVal(text);
    }
    
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tweetID) {
      axios.post('http://localhost:3000/tweets/subtweet.json', {text: inputVal, tweet_id: tweetID})
          .then(response => {
            console.log(response);
            setInputVal("");
  
            if (props.onSubmit) {
              props.onSubmit(response.data.id);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }

    else {
      axios.post('http://localhost:3000/tweets/new.json', {text: inputVal})
          .then(response => {
            console.log(response);
            setInputVal("");
  
            if (props.onSubmit) {
              props.onSubmit(response.data.id);
            }
          })
          .catch(error => {
            console.log(error);
          });
    }
  }

  return (
    <div className="new-tweet">
      <div className="new-tweet-main">
        <img src={user.avi} className="avi"/>

        <div>
          <form id='tweetNew' onSubmit={handleSubmit}>

            <textarea className="new-tweet-input" type='textarea' placeholder={placeholder} autoFocus={true} value={inputVal}
            onChange={handleUpdate} />
            
          </form>
        </div>
      </div>

      <div className="new-tweet-footer">

        <div className="new-tweet-icon"><IoImageOutline/></div>
        <div className="new-tweet-icon"><FaRegFaceSmileBeam/></div>
        <button type='submit' form='tweetNew' className="post-button">Post</button>
      </div>
    </div>
  )
}