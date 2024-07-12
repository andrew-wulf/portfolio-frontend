
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { Stack } from "react-bootstrap";

import axios from 'axios'

export function LikeButton(props) {
  let tweet = props.tweet;

  const [liked, setLiked] = useState(tweet.liked_by_user);
  const [count, setCount] = useState(tweet.likes);

  const handleClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
    likeToggle();

    if (liked) {setCount(count - 1)}
    else {setCount(count + 1)}
  }

  const likeToggle = () => {
    axios.post(`http://localhost:3000/tweets/${tweet.id}/like.json`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
  

  if (liked) {
      return (
        <Stack className="tweet-like" direction="horizontal" gap={1} onClick={handleClick}>
          <IoMdHeart className="tweet-icon"/>
          <p className="tweet-like-count">{count}</p>

        </Stack>
      );
    }

  else {
    return (
      <Stack className="tweet-unlike" direction="horizontal" gap={1} onClick={handleClick}>
        <IoMdHeartEmpty className="tweet-icon"/>
        <p className="tweet-like-count">{count}</p>
      </Stack>
    )
  }
}
  