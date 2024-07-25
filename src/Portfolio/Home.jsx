import { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap"
import { Stack } from "react-bootstrap";
import {Image} from "react-bootstrap";

import { BiCameraMovie } from "react-icons/bi";

export function Home() {
  let link = "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [percent, setPercent] = useState(0);

  const [opacity ,setOpacity] = useState(0);
  const [appsOpacity ,setAppsOpacity] = useState(0);
  const [freeze, setFreeze] = useState(false);


  const [infoStyles, setInfoStyles] = useState([0, 0, 0, 0]);

  const [translate, setTranslate] = useState([15, 0]);
  const [headerTranslate, setHeaderTranslate] = useState([0, -5]);
  const [pageTranslate, setPageTranslate] = useState([0, 35]);

  const [imgStyles, setImgStyles] = useState([{}, {}, {}, {}]);
  const [boxStyles, setBoxStyles] = useState([{}, {}, {}, {}]);


  const revealPortfolio = () => {
    setHeaderTranslate([-30, 10]);
    setPageTranslate([0, -5])
    setAppsOpacity(100);
  }

  const revealBio = () => {
    setHeaderTranslate([30, 10]);
    setPageTranslate([0, -5])
    setAppsOpacity(0);
  }

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


  let hoverBoxStyle = {'transform': 'scale(1.2)', 'cursor': 'pointer'}
  let hoverImgStyle = {'cursor': 'pointer', 'border': '3px solid rgb(97, 139, 218)', 'boxShadow': '0px 0px 20px rgb(97, 139, 218)'}


  const mouseOver = (i) => {
    //console.log(i)
    if (freeze === false) {

      let imgs = [{}, {}, {}, {}];
      let boxes = [{'filter': `blur(1px)`}, {'filter': `blur(1px)`}, {'filter': `blur(1px)`}, {'filter': `blur(1px)`}];
      let visibles = [0, 0, 0, 0]
  
      imgs[i] = hoverImgStyle;
      boxes[i] = hoverBoxStyle;
      visibles[i] = 100;
  
      setImgStyles(imgs);
      setBoxStyles(boxes);
      setInfoStyles(visibles);
    }

  }
    

  const mouseLeave = () => {
    if (freeze === false) {
      setImgStyles([{}, {}, {}, {}]);
      setBoxStyles([{}, {}, {}, {}]);
      setInfoStyles([0, 0, 0, 0]);
    }
  }
  
  useEffect(() => {
    setOpacity(100);
    setHeaderTranslate([0, 0,])
  }, []);


  const handleClick = (i) => {
    if (freeze) {
      appDeselect();
    }
    else {
      appSelect(i);
    }
  }

  const appSelect = (i) => {
    let percentages = [15, 5, -5, -15]

    mouseOver(i);
    setFreeze(true);
    setPageTranslate([0, -30]);

    setPercent(percentages[i]);
    
    let styles = infoStyles;
    styles[i] = 100;
    setInfoStyles(styles);
  }

  const appDeselect = () => {
    setPageTranslate([0, -5]);
    setInfoStyles([0, 0, 0, 0]);
    setTimeout(() => {
      setFreeze(false);
    }, 3000)
  }


  const handleVisit = (i) => {
    let addresses = ['/twitter', '/moviebattle', '/chess', ''];
    let dest = addresses[i];

    if (dest !== '') {
      window.location.href = dest;
    }
  }



  let trans = `${translate[0]}%, ${translate[1]}%`;
  let pageTrans = `${pageTranslate[0]}%, ${pageTranslate[1]}%`
  let headerTrans = `${headerTranslate[0]}%, ${headerTranslate[1]}%`


  return (
    <div className="portfolio-home">
    

    <div className="port-content" style={{'transform': `translate(${pageTrans})`}}>

      <div className="port-headers" style={{'transform': `translate(${headerTrans})`}}>
        <h2 className="port-title" style={{'opacity': `${opacity}%`}}>Andrew Wulf | Full-Stack Developer</h2>

        <div className="port-options">
          <h2 className="port-about" style={{'opacity': `${opacity}%`}}>About Me</h2>
          <h2 className="port-apps" onClick={revealPortfolio} style={{'opacity': `${opacity}%`}}>My Portfolio.</h2>
        </div>
      </div>

      <div className="track-container" onMouseMove={(e) => {shift(e)}} style={{'opacity': `${appsOpacity}%`, 'transform': `translate(${trans})`, 'transition': '3s ease-out'}}>

        <div className="img-track" style={{'transform': `translate(${percent}%)`}} >
          <div className="port-container" id="blur-1" onMouseEnter={(e) => {mouseOver(0)}} onMouseLeave={mouseLeave} style={boxStyles[0]} onClick={() => {handleVisit(0)}}>
            <div className="port-img-container" style={imgStyles[0]}>
              <img src={'twitter_logo.png'} className="twitter-logo" draggable='false'/>
            </div>
            <h1>Twitter</h1>
            <div className="port-info" style={{'opacity': `${infoStyles[0]}%`}}>
              <h4>Twitter clone, styled for all devices. Make an account and try it out!</h4>
              
            
            </div>
          </div>

          <div className="port-container" id="blur-3" onMouseEnter={(e) => {mouseOver(2)}} onMouseLeave={mouseLeave} style={boxStyles[2]} onClick={() => {handleVisit(2)}}>
            <div className="port-img-container" style={imgStyles[2]}>
              <img src={'assets/chess.png'} draggable='false'/>
            </div>
            <h1>Chess</h1>
            <div className="port-info" style={{'opacity': `${infoStyles[2]}%`}}>
              <h4>It's chess! Play locally, or against stockfish.</h4>
              
            
            </div>
          </div>

          <div className="port-container" id="blur-2" onMouseEnter={(e) => {mouseOver(1)}} onMouseLeave={mouseLeave} style={boxStyles[1]}>
            <div className="port-img-container" style={imgStyles[1]}>
              <img src={'movie_battle.png'} draggable='false'/>
            </div>
            <h1>Movie Battle</h1>
            <div className="port-info" style={{'opacity': `${infoStyles[1]}%`}}>
              <h4>Multiplayer trivia battle royale inspired by cine2nerdle. Coming soon!</h4>
              
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