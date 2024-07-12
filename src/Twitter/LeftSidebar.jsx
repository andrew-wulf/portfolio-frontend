import axios from 'axios'
import './css/header.css'

import {Container, Row, Col, Stack, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";
import { FaRegBookmark } from 'react-icons/fa6';
import { FaBookmark } from "react-icons/fa";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";

import { CiLock } from "react-icons/ci";
import { useState, useEffect, useRef } from 'react';



export function LeftSidebar(props) {

  const [accountModalVisible, setAccountModalVisible] = useState('hidden');

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toggleStyle, setToggleStyle] = useState({transform: 'translate(0, 0)'});
  const [lightVal, setLightVal] = useState('0%');
  const [darkVal, setDarkVal] = useState('0%');

  const checkboxRef = useRef(null);
  const [checked, setChecked] = useState(false); 

  useEffect(() => {
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');
    setIsDarkMode(!isDarkMode);
  };

  const toggle = (e) => {
    toggleDarkMode();
    setChecked(e.target.checked);

    if (e.target.checked) {
      setLightVal('100%');
      setDarkVal('0%');
    }
    else {
      setLightVal('0%');
      setDarkVal('100%');
    }
  }

  const toggleAccountModal = () => {
    if (accountModalVisible === 'visible') {
      setAccountModalVisible('hidden')
    }
    else {
      setAccountModalVisible('visible')
    }
  }

  const signOut = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/twitter/home"
  }



  let user = props.user;
  console.log(user);

  let avi = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
  if (user.avi && user.avi.length > 5) {avi = user.avi}


  return (
  
  <div className='left-sidebar'>
    <div className='left-sidebar-content'>

      <div className=' justify-self-center place-content-center' >
        <Navbar.Brand href="/home"><Image src="/twitter_logo.png" width="35px"/></Navbar.Brand>
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <FaHome/>
        <div className='header-option-text'>
          <h5>Home</h5>
        </div>
    
      </div>
      
      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <FaSearch/>
        <div className='header-option-text'>
          <h5>Explore</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <FaBell/>
        <div className='header-option-text'>
          <h5>Notifications</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <FaEnvelope/>
        <div className='header-option-text'>
          <h5>Messages</h5>
        </div>
    
      </div>

      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <FaBookmark/>
        <div className='header-option-text'>
          <h5>Bookmarks</h5>
        </div>
    
      </div>
      
      <div direction='horizontal' className='header-option' onClick={
        () => {window.location.href= "/twitter/home"}}>
        <IoPersonSharp/>
        <div className='header-option-text'>
          <h5>Profile</h5>
        </div>
    
      </div>
      

      
      <button className='header-tweet '>
        <RiQuillPenFill/>
        <div className='header-tweet-label'>
          <h5>Tweet</h5>
        </div>
      </button>
      
      

      <div className='header-account' onClick={toggleAccountModal}>
        <div className='flex gap-3 place-items-center'>
          <Image src={avi} roundedCircle className='avi-header' />

          <div className='header-account-details'>
            <h6>{user.display_name}</h6>
            <p>{user.username}</p>
            
          </div>
        </div>
      </div>
      
      <div className='account-modal' style={{visibility: accountModalVisible}}>
        <ListGroup>
          <ListGroupItem>Account</ListGroupItem>
          <ListGroupItem onClick={signOut}>Sign Out</ListGroupItem>
        </ListGroup>
      </div>

      <NavDropdown className='header-profile-dropdown'>
        <NavDropdown.Item onClick={() => {window.location.href = `/twitter/users/${user.username}`}}>View Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
        <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
        
      <div onClick={toggle} className='theme-toggle'>
        <input type='checkbox' ref={checkboxRef}/>
        <span className="theme-slider" style={toggleStyle}/>
        <p style={{opacity: lightVal}}>Light</p>
        <p style={{opacity: darkVal}}>Dark</p>
      </div>

    </div>
  </div>
  )
}