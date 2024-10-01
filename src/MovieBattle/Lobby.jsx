import { Button, Container, Form, Stack } from "react-bootstrap";


export function Lobby(props) {

  let lobbies = props.lobbies;
  let socket = props.socket;


  const createLobby = () => {
    socket.emit('create_lobby');
  }

  return (
    <div className="movie-lobby">

      <div className="lobbies">
        <h2>Lobbies</h2>
        <p>{lobbies}</p>

      </div>
      
      <div className="lobbies-footer">
        <Button  onClick={createLobby} variant='dark'>Create Public Lobby</Button>
        <Button variant='dark'>Create Private Lobby</Button>
        <Stack>
          <Form.Group>
          
            <Form.Label>Lobby Code</Form.Label>
            <Form.Control />
          </Form.Group>
            <Button variant='success'>Connect</Button>
        </Stack>


        <br></br>

      </div>


    </div>
  )
}


