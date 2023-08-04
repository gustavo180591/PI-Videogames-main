import "./App.css";
import Landing from "../src/views/Landing/Landing";
import Formulario from "../src/views/Form/Form";
import Home from "../src/views/Home/Home";
import Detail from "../src/views/Detail/Detail";
import { BrowserRouter, Route } from "react-router-dom";
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" element={<Landing />} />
        <Route path="Home" element={<Home />} />
        <Route path="Detail/:id" element={<Detail />} />
        <Route path="Formulario" element={<Formulario />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
