import { Container } from 'react-bootstrap';

import axios from 'axios';
import { useState, useEffect } from 'react';


import { TweetsIndex } from './TweetsIndex.jsx';
import { Loading } from '../Loading.jsx';


export function Timeline() {
  
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

  if (tweets.length > 0) {
    return (
      <Container>
        <Container style={{'maxWidth': '660px'}}>
          <TweetsIndex tweets={tweets}/>
        </Container>
      </Container>
    )
  }

  else {
    return (<Loading />)
  }
}