import { Routes, Route } from "react-router-dom";

import path from './ultis/path'

import {Home, Login, Public} from './containers/public'

function App() {
  return <div className="text-3xl font-bold underline">
    <Routes>
      <Route path={path.PUBLIC} element={<Public />} >
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Route>
    </Routes>
  </div>;
}

export default App;
