import { SignIn } from "./SignIn.js";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "./Redirect.js";
import {Home} from './Home.js'
import { TweetsIndex } from "./Tweets/TweetsIndex.js";
import { TweetView } from "./Tweets/TweetView.js";

export function Content(props) {
  let user = props.user;

  return (
    <div className="content">
      <Routes>
        <Route path="/" element= {<Redirect user={user} setUser={props.setUser}/>}/>
        <Route path="/signin" element={<SignIn user={user}/>}/>

        <Route path = "/home" element={<Home user={user}/>}/>

        <Route path = "tweet/:id" element={<TweetView/>}/>
      </Routes>
    </div>
  )
}