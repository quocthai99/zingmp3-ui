import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex bg-[#CED9D9] " >
      <div className="w-[240px] flex-none" >
        <SidebarLeft />
      </div>
      <div className="flex-auto border border-red-500 " >
        <Outlet />
      </div>
      <div className="w-[329px] flex-none" >
        <SidebarRight />
      </div>
    </div>
  );
};

export default Public;
