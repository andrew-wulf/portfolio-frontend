import { useState } from "react";



export function Intro(props) {
  let name = props.name;

  const [nameInputVal, setNameInputVal] = useState("");

  return (
    <div className="movie-intro">
      <h1>Please enter your name.</h1>
      <input value={nameInputVal} onChange={(e) => {setNameInputVal(e.target.value)}}/>
      <button onClick={() => {props.updateName(nameInputVal)}}>Continue</button>
    </div>
  )
}