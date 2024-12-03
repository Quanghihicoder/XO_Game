import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home"
import Game from "./pages/Game"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="game/">
              <Route index element={<Game mode={1} />}/>
              <Route path="computer" element={<Game mode={2}/>}/>
              <Route path="online" element={<Game mode={3} />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>  
  );
}

export default App;
