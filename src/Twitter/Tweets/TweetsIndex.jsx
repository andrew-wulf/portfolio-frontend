import { Tweet } from "./Tweet";
import { QuoteTweet } from "./QuoteTweet";

import { Container, Stack, Col, Row } from "react-bootstrap";

export function TweetsIndex(props) {
  let tweets = props.tweets;
  console.log('tweets: ', tweets)

  if (tweets && tweets.length > 0) {
    return (
            <div className="flex flex-col">
              {
                tweets.map((tweet, i) => {
                  return (
                    <div key={i}>
                      <Tweet tweet={tweet}/>
                    </div>
                  )
                })
              }
            </div>
    )
  }
}