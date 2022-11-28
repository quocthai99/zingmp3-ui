import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions"

const SongItem = ({
  thumbnail,
  title,
  artists,
  releaseDate,
  order,
  percent,
  sid,
  style
}) => {
  const dispatch = useDispatch()

  return (
    <div onClick={() => {
      dispatch(actions.setCurSongId(sid))
      dispatch(actions.play(true))
    }} className={`w-full flex p-[10px] gap-[10px] items-center justify-between rounded-md cursor-pointer ${style || 'text-black hover:bg-main-100'} `}>
      <div className="flex gap-4 " >
        {order && <span className={`${order === 1 ? 'text-shadow-no1' : order === 2 ? 'text-shadow-no2' : 'text-shadow-no3'} text-[rgba(77,34,104,0.9)] m-auto text-[32px]`}>{order}</span>}
        <img
          src={thumbnail}
          alt="thumbnail"
          className="w-[60px] h-[60px] object-cover rounded-md "
        />
        <div className="flex flex-col ">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-xs opacity-70">{artists}</span>
          {releaseDate && (
            <span className="text-xs text-gray-700">
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold" >{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
