import axios from 'axios'
import './css/header.css'

import {Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';


import { FaHome } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { RiQuillPenFill } from "react-icons/ri";

import { FaBookmark } from "react-icons/fa";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";

import { useState, useEffect } from 'react';

import { FaRegMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";


export function LeftSidebar(props) {

  const [accountModalVisible, setAccountModalVisible] = useState('hidden');

  const [toggleStyle, setToggleStyle] = useState({transform: 'translate(0, 0)'});
  const [sunVal, setSunVal] = useState(0);
  const [moonVal, setMoonVal] = useState(0);

  let theme = props.theme;



  const updateTheme = () => {
    if (theme === 'light') {
      setToggleStyle({transform: 'translate(200%, 0)'});
      setSunVal(100);
      setMoonVal(0);
    }
    else {
      setToggleStyle({transform: 'translate(0%, 0)'});
      setSunVal(0);
      setMoonVal(100);
    }
  }
  useEffect(updateTheme, [theme]);

  const toggle = () => {
    props.themeToggle();
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
      

      
      <button className='header-tweet ' onClick={props.toggleTweetModal}>
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
      
      <NavDropdown className='header-profile-dropdown'>
        <NavDropdown.Item onClick={() => {window.location.href = `/twitter/users/${user.username}`}}>View Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
        <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
        
      <div onClick={toggle} className='theme-toggle'>
        <FaSun style={{opacity: `${sunVal}%`}}/>
        <FaRegMoon style={{opacity: `${moonVal}%`}}/>
        <span className="theme-slider" style={toggleStyle}>
        </span>
      </div>


      <div className='account-modal' style={{visibility: accountModalVisible}}>
        <ListGroup>
          <ListGroupItem>Account</ListGroupItem>
          <ListGroupItem onClick={signOut}>Sign Out</ListGroupItem>
        </ListGroup>
      </div>

    </div>
  </div>
  )
}