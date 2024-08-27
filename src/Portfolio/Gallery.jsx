import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";


export function Gallery (props) {


  const [index, setIndex] = useState(0);

  
  let imgs = props.imgs;
  let descriptions = props.descriptions;

  const indexChange = (direction) => {
    let i = index + direction;

    if (i > imgs.length - 1) {
      i = 0;
    }
    if (i < 0) {
      i = imgs.length - 1;
    }
    setIndex(i);
  }

  let closeButton = <></>;

  if (props.isModal) {
    closeButton = <h2 onClick={props.close} className="port-modal-close">&#x2715;</h2>
  }

  let img = imgs[index];
  if (window.innerWidth <= 700) {
    img = img.replace('.png', 'M.png')
  }

  return (
    
    <div className="gallery">
      {closeButton}
      <img src={img} draggable='false'/>
      <h3 onClick={(e) => {e.stopPropagation(); indexChange(-1)}} className="left"><FaChevronLeft/></h3>
      <h3 onClick={(e) => {e.stopPropagation(); indexChange(1)}} className="right"><FaChevronRight/></h3>
      <div className="gallery-description">
        <p>{descriptions[index]}</p>
      </div>
    </div>
  )
}