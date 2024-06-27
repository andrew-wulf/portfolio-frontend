import { SignIn } from "./SignIn.jsx";
import { Route, Routes } from "react-router-dom";
import { Redirect } from "./Redirect.jsx";
import {Home} from './Home.jsx'
import { TweetsIndex } from "./Tweets/TweetsIndex.jsx";
import { TweetView } from "./Tweets/TweetView.jsx";
import { UserPage } from "./UserPage.jsx";

export function Content(props) {
  let user = props.user;

  return (
    <div className="content">
      <Routes>
        <Route path = "/" element= {<Redirect user={user} setUser={props.setUser}/>}/>
        <Route path = "/signin" element={<SignIn user={user}/>}/>

        <Route path = "/home" element={<Home user={user}/>}/>

        <Route path = "/tweet/:id" element={<TweetView user={user}/>}/>
        
        <Route path = "/users/:name" element={<UserPage user={user}/>}/>
      </Routes>
     
    </div>
  )
}