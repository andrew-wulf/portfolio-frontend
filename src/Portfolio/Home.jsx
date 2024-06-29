import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { Container, Row, Col } from "react-bootstrap"
import { Stack } from "react-bootstrap";
import {Image} from "react-bootstrap";

import { BiCameraMovie } from "react-icons/bi";

export function Home() {
  let link = "https://images.unsplash.com/photo-1582845512747-e42001c95638?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  const [percent, setPercent] = useState(0);

  const [opacity ,setOpacity] = useState(0);
  const [translate, setTranslate] = useState('0%');
  const [pageTranslate, setPageTranslate] = useState('0%');
  const [freeze, setFreeze] = useState(false);

  const [blur1, setBlur1] = useState(0);
  const [blur2, setBlur2] = useState(0);
  const [blur3, setBlur3] = useState(0);
  const [blur4, setBlur4] = useState(0);

  let xOffset = 0;
  let maxOffset = window.innerWidth / 2

  const shift = (e) => {
    if (freeze) {return}

    let anchor = window.innerWidth / 2;
    xOffset = anchor - e.clientX;
    
    let percentage = (xOffset / maxOffset) * 100
    percentage = Math.max(-20, Math.min(20, percentage))
    
    let diff = Math.abs(percent - percentage);
    if (diff > 4) {
      setPercent(percentage);
    }
    console.log(percentage);
  }

  const mouseOver = (e) => {
    let i = parseInt(e.target.id.slice(-1)) - 1;
    let blurs = [setBlur1, setBlur2, setBlur3, setBlur4];

    for (let j=0; j < blurs.length; j++) {
      let b = blurs[j];
      if (j === i) {
        b(0);
      }
      else {
        b(1);
      }
    }
  }

  const mouseLeave = () => {
    setBlur1(0);
    setBlur2(0);
    setBlur3(0);
    setBlur4(0);
  }
  
  useEffect(() => {
    setOpacity(100);
    setTranslate('0%, 12%');
  }, []);




  const appSelect = (i) => {
    setFreeze(true);
    setPageTranslate('0%, -35%');
    setTranslate('-10%, 0%')
  }

  const appDeselect = () => {
    setPageTranslate('0%, 0%');
    setTranslate('0%, 0%');
    setFreeze(false);
  }




  return (
    <div className="portfolio-home">
    
    <img className="port-bg" src='https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
    
    <div className="port-content" style={{'transform': `translate(${pageTranslate})`}}>

      <h2 className="port-title" style={{'opacity': `${opacity}%`, 'transform': `translate(${translate})`}}>My Portfolio.</h2>

      <div className="track-container" onMouseMove={(e) => {shift(e)}} style={{'opacity': `${opacity}%`, 'transform': `translate(${translate})`}}>

        <div className="img-track" style={{'transform': `translate(${percent}%)`}} >
          <Stack className="port-container" id="blur-1" onMouseEnter={(e) => {mouseOver(e)}} onMouseLeave={mouseLeave} style={{'filter': `blur(${blur1}px)`}} onClick={() => {appSelect(0)}}>
            <Container className="port-img-container">
              <img src={'twitter_logo.png'} className="twitter-logo" onClick={() => {window.location.href = "/twitter"}} draggable='false'/>
            </Container>
            <h1>Twitter</h1>
            <h4>Info</h4>
          </Stack>
          <Stack className="port-container" id="blur-2" onMouseEnter={(e) => {mouseOver(e)}} onMouseLeave={mouseLeave} style={{'filter': `blur(${blur2}px)`}} onClick={() => {appSelect(1)}}>
            <Container className="port-img-container">
              <img src={link} draggable='false'/>
            </Container>
            <h1>Kickstarter</h1>
            <h4>Info</h4>
          </Stack>

          <Stack className="port-container" id="blur-3" onMouseEnter={(e) => {mouseOver(e)}} onMouseLeave={mouseLeave} style={{'filter': `blur(${blur3}px)`}} onClick={() => {appSelect(2)}}>
            <Container className="port-img-container">
              <img src={'assets/chess.png'} onClick={() => {window.location.href = "/chess"}} draggable='false'/>
            </Container>
            <h1>Chess</h1>
            <h4>Info</h4>
          </Stack>
          <Stack className="port-container" id="blur-4" onMouseEnter={(e) => {mouseOver(e)}} onMouseLeave={mouseLeave} style={{'filter': `blur(${blur4}px)`}} onClick={() => {appSelect(3)}}>
            <Container className="port-img-container">
              <img src={link} draggable='false'/>
            </Container>
            <h1>Movie Battle</h1>
            <h4>Info</h4>
          </Stack>
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