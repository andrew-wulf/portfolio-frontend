import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap"
import { Stack } from "react-bootstrap";
import {Image} from "react-bootstrap";

import { BiCameraMovie } from "react-icons/bi";

import { FaGithub } from "react-icons/fa6";
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


export function Home() {
  let link = "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [percent, setPercent] = useState(0);

  const [opacity ,setOpacity] = useState(0);
  const [appsOpacity ,setAppsOpacity] = useState(0);
  const [freeze, setFreeze] = useState(false);


  const [infoStyles, setInfoStyles] = useState([100, 100, 100, 100]);

  const [translate, setTranslate] = useState([0, 100]);
  const [headerTranslate, setHeaderTranslate] = useState([0, -5]);
  const [pageTranslate, setPageTranslate] = useState([0, 0]);

  const [imgStyles, setImgStyles] = useState([{}, {}, {}, {}]);
  const [boxStyles, setBoxStyles] = useState([{}, {}, {}, {}]);
  


  let xOffset = 0;
  let maxOffset = window.innerWidth / 2

  const shift = (e) => {
    if (freeze) {return}

    let anchor = window.innerWidth / 2;
    xOffset = anchor - e.clientX;
    
    let percentage = (xOffset / maxOffset) * 100
    percentage = Math.max(-10, Math.min(10, percentage))
    
    let diff = Math.abs(percent - percentage);
    if (diff > 4) {
      setPercent(percentage);
    }
    //console.log(percentage);
  }



  
  useEffect(() => {
    setOpacity(100);
    setAppsOpacity(100);
    setHeaderTranslate([0, 8])
    setTranslate([0, 0])
  }, []);


  const handleClick = (i) => {
    if (freeze) {
      appDeselect();
    }
    else {
      appSelect(i);
    }
  }


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

  let trans = `${translate[0]}%, ${translate[1]}%`;
  let pageTrans = `${pageTranslate[0]}%, ${pageTranslate[1]}%`
  let headerTrans = `${headerTranslate[0]}%, ${headerTranslate[1]}%`


  return (
    <div className="portfolio-home">
    

    <div className="port-content">

      <div className="port-headers" style={{'transform': `translate(${headerTrans})`}}>
        <h2 className="port-title" style={{'opacity': `100%`}}>Andrew Wulf | Full-Stack Developer</h2>
      </div>

      <button className="cv-download" style={{'opacity': `${opacity}%`}} onClick={cvDownload}>Download my CV!</button>
      
      <div className="bound-box left"/>


        <div className="port-icon-track" style={{'opacity': opacity}}>
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



      <div className="bound-box right"/>


      <div className="track-container" style={{'opacity': `100%`, 'transform': `translate(${trans})`}}>
        <h2>Projects</h2>

        <div className="img-track" style={{'transform': `translate(${percent}%)`}} >

          <div className="port-spacer"/>
          
          <div className="port-container" id="blur-1" onClick={() => {handleVisit(0)}}>
            <div className="port-img-container" style={imgStyles[0]}>
              <img src={'assets/twitter1.png'} draggable='false'/>
            </div>

            <div className="port-info" style={{'opacity': `${infoStyles[0]}%`}}>
              <h1>Twitter</h1>
              <div className="port-info">

              </div>
              <div className="port-description">
                <p>A functioning twitter clone. Make an account and try it out!</p>
                <div className="port-links">
                <a href='https://github.com/andrew-wulf/portfolio-frontend' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                <p><IoInformationCircleOutline/></p>
                </div>
              </div>
            </div>
          </div>

          <div className="port-container" id="blur-3" onClick={() => {handleVisit(2)}}>
            <div className="port-img-container" style={imgStyles[2]}>
              <img src={'assets/chess1.png'} draggable='false'/>
            </div>
            <div className="port-info" style={{'opacity': `${infoStyles[2]}%`}}>
              <h1>Chess</h1>
              <div className="port-description">
                <p>Chess game made from scratch using Javascript and the Phaser library.</p>
                <div className="port-links">
                  <a href='https://github.com/andrew-wulf/portfolio-frontend' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                  <p><IoInformationCircleOutline/></p>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="port-container" id="blur-2">
            <div className="port-img-container" style={imgStyles[1]}>
              <img src={'movie_battle.png'} draggable='false'/>
            </div>
            <div className="port-info" style={{'opacity': `${infoStyles[1]}%`}}>
              <h1>Movie Battle</h1>
              <div className="port-description">
                <p>Multiplayer trivia battle royale inspired by cine2nerdle. Coming soon!</p>
                <div className="port-links">
                  <a href='https://github.com/andrew-wulf/portfolio-frontend' target="_blank" onClick={(e) => {e.stopPropagation()}}><FaGithub/></a>
                  <p><IoInformationCircleOutline/></p>
                </div>
              </div>
              
            </div>
          </div>

          
        </div>

      </div>

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