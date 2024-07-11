import { GameWindow } from './GameWindow';
import { Menu } from './Menu'
import './index.css'

import { useState } from 'react';

export function MovieBattle() {


  
  const [page, setPage] = useState(1);

  const startGame = () => {
    setPage(2);
  }
  
  

  if (page === 1) {
    return (

      <Menu startGame={startGame}/>

    )
  }

  if (page === 2) {
    return (
      <GameWindow />
    )
  }
}