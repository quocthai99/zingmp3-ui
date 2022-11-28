import React, { memo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import icons from "../ultis/icons";

const { BsThreeDots, AiOutlineHeart, BsPlayCircle } = icons;

const SectionItem = ({
  link,
  thumbnailM,
  title,
  data,
  artistsNames,
  sortDescription,
}) => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);
  const imageRef = useRef();

  const handleHover = () => {
    setIsHover(true);
    imageRef.current.classList.remove("animate-scale-down-image");
    imageRef.current.classList.add("animate-scale-up-image");
  };

  const handleLeave = () => {
    setIsHover(false);
    imageRef.current.classList.remove("animate-scale-up-image");
    imageRef.current.classList.add("animate-scale-down-image");
  };

  return (
    <div
      onClick={() => {
        navigate(link?.split(".")[0], { state: { playAlbum: false } });
      }}
      className="flex flex-col flex-auto w-1/5 text-sm gap-3 cursor-pointer"
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
        className="relative w-full overflow-hidden rounded-lg "
      >
        {isHover && (
          <div className="flex items-center justify-center gap-3 text-white absolute top-0 bottom-0 left-0 z-40 right-0 bg-overlay-30 rounded-lg">
            <span>
              <AiOutlineHeart size={20} />
            </span>
            <span onClick={(e) => {
                e.stopPropagation()
                navigate(link?.split(".")[0], { state: { playAlbum: true } })
            }} >
              <BsPlayCircle size={25} />
            </span>
            <span>
              <BsThreeDots size={20} />
            </span>
          </div>
        )}
        <img
          ref={imageRef}
          src={thumbnailM}
          alt="avatar"
          className="w-full object-cover rounded-lg  "
        />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold">{title}</span>
        {data?.sectionId === "h100" ? (
          <span>{artistsNames}</span>
        ) : (
          <span>
            {sortDescription.length >= 40
              ? `${sortDescription?.slice(0, 40)}...`
              : sortDescription}
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(SectionItem);
