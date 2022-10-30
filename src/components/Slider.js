import React from "react";
import { useSelector } from "react-redux";

const Slider = () => {
  const { banner } = useSelector((state) => state.app);

  return (
    <div className="flex gap-4 w-full">
      {banner.map((item) => (
        <img
          key={item.encodeId}
          src={item.banner}
          alt="banner"
          className="flex-1 object-contain"
        />
      ))}
    </div>
  );
};

export default Slider;
