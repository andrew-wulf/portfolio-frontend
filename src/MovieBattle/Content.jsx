import { useState } from 'react';
import { GameWindow } from './GameWindow';
import { Intro } from './Intro';
import { Menu } from './Menu'



export function Content(props) {
  let name = props.name;
  let socket = props.socket;


  const [page, setPage] = useState(1);

  const startGame = () => {
    setPage(2);
  }
  


  if (name) {

    if (page === 1) {
      return (
  
        <Menu startGame={startGame} socket={socket} name={name} setRoomID={props.setRoomID} roomId={props.roomID}/>
  
      )
    }
  
    if (page === 2) {
      return (
        <GameWindow  socket={socket}/>
      )
    }
  }
  else {
    return (
      <Intro updateName={props.updateName}/>
    )
  }
}