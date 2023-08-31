import './App.scss'
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/js/bootstrap.bundle"
import Home from "./components/Home"
import Signup from "./components/Signup"
import Login from "./components/Login"
import NotFound from "./components/NotFound"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
  <Route exact path={"/"} element= {<Home/>}/>
  <Route exact path={"/signup"} element= {<Signup/>}/>
  <Route exact path={"/login"} element= {<Login/>}/>
  {/* If Link is Wrong then Not Found Component will render */}
<Route element={<NotFound/>}/>  

  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
