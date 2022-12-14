import React, { memo } from "react";
import moment from "moment";
import icons from "../ultis/icons";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";

const { BsMusicNoteBeamed } = icons;

const List = ({ songData }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurSongId(songData?.encodeId))
        dispatch(actions.play(true))
        dispatch(actions.playAlbum(true))
      }}
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer "
    >
      <div className="flex items-center gap-3 flex-1 ">
        <span><BsMusicNoteBeamed size={20} /></span>
        <img
          src={songData?.thumbnail}
          alt="thumbnailM"
          className="w-10 h-10 rounded-md object-cover "
        />
        <div className="flex flex-col w-full">
          <span className="text-sm font-semibold">
            {songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : songData?.title}
          </span>
          <span>{songData?.artistsNames}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center ">
        <span className="text-sm font-semibold">
          {songData?.album?.title.length > 30 ? `${songData?.album?.title.slice(0, 30)}...` : songData?.album?.title}
        </span>
      </div>

      <div className="flex-1 flex justify-end ">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>

    </div>
  );
};

export default memo(List);
