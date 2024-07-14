import { Container } from 'react-bootstrap';

import axios from 'axios';
import { useState, useEffect } from 'react';


import { TweetsIndex } from './TweetsIndex.jsx';
import { Loading } from '../Loading.jsx';
import { NewTweet } from './NewTweet.jsx';


export function Timeline(props) {
  let user = props.user;

  const [tweets, setTweets] = useState([]);

  const getUserTimeline = () => {
    axios.get('http://localhost:3000/tweets/timeline.json')
      .then(response => {
        console.log(response);
        setTweets(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  useEffect(getUserTimeline, []);

  const handleSubmit = (id) => {
    window.location.href = `/twitter/tweet/${id}`
  }

  if (tweets.length > 0) {
    return (
      <div>
        <div className='timeline-new-tweet'>
          <NewTweet user={user} onSubmit={handleSubmit} minHeight={40}/>
        </div>

        <div>
          <TweetsIndex tweets={tweets}/>
        </div>
      </div>
    )
  }

  else {
    return (<Loading />)
  }
}