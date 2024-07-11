import { Button, Container, Form, Stack } from "react-bootstrap";

import { Socket } from "socket.io-client";

export function Lobby() {
  return (
    <div className="movie-lobby">
      
      <Container>
        <Button variant='dark'>Create Game Lobby</Button>
        <Stack>
          <Form.Group>
            <Form.Label>Lobby Code</Form.Label>
            <Form.Control />
          </Form.Group>
            <Button variant='success'>Connect</Button>
        </Stack>



        <br></br>
        <h4>For Testing:</h4>

        <h5>User 1:</h5>
        <h5>User 2:</h5>


      </Container>


    </div>
  )
}


