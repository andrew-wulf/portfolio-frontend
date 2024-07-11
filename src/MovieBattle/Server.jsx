


import { useState } from "react";

export function Conn() {

  const [users, setUsers] = useState([]);


  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    }
  });
  
  
  
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    setUsers(users.concat(socket.id))
  })

  
  server.listen(4000, () => {
    console.log('Server is Running!');
  })


  return (
    <div>

      <h5>Connected Users</h5>
      {
        users.map(user => {
          return (
          <p key={user}>id: {user}</p>
        )
        })
      }
    </div>
  )
  
}




