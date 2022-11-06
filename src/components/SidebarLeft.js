import React from "react";
import logo from "../assets/logo-dark.svg";

import { NavLink, useNavigate } from "react-router-dom";

import { sidebarMenu } from "../ultis/menu";
import path from '../ultis/path'

const notActiveStyle =
  "py-2 px-[25px] font-bold text-[25px] text-[#32323D] flex items-center gap-[12px] ";
const activeStyle =
  "py-2 px-[25px] font-bold text-[25px] text-[#0F7070] flex items-center gap-[12px] ";

const SidebarLeft = () => {

  const navigate = useNavigate()

  return (
    <div className="flex h-full flex-col bg-main-200">
      <div onClick={() => navigate(path.HOME)} className="w-full h-[70px] py-[15px] px-[25px] flex items-center justify-start cursor-pointer ">
        <img src={logo} alt="logo" className="w-[120px] object-contain " />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end={item.end}
            className={({isActive}) => isActive ? activeStyle : notActiveStyle}
          >
            {item.icon}
            <span className=" text-[16px] ">{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
