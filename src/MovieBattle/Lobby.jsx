import { Button, Container, Form, Stack } from "react-bootstrap";

import io from "socket.io-client";

export function Lobby() {



  const getID = () => {

  }

  return (
    <div className="movie-lobby">
      
      <Container>
        <Form.Label>Name</Form.Label>
        <Form.Control />
        
        <Button variant='dark'>Create Public Lobby</Button>
        <Button variant='dark'>Create Private Lobby</Button>
        <Stack>
          <Form.Group>
          
            <Form.Label>Lobby Code</Form.Label>
            <Form.Control />
          </Form.Group>
            <Button variant='success'>Connect</Button>
        </Stack>



        <br></br>

      </Container>


    </div>
  )
}


