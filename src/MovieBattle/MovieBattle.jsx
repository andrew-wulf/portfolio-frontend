import { GameWindow } from './GameWindow';
import { Menu } from './Menu'
import './index.css'

import { useState } from 'react';


import io from "socket.io-client"



export function MovieBattle() {
  
  const [page, setPage] = useState(1);

  const startGame = () => {
    setPage(2);
  }
  
  const socket = io.connect("http://localhost:4000", {
    autoConnect: false
  });


  if (page === 1) {
    return (

      <Menu startGame={startGame} socket={socket}/>

    )
  }

  if (page === 2) {
    return (
      <GameWindow  socket={socket}/>
    )
  }
}