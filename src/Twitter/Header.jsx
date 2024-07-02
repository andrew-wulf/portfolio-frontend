import axios from 'axios'
import './css/header.css'

import {Container, Row, Col, Stack, Image} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";
import { CiLock } from "react-icons/ci";



export function Header(props) {
  let user = props.user;
  console.log(user);

  const signOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/twitter/home"
  }

  if (user === "" || user === undefined) {
    return (
      <Navbar expand="lg" className="bg-body-secondary" style={{'height': '50px'}}>
      <Container>
        <Col xs={4}>
          <Stack direction='horizontal' gap={4}>

            <Stack direction='horizontal' gap={2} className='header-option' onClick={
              () => {window.location.href = "/twitter/home"}}>
              <FaHome/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link>Home</Nav.Link>
              </Navbar.Collapse>
            </Stack>
          </Stack>
        </Col>
        <Col xs={4}>
          <Navbar.Brand href="/home"><Image src="/twitter_logo.png" height="30px"/></Navbar.Brand>
        </Col>

        <Col xs={6}>
          <Stack direction='horizontal' gap={4}>
            <Form >
            <Form.Control
              type="text"
              placeholder="Search Twitter"
              className=" mr-sm-2"
            />
            </Form>
            <Button onClick={() => {window.location.href="/twitter/signin"}}> <CiLock/>Sign up</Button>
          </Stack>
        </Col>

      </Container>
    </Navbar>
    )
  }
  else {

    let avi = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
    if (user.avi && user.avi.length > 5) {avi = user.avi}

    return (
    <Navbar expand="lg" className="bg-body-secondary" style={{'height': '50px'}}>
      <Container>
        <Col xs={'100px'} lg={'400px'}>
          <Stack direction='horizontal' gap={4}>

            <Stack direction='horizontal' gap={2} className='header-option' onClick={
              () => {window.location.href= "/twitter/home"}}>
              <FaHome/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link>Home</Nav.Link>
              </Navbar.Collapse>
            </Stack>
 
            <Stack direction='horizontal' gap={2} className='header-option' onClick={
              () => {window.location.href= "/twitter/home"}}>
              <FaBell/>
              <Navbar.Collapse>
                <Nav.Link>Notifications</Nav.Link>
              </Navbar.Collapse>
            </Stack>

            <Stack direction='horizontal' gap={2} className='header-option' onClick={
              () => {window.location.href= "/twitter/home"}}>
              <FaEnvelope/>
              <Navbar.Collapse>
                <Nav.Link>Messages</Nav.Link>
              </Navbar.Collapse>
            </Stack>
          </Stack>
        </Col>
        <Col xs={1}>
          <Navbar.Brand href="/home"><Image src="/twitter_logo.png" width="40px"/></Navbar.Brand>
        </Col>

        <Col xs={'300px'} lg={'500px'}>
          <Stack direction='horizontal' gap={4}>
            <Form >
            <Form.Control
              type="text"
              placeholder="Search Twitter"
              className=" mr-sm-2"
              style={{'borderRadius': '25px'}}
            />

            </Form>
              <Image src={avi} roundedCircle className='avi-header' />
            <NavDropdown title={user.username} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => {window.location.href = `/twitter/users/${user.username}`}}>View Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
              <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
            </NavDropdown>
          
              
        
            <Button><RiQuillPenFill/>Tweet</Button>
          </Stack>
        </Col>

      </Container>
    </Navbar>
    )
  }
}