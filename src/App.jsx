import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Twitter } from "./Twitter/Twitter";
import { Portfolio } from "./Portfolio/Portfolio";
import { Chess } from "./Chess/src/Chess.jsx"



function App() {

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Portfolio />}/>
        <Route path="/twitter/*" element={<Twitter />}/>
        <Route path="/chess" element={<Chess />}/>
      </Routes>
    </div>
  );
}

export default App;