import { Container, Row, Col, Stack, Image } from "react-bootstrap"
import { TweetContent } from "./TweetContent";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRetweet } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { LikeButton } from "./LikeButton";

export function Tweet(props) {
  let tweet = props.tweet;


   return (

    <Container className='tweet' onClick={() => {window.location.href = `/twitter/tweet/${tweet.id}`}}>
      
      <Image src={tweet.avi} roundedCircle className='avi'/>

      <Container>

        <Row>
          <Col>
            <Stack className="tweet-header" direction='horizontal' gap={1} onClick={(e) => {e.stopPropagation(); window.location.href = `/twitter/users/${tweet.username}`}}>
              <p className="user-display-name">{tweet.display_name}</p>
              <p className="user-username">@{tweet.username}</p>
              <p className="tweet-interpunct">&#183;</p>
              <p className="tweet-time">23h</p>
            </Stack>
          </Col>
        </Row>

        <div className="tweet-content">
          <TweetContent tweet={tweet}/>
        </div>
        

        <Row className="tweet-footer">
          <Col xs={2}>
            <Stack direction="horizontal" gap={2}>
              <FaRegComment className="tweet-reply"/>
              {tweet.replies}
            </Stack>
          </Col>

          <Col xs={2}>
            <Stack direction="horizontal" gap={2}>
              <FaRetweet className="tweet-retweet"/>
              {tweet.retweets}
            </Stack>
          </Col>

          <Col xs={3}>
            <LikeButton tweet={tweet}/>
          </Col>

          <Col xs={2}>
            <Stack direction="horizontal" gap={2}>
              <ImStatsBars className="tweet-stats"/>
              23.4M
            </Stack>
          </Col>
          <Col xs={2}/>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <FaArrowUpFromBracket className="tweet-bookmark"/>
              <FaRegBookmark/>
            </Stack>
          </Col>
        </Row>
      </Container>

    </Container>
  )
}