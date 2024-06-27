import Form from 'react-bootstrap/Form';

import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function SignIn(props) {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new FormData(e.target);
    login(params);
  }

  const login = (params) => {
    axios.post('http://localhost:3000/sessions.json', params)
      .then(response => {
        console.log(response);
        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
        localStorage.setItem("jwt", response.data.jwt);
        //navigate(-1);
        window.location.href = '/twitter/home'
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  if (props.user === "") {
    
    return (
      <Container fluid>
        <Row>
          <Col xs={2} lg={3}/>
  
          <Col xs={8} lg={6}>
            <Container fluid className="sign-in">
              <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
                  <h1 style={{'textAlign': 'center', 'marginBottom': '3vh'}}>Sign in</h1>
                </Col>
              </Row>
              
              <Row>
                <Col xs={3}></Col>
                <Col xs={6}>
              
                  <Form onSubmit={handleSubmit} style={{'display': 'flex', 'flexDirection': 'column'}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" name="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="password" placeholder="Password"/>
                    </Form.Group>
              
                    <Button variant="primary" type="submit" style={{'marginTop': '2vh'}}>
                      Submit
                    </Button>
                  
                  </Form>
                </Col>
              </Row>
            </Container>
          
          </Col>
        </Row>
  
      </Container>
    )
  }
  else {
    window.location.href = "/twitter/home"
  }
}
