import { useState } from "react";
import { Button } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap"
import { Stack } from "react-bootstrap";
import {Image} from "react-bootstrap";

import { BiCameraMovie } from "react-icons/bi";

export function Home() {
  let link = "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [style, setStyle] = useState({});


  const shift = () => {
    setStyle({'transform': 'translateY(-50%)'})
  }
  

  return (
    <div className="portfolio-home">
    
      <Container fluid className="port-container">
        <Row>
          <h1>My Portfolio.</h1>
        </Row>

        <Row><div className="spacer"></div></Row>

        <Row>
          <div className="portfolio-cats">
            <Col xs={2}>
              <h2 onClick={shift}>Apps</h2>
            </Col>
            <Col xs={4}/>
            <Col xs={2}>
              <h2 onClick={shift}>Games</h2>
            </Col>
          </div>
        </Row>

        <Row>
        <Col xs={1}/>
          <Col xs={4}>
            <div className="portfolio-apps">
              <Stack direction="horizontal" gap={5}>
                <Stack>
                  <Container className="port-img-container">
                    <img src={'assets/twitter.png'} onClick={() => {window.location.href = "/twitter"}}/>
                  </Container>
                  <h1>Twitter</h1>
                </Stack>
                <Stack>
                  <Container className="port-img-container">
                    <img src={link}/>
                  </Container>
                  <h1>Kickstarter</h1>
                </Stack>
              </Stack>
            </div>
          </Col>

          <Col xs={2}/>

          <Col xs={4}>
            <div className="portfolio-games">
              <Stack direction="horizontal">
                <Stack>
                  <Container className="port-img-container">
                    <img src={'assets/chess.png'} onClick={() => {window.location.href = "/chess"}}/>
                  </Container>
                  <h1>Chess</h1>
                </Stack>
                <Stack>
                  <Container className="port-img-container">
                    <img src={link}/>
                  </Container>
                  <h1>Movie Battle</h1>
                </Stack>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
    
    

    </div>
  )
}