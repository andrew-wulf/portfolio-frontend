
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { Stack } from "react-bootstrap";

export function LikeButton(props) {
  const [liked, setLiked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  }

  let tweet = props.tweet;
  let user = props.user;

  if (liked) {
      return (
        <Stack direction="horizontal" gap={1} onClick={handleClick}>
          <IoMdHeart className="tweet-like"/>
          {tweet.likes}

        </Stack>
      );
    }

  else {
    return (
      <Stack direction="horizontal" gap={1} onClick={handleClick}>
        <IoMdHeartEmpty className="tweet-unlike"/>
        {tweet.likes}
      </Stack>
    )
  }
}
  