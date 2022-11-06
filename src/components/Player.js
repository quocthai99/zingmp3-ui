import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../ultis/icons";
import * as actions from '../store/actions'

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  CiShuffle,
  BsPlayCircle,
  BsPauseCircle,
} = icons;

const Player = () => {
  const audioEl = useRef(new Audio())
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apigetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        setSource(res2.data.data["128"]);
      }
    };

    fetchDetailSong();
  }, [curSongId]);

  useEffect(() => {
    audioEl.current.pause()
    audioEl.current.src = source
    audioEl.current.load()
    
    if (isPlaying) audioEl.current.play()

  }, [curSongId, source]);

  const handlePlayMusic = () => {
    if (isPlaying) {
      audioEl.current.pause()
      dispatch(actions.play(false))
    } else {
      audioEl.current.play()
      dispatch(actions.play(true))
    }
  };

  return (
    <div className="bg-main-400 px-5 h-full flex py-2">
      <div className="w-[30%] flex-auto gap-3 flex items-center">
        <img
          src={songInfo?.thumbnail}
          alt="/"
          className="w-16 h-16 object-cover rounded-md "
        />
        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-sm ">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>

        <div className="flex gap-4 pl-2 ">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>

      <div className="w-[40%] flex-auto flex items-center flex-col justify-center gap-2 border border-red-300 ">
        <div className="flex gap-8 items-center justify-center ">
          <span className="hover:text-main-500 cursor-pointer ">
            <CiShuffle size={24} />
          </span>
          <span className="hover:text-main-500 cursor-pointer ">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="hover:text-main-500 cursor-pointer "
            onClick={handlePlayMusic}
          >
            {isPlaying ? (
              <BsPauseCircle size={40} />
            ) : (
              <BsPlayCircle size={40} />
            )}
          </span>
          <span className="hover:text-main-500 cursor-pointer ">
            <MdSkipNext size={24} />
          </span>
          <span className="hover:text-main-500 cursor-pointer ">
            <CiRepeat size={24} />
          </span>
        </div>

        <div>progress bar</div>
      </div>

      <div className="w-[30%] flex-auto border border-red-300">Volume</div>
    </div>
  );
};

export default Player;
