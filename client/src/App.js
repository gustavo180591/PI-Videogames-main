/* import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Videogames</h1>
    </div>
  );
}

export default App;
 */

/* import Home from "./views/Home/Home";
import Landing from "./views/Landing/Landing";
import Form from "./views/Form/Form";
import Detail from "./views/Detail/Detail"; */

import { Home, Landing, Form, Detail } from "./views";
import { Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* una manera de definir rutas, el problema con esta manera es que no se pueden pasar props */}
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route path="/home" render={() => <Home />} />
      <Route exact path="/detail" component={Detail} />
      <Route exact path="/create" component={Form} />
      {/* otra manera de definir rutas */}
      {/*  <Route exact path="/">
        <Landing />
      </Route> */}
      {/* otra manera de definir rutas */}

      {/* <Route path="/home">
        <Home />
      </Route> */}
    </div>
  );
}

export default App;
