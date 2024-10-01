import './index.css'
import io from "socket.io-client"

import { Content } from './Content';


import { useEffect, useState } from 'react';


const socket = io.connect("http://localhost:4000", {
  autoConnect: false
});


export function MovieBattle() {
  
  const [name, setName] = useState(null);
  const [socketID, setSocketID] = useState(null);
  const [roomID, setRoomID] = useState(null);


  const connect = () => {
    socket.connect();
  }
  useEffect(connect, []);


  const updateName = (name) => {
    setName(name);
    socket.emit('update_name', name);
    socket.emit('get_info')
  }

  useEffect(() => {
    socket.on("get_id", (id) => {
      setSocketID(id);
    })
  }, [socket])

  return (
    <div className='movie-content'>
      <div className='name-header'>
        <h5>Name: {name}</h5>
        <h5>Socket: {socketID}</h5>
      </div>
      <Content name={name} updateName={updateName} socket={socket} setRoomID={setRoomID} roomId={roomID}/>
    </div>
  )
  
}