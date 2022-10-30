import React from "react";

import icons from "../ultis/icons";

import { Search } from "./";

const { AiOutlineArrowLeft, AiOutlineArrowRight } = icons;

const Header = () => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div className="flex gap-6 text-gray-400">
          <span><AiOutlineArrowRight size={24} /></span>
          <span><AiOutlineArrowLeft size={24} /></span>
        </div>
        <div className="w-2/3" >
          <Search />
        </div> 
      </div>
      <div>dang ky</div>
    </div>
  );
};

export default Header;
