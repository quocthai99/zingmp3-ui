import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight, Player, Header } from "../../components";

const Public = () => {
  return (
    <div className="w-full relative h-screen flex bg-main-300 flex-col ">
      <div className="flex w-full h-full flex-auto ">
        <div className="w-[240px] min-h-screen flex-none ">
          <SidebarLeft />
        </div>
        <div className="flex-auto">
          <div className="h-[70px] px-[59px] flex items-center">
            <Header />
          </div>
          <Outlet />
          <div className="w-full h-[500px]" ></div>
        </div>
        <div className="w-[329px] hidden 1600:flex flex-none animate-slide-left ">
          <SidebarRight />
        </div>
      </div>
      <div className="flex-none fixed bottom-0 left-0 right-0 h-[90px]  ">
        <Player />
      </div>
    </div>
  );
};

export default Public;
