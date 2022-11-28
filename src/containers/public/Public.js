import React from "react";
import { Outlet } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  SidebarLeft,
  SidebarRight,
  Player,
  Header,
  Loading,
} from "../../components";
import { useSelector } from "react-redux";

const Public = () => {
  const { isLoading } = useSelector((state) => state.app);

  return (
    <div className="w-full relative h-screen flex bg-main-300 flex-col ">
      <div className="flex w-full h-full flex-auto ">
        <div className="w-[240px] min-h-screen flex-none ">
          <SidebarLeft />
        </div>

        <div className="relative flex-auto flex flex-col">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 z-20 flex items-center justify-center ">
              <Loading />
            </div>
          )}
          <div className="h-[70px] px-[59px] flex items-center">
            <Header />
          </div>

          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
            </Scrollbars>
          </div>
        </div>

        {/* <div className="w-[250px] flex flex-none animate-slide-left ">
          <SidebarRight />
        </div> */}
      </div>
      <div className="flex-none z-50 fixed bottom-0 left-0 right-0 h-[90px]  ">
        <Player />
      </div>
    </div>
  );
};

export default Public;
