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
  
  let parents = props.parents;
  let view = props.view;
  let first = props.first;

  let avi = <div className="avi-container-regular">
              <Image src={tweet.avi} roundedCircle className='avi'/>
            </div>;

  if (parents) {
    if (first) {
      avi = <div className="avi-container">
                <Image src={tweet.avi} roundedCircle className='avi'/>
                <div className="avi-bottom-line"/>
              </div>;
    }
    else {
      if (view) {
        avi = <div className="avi-container">
                <div className="avi-top-line"/>
                <Image src={tweet.avi} roundedCircle className='avi'/>
              </div>;
      }
      else {
        avi = <div className="avi-container">
                <div className="avi-top-line"/>
                <Image src={tweet.avi} roundedCircle className='avi'/>
                <div className="avi-bottom-line"/>
              </div>;
      }
    }
  }

  let img = avi;
  let header = 

    <div className="tweet-header" onClick={(e) => {e.stopPropagation(); window.location.href = `/twitter/users/${tweet.username}`}}>
      <p className="user-display-name">{tweet.display_name}</p>
      <p className="user-username">@{tweet.username}</p>
      <p className="tweet-interpunct">&#183;</p>
      <p className="tweet-time">23h</p>
    </div>;

  if (view) {
    img = <></>;

    header =
    <div className="tweet-header" onClick={(e) => {e.stopPropagation(); window.location.href = `/twitter/users/${tweet.username}`}}>
      {avi}
      <div className="flex flex-col gap-0 mt-1">
        <p className="user-display-name">{tweet.display_name}</p>
        <p className="user-username">@{tweet.username}</p>
      </div>

    </div>;
  }

  let content = 
    
    <>
      {img}
      
      <div className="">


        {header}

        <div className="tweet-content">
          <TweetContent tweet={tweet}/>

        </div>


        <div className="tweet-footer">

          <div className="tweet-reply">
            <FaRegComment className="tweet-icon"/>
            <p>{tweet.replies}</p>
          </div>
        
          <div className="tweet-retweet">
            <FaRetweet className="tweet-icon"/>
            <p>{tweet.retweets}</p>
          </div>
        
          <LikeButton tweet={tweet}/>
        
          <div className="tweet-stats">
            <ImStatsBars className="tweet-icon"/>
            <p>23.4M</p>
          </div>


          <div className="flex flex-row">
            <div className="tweet-share">
              <FaArrowUpFromBracket className="tweet-icon share"/>
            </div>
          
            <div className="tweet-bookmark">
              <FaRegBookmark className="tweet-icon bookmark"/>
            </div>
          </div>
          
        </div>
      </div>
    
    </>
  
  let tweetClass = 'tweet'

  if (view) {tweetClass += '-view'} 
  if (parents) {tweetClass += '-parents'}
  //console.log(tweetClass)
   return (

    <div className={tweetClass} onClick={() => {window.location.href = `/twitter/tweet/${tweet.id}`}}>
      {content}
    </div>

  )
}