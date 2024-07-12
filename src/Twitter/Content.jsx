
import { Route, Routes } from "react-router-dom";

import {Home} from './Home.jsx'

import { TweetView } from "./Tweets/TweetView.jsx";
import { UserPage } from "./UserPage.jsx";

import { Loading } from "./Loading.jsx";
import { LeftSidebar } from "./LeftSidebar.jsx";
import { RightSidebar } from "./RightSidebar.jsx";

export function Content(props) {
  let user = props.user;
  
  const scroll = (e) => {
    let doc = document.querySelector('.content');
    doc.scrollBy({
      top: e.deltaY,
      left: 0,
    });
  }

  return (
    <div className="content">
      
      <div onWheel={scroll}>
        <LeftSidebar user={props.user}/>
      </div>

      <div className="middle-container">
        <Routes>
    
          <Route path = "/home" element={<Home user={user}/>}/>

          <Route path = "/tweet/:id" element={<TweetView user={user}/>}/>
          
          <Route path = "/users/:name" element={<UserPage user={user}/>}/>

          <Route path = "/loading" element={<Loading/>}/>
        </Routes>
      </div>

      <div onWheel={scroll}>
        <RightSidebar />
      </div>

    </div>
  )
}