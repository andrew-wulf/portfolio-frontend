import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap"
import { Stack } from "react-bootstrap";
import {Image} from "react-bootstrap";

import { BiCameraMovie } from "react-icons/bi";

import { FaChevronLeft, FaChevronRight, FaCircleChevronLeft, FaGithub, FaMapPin } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

import reactIcon from '../assets/react.svg'
import jsIcon from '../assets/nodejs.svg'
import htmlIcon from '../assets/html5.svg'
import cssIcon from '../assets/css.svg'
import pythonIcon from '../assets/python.svg'
import railsIcon from '../assets/rails.svg'
import sqlIcon from '../assets/sql.svg'
import rubygemsIcon from '../assets/rubygems.svg'
import djangoIcon from '../assets/django.svg'
import postgresqlIcon from '../assets/postgresql.svg'
import { GrGallery } from "react-icons/gr";
import { PortModal } from "./PortModal";
import { Modal } from "./Modal";


export function Home() {
  let link = "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [percent, setPercent] = useState(0);

  const [opacity ,setOpacity] = useState(0);

  const [infoStyles, setInfoStyles] = useState([100, 100, 100, 100]);

  const [appsTranslate, setAppsTranslate] = useState([0, 200]);
  const [headerTranslate, setHeaderTranslate] = useState([0, -100]);
  const [cvTranslate, setCvTranslate] = useState([800, 0]);
  const [bioTranslate, setBioTranslate] = useState([-500, 0]);
  const [leftSubTranslate, setLeftSubTranslate] = useState([-350, 0]);
  const [rightSubTranslate, setRightSubTranslate] = useState([350, 0]);

  const [appsDelay, setAppsDelay] = useState([2, 2.15]);
  const [headerDelay, setHeaderDelay] = useState([1, 0.25]);
  const [cvDelay, setCvDelay] = useState([1.25, 1.25]);
  const [bioDelay, setBioDelay] = useState([2, 0.9]);
  const [leftSubDelay, setLeftSubDelay] = useState([0.5, 1]);
  const [rightSubDelay, setRightSubDelay] = useState([0.5, 0.75]);


  const [iconStyle, setIconStyle] = useState({'opacity': '0%', 'transition': '3s', 'transitionDelay': '4s'})

  const [twitterIndex, setTwitterIndex] = useState(1);
  const [chessIndex, setChessIndex] = useState(1);
  const [movieIndex, setMovieIndex] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState([]);


  const [gitModalShow, setGitModalShow] = useState(false);


  useEffect(() => {
    setOpacity(100);
    setHeaderTranslate([0, 4]);
    setAppsTranslate([0, 0]);
    setCvTranslate([0, 0]);
    setBioTranslate([-50, 0]);
    setLeftSubTranslate([0, 0]);
    setRightSubTranslate([0, 0]);

    setIconStyle({'opacity': '100%', 'transition': '3s', 'transitionDelay': '4s'});

    setTimeout(() => {
      setAppsDelay([0.5, 0]);
      setHeaderDelay([0.5, 0]);
      setCvDelay([0.5, 0]);
      setBioDelay([0.5, 0]);
      setLeftSubDelay([0.5, 0]);
      setRightSubDelay([0.5, 0]);
      setIconStyle({'opacity': '100%', 'transition': '0.25s', 'transitionDelay': '0s'}), 8000
    })
  }, []);



  const handleVisit = (i) => {
    let addresses = ['/twitter', '/moviebattle', '/chess', ''];
    let dest = addresses[i];

    if (dest !== '') {
      window.location.href = dest;
    }
  }

  const cvDownload = () => {
    window.location.href = "http://localhost:5173//src/assets/example-resume.docx"
  }

  const repoLink = () => {
    window.location.href = 'https://github.com/andrew-wulf/portfolio-frontend'
  }

  let trans = `${appsTranslate[0]}%, ${appsTranslate[1]}%`;
  let headerTrans = `${headerTranslate[0]}%, ${headerTranslate[1]}%`;
  let cvTrans = `${cvTranslate[0]}%, ${cvTranslate[1]}%`;
  let bioTrans = `${bioTranslate[0]}%, ${bioTranslate[1]}%`;
  let leftSubTrans = `${leftSubTranslate[0]}%, ${leftSubTranslate[1]}%`;
  let rightSubTrans = `${rightSubTranslate[0]}%, ${rightSubTranslate[1]}%`;


  const indexChange = (type, direction) => {
    if (type === 'twitter') {
      let index = twitterIndex + direction;
    
      if (index > 5) {
        index = 1;
      }
      if (index < 1) {
        index = 5;
      }

      setTwitterIndex(index);
    }

    if (type === 'chess') {
      let index = chessIndex + direction;
    
      if (index > 2) {
        index = 1;
      }
      if (index < 1) {
        index = 2;
      }
      setChessIndex(index);
    }

  }

  const modalShow = (type) => {
    if (type === 'twitter') {
      setSelectedImgs(twitterImgs);
      setSelectedDescriptions(twitterDescriptions);
    }
    if (type === 'chess') {
      setSelectedImgs(chessImgs);
      setSelectedDescriptions(chessDescriptions);
    }
    if (type === 'movie') {
      setSelectedImgs(movieImgs);
      setSelectedDescriptions(movieDescriptions);
    }
    setModalVisible(true);
  }

  const modalClose = () => {
    setModalVisible(false);
  }


  const showGitModal = () => {
    setGitModalShow(true);
  }

  const closeGitModal = () => {
    setGitModalShow(false);
  }


  let twitterImgs = ['./assets/twitter1.png', './assets/twitter2.png', './assets/twitter3.png', './assets/twitter4.png', './assets/twitter5.png']
  let twitterDescriptions = ['The "Timeline", which loads the most recent tweets & retweets from accounts you follow.', "Viewable user profiles with bios, banners, and the tweets they've made or interacted with.", 'Toggleable light & dark modes (your browser remembers your preference).', 'Accessing your account requires user authentication, and new users can be created.', 'App is styled for viewing on all devices, including mobile.']

  let chessImgs = ['./assets/chess1.png', './assets/chess2.png']
  let chessDescriptions = ['Play a full game of chess, dragging or clicking pieces to move them. Only legal moves allowed!', 'The game will detect checkmates & stalemates, resulting in a game over screen.']

  let movieImgs = ['movie_battle.png']
  let movieDescriptions = ['Coming Soon!']

  return (
    <div className="portfolio-home">
    

      <div className="port-content">

        <div className="port-headers" style={{'transform': `translate(${headerTrans})`, transition: `${headerDelay[0]}s`, transitionDelay: `${headerDelay[1]}s`}}>
          <h2 className="port-title" style={{'opacity': `100%`}}>Andrew Wulf</h2>

          <div className="port-subtitles">
            <h2 style={{'transform': `translate(${leftSubTrans})`, transition: `${rightSubDelay[0]}s`, transitionDelay: `${rightSubDelay[1]}s`}}>Full-Stack Developer</h2>
            <div className="port-location" style={{'transform': `translate(${rightSubTrans})`, transition: `${leftSubDelay[0]}s`, transitionDelay: `${leftSubDelay[1]}s`}}>
              <h2>Chicago, IL</h2>
              <div className="map-pin"><FaMapPin/></div>
            </div>
          </div>
        </div>

        <button className="cv-download" style={{'transform': `translate(${cvTrans})`, transition: `${cvDelay[0]}s`, transitionDelay: `${cvDelay[1]}s`}} onClick={cvDownload}>Download my CV!</button>
        

          <div className="port-icon-track" style={iconStyle}>
            <div className="port-icon-tray left" >
              <img className='port-icon' src={reactIcon}/>
              <img className='port-icon' src={jsIcon}/>
              <img className='port-icon' src={htmlIcon}/>
              <img className='port-icon' src={cssIcon}/>
              <img className='port-icon' src={pythonIcon}/>
              <img className='port-icon' src={railsIcon}/>
              <img className='port-icon' src={sqlIcon}/>
              <img className='port-icon' src={rubygemsIcon}/>
              <img className='port-icon' src={djangoIcon}/>
              <img className='port-icon' src={postgresqlIcon}/>

            </div>

            <div className="port-icon-tray right" >
              <img className='port-icon' src={reactIcon}/>
              <img className='port-icon' src={jsIcon}/>
              <img className='port-icon' src={htmlIcon}/>
              <img className='port-icon' src={cssIcon}/>
              <img className='port-icon' src={pythonIcon}/>
              <img className='port-icon' src={railsIcon}/>
              <img className='port-icon' src={sqlIcon}/>
              <img className='port-icon' src={rubygemsIcon}/>
              <img className='port-icon' src={djangoIcon}/>
              <img className='port-icon' src={postgresqlIcon}/>

            </div>
          </div>


        <div className="port-bio" style={{'transform': `translate(${bioTrans})`, transition: `${bioDelay[0]}s`, transitionDelay: `${bioDelay[1]}s`}}>
          <p>
            I'm a versatile software engineering professional offering expertise in back end and front end web development.
          </p>
          <p> To learn more about what I've been working on, check out my projects below!
          </p>
        </div>



        <div className="track-container" style={{'opacity': `100%`, 'transform': `translate(${trans})`, transition: `${appsDelay[0]}s`, transitionDelay: `${appsDelay[1]}s`}}>

          <div className="img-track" style={{'transform': `translate(${percent}%)`}} >

            <div className="port-spacer"/>
            
            <div className="port-container" id="blur-1" onClick={() => {handleVisit(0)}}>
              <div className="port-img-container">
                <img src={`assets/twitter${twitterIndex}.png`} draggable='false'/>
                <h3 onClick={(e) => {e.stopPropagation(); modalShow('twitter')}}> <GrGallery/> Gallery</h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('twitter', -1)}} className="left"><FaChevronLeft/></h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('twitter', 1)}} className="right"><FaChevronRight/></h3>
              </div>

              <div className="port-info" style={{'opacity': `${infoStyles[0]}%`}}>
                <h1>Twitter</h1>
                <div className="port-info">

                </div>
                <div className="port-description">
                  <p>Full stack social media app. Make an account and try it out!</p>
                  <div className="port-links">
                    <p><IoInformationCircleOutline/></p>
                    <a href='https://github.com/andrew-wulf/portfolio-frontend/tree/main?tab=readme-ov-file#twitter' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                    <Modal />
                  </div>
                </div>
              </div>
            </div>

            <div className="port-container" id="blur-3" onClick={() => {handleVisit(2)}}>
              <div className="port-img-container">
                <img src={`assets/chess${chessIndex}.png`} draggable='false'/>
                <h3 onClick={(e) => {e.stopPropagation(); modalShow('chess')}}> <GrGallery/> Gallery</h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('chess', -1)}} className="left"><FaChevronLeft/></h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('chess', 1)}} className="right"><FaChevronRight/></h3>
              </div>
              <div className="port-info" style={{'opacity': `${infoStyles[2]}%`}}>
                <h1>Chess</h1>
                <div className="port-description">
                  <p>Chess game made from scratch using Javascript and the Phaser library.</p>
                  <div className="port-links">
                    <p><IoInformationCircleOutline/></p>
                    <a href='https://github.com/andrew-wulf/portfolio-frontend/tree/main?tab=readme-ov-file#chess' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="port-container" id="blur-2">
              <div className="port-img-container">
                <img src={'movie_battle.png'} draggable='false'/>
                <h3 onClick={(e) => {e.stopPropagation(); modalShow('movie')}}> <GrGallery/> Gallery</h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('movie', -1)}} className="left"><FaChevronLeft/></h3>
                <h3 onClick={(e) => {e.stopPropagation(); indexChange('movie', 1)}} className="right"><FaChevronRight/></h3>
              </div>
              <div className="port-info" style={{'opacity': `${infoStyles[1]}%`}}>
                <h1>Movie Battle</h1>
                <div className="port-description">
                  <p>Multiplayer trivia battle royale inspired by cine2nerdle. Coming soon!</p>
                  <div className="port-links">
                    <p><IoInformationCircleOutline/></p>
                    <a href='https://github.com/andrew-wulf/portfolio-frontend/tree/main?tab=readme-ov-file#movie-battle' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                  </div>
                </div>
                
              </div>
            </div>

            
          </div>

        </div>

        <PortModal imgs={selectedImgs} descriptions={selectedDescriptions} onClose={modalClose} show={modalVisible}/>


      </div>
    </div>
  )
}



// background ideas: 
// dark wood - "https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
// light wood - "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// light brick - 'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'


// &:hover{
//   transition: 2s;
//   transform: scale(1.2);
//   cursor: pointer;

//   .port-img-container {
//     cursor: pointer;
//     border: 3px solid rgb(97, 139, 218);
//     box-shadow: 0px 0px 20px rgb(97, 139, 218);
//   }
//   h1 {
//     color: rgb(24, 24, 24);
//   }