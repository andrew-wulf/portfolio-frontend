import { useState } from "react";
import { FaRetweet } from "react-icons/fa6";
import axios from 'axios'
import { RetweetModal } from "./RetweetModal";

export function RetweetButton(props) {
  let tweet = props.tweet;

  const [retweeted, setRetweeted] = useState(tweet.retweeted_by_user);
  const [count, setCount] = useState(tweet.retweets);

  const [modalVisible, setModalVisible] = useState(false);

  const modalShow = (e) => {
    e.stopPropagation(); 
    setModalVisible(true);
  }
  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalVisible(false);
  }

  const handleRetweet = () => {
    setRetweeted(!retweeted);
    toggle();

    if (retweeted) {
      setCount(count - 1);
    }
    else {
      setCount(count + 1);
    }
  }

  const toggle = () => {
    axios.post(`http://localhost:3000/tweets/${tweet.id}/retweet.json`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }


  if (retweeted) {
      return (
        <div className='tweet-retweet' onClick={modalShow}>
          <FaRetweet className="tweet-icon"/>
          <p>{count}</p>
          
          <RetweetModal show={modalVisible} onClose={handleModalClose} handleQuote={props.handleQuote} handleRetweet={handleRetweet} retweeted={retweeted}/>
        </div>
      );
    }

  else {
    return (
      <div className='tweet-no-retweet' onClick={modalShow}>
          <FaRetweet className="tweet-icon"/>
          <p>{count}</p>
          
          <RetweetModal show={modalVisible} onClose={handleModalClose} handleQuote={props.handleQuote} handleRetweet={handleRetweet} retweeted={retweeted}/>
        </div>
    )
  }
}