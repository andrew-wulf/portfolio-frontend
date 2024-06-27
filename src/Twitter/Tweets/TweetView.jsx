import { useState, useEffect } from "react";
import axios from "axios";

import { Tweet } from "./Tweet";
import { TweetsIndex } from "./TweetsIndex";

import { Container, Row, Col } from "react-bootstrap";

export function TweetView() {
  
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

  if (tweet) {
    if (tweet.subtweets && tweet.subtweets.length > 0) {
      return (
        <Container>
          <Row>
            <Container style={{"maxWidth": "720px"}}>
              <Tweet tweet={tweet}/>
            </Container>
          </Row>
          <Row>
            <Container style={{"maxWidth": "660px"}}>
              <TweetsIndex tweets={tweet.subtweets}/>
            </Container>
          </Row>
        </Container>
      )
    }
    else {
      return (
        <Tweet tweet={tweet}/>
      )
    }
  }
}