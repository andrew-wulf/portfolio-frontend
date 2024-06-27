import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";


export function Content(props) {

  return (
    <div className="content">

      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  )
}