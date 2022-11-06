import { Routes, Route } from "react-router-dom";

import path from "./ultis/path";

import { Home, Login, Public, Personal, Album } from "./containers/public";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.MY_MUSIC} element={<Personal />} />
          <Route path={path.ALBUM__TITLE__PID} element={<Album />} />

          <Route path={path.STAR} element={<Home />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
