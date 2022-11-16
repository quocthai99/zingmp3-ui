import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as apis from "../apis";
import * as actions from "../store/actions";
import icons from "../ultis/icons";
import { LoadingSong } from "./";

const {
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  TbRepeat,
  TbRepeatOnce,
  CiShuffle,
  BsPlayCircle,
  BsPauseCircle,
  BsMusicNoteList,
  SlVolume1,
  SlVolume2,
  SlVolumeOff,
} = icons;

var intervalId;

const Player = () => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music); // encodeid banner slider and play music default is false
  const [songInfo, setSongInfo] = useState(null); // dữ liệu của bài hát được click vào detail
  const [curSeconds, setCurSeconds] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [isLoadedSource, setIsLoadedSource] = useState(true);
  const [volume, setVolume] = useState(100);
  // const [source, setSource] = useState(null); // dữ liệu của bài hát được click vào source nhac
  const [audio, setAudio] = useState(new Audio());
  const dispatch = useDispatch();
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchSong = async () => {
      setIsLoadedSource(false);
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      setIsLoadedSource(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause();
        setAudio(new Audio());
        dispatch(actions.play(false));
        toast.warn(res2.data.msg);
        setCurSeconds(0);
        thumbRef.current.style.cssText = `right: 100%`;
      }
    };

    fetchSong();
  }, [curSongId]);

  // play music
  useEffect(() => {
    intervalId && clearInterval(intervalId);
    audio.pause();
    audio.load();
    if (isPlaying) {
      audio.play();
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        setCurSeconds(Math.round(audio.currentTime));
      }, 200);
    }
  }, [audio]);

  useEffect(() => {
    const handleEnded = () => {
      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleRepeatOne() : handleNextSong();
      } else {
        audio.pause();
        dispatch(actions.play(false));
      }
    };
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.addEventListener("ended", handleEnded);
    };
  }, [audio, isShuffle, repeatMode]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume])

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play();
      dispatch(actions.play(true));
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect();
    let percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurSeconds(Math.round((percent * songInfo.duration) / 100));
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;

      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;

      songs?.forEach((item, index) => {
        if (item.encodeId === curSongId) currentSongIndex = index;
      });
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    audio.play();
  };

  const handleShuffle = () => {
    setIsShuffle((prev) => !prev);
    const randomIndex = Math.round(Math.random() * songs?.length) - 1;
    dispatch(actions.setCurSongId(songs[randomIndex].encodeId));
    dispatch(actions.play(true));
  };

  return (
    <div className="flex items-center px-5 h-full bg-main-400 z-50 ">
      <div className="w-[30%] flex-auto flex items-center gap-2  ">
        <img
          src={songInfo?.thumbnail}
          alt="thumnail"
          className="w-16 h-16 object-cover rounded-md "
        />
        <div className="flex flex-col">
          <span className="font-medium text-[14px] text-gray-700 ">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500 ">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 pl-[10px]">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>

      {/* Player */}
      <div className="w-[40%] flex-auto flex items-center justify-center gap-2 flex-col">
        <div className="flex items-center gap-8 justify-center ">
          <span
            onClick={() => setIsShuffle((prev) => !prev)}
            className={`cursor-pointer ${isShuffle && `text-purple-600 `}`}
          >
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer "}`}
          >
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="hover:text-main-500 cursor-pointer "
          >
            {!isLoadedSource ? (
              <LoadingSong />
            ) : isPlaying ? (
              <BsPauseCircle size={40} />
            ) : (
              <BsPlayCircle size={40} />
            )}
          </span>
          <span
            onClick={handleNextSong}
            className={`${!songs ? "text-gray-500" : "cursor-pointer "}`}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
            className={`cursor-pointer ${repeatMode && `text-purple-600 `}`}
          >
            {repeatMode === 1 ? (
              <TbRepeatOnce size={24} />
            ) : (
              <TbRepeat size={24} />
            )}
          </span>
        </div>

        <div className="w-full flex items-center justify-center text-xs">
          <span>{moment.utc(curSeconds * 1000).format("mm:ss")}</span>
          <div
            ref={trackRef}
            onClick={handleClickProgressbar}
            className="w-3/4 h-[3px] hover:h-[6px] cursor-pointer bg-[rgba(0,0,0,0.1)] m-auto relative rounded-l-full rounded-r-full "
          >
            <div
              ref={thumbRef}
              className="absolute top-0 left-0 bg-[#0e8080] bottom-0 rounded-l-full rounded-r-full hover:h-[6px] cursor-pointer "
            ></div>
          </div>
          <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-[30%] flex-auto flex items-center justify-end gap-4 ">
        <div className="flex items-center gap-2" >
          <span onClick={() => setVolume(prev => +prev === 0 ? 70 : 0)}>{+volume >= 50 ? <SlVolume2 /> : +volume === 0 ? <SlVolumeOff /> : <SlVolume1 /> }</span>
          <input
            type="range"
            step={1}
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
          />
        </div>
        <span className="p-1 rounded-sm cursor-pointer bg-main-500 opacity-90 hover:opacity-100 ">
          <BsMusicNoteList size={20} />{" "}
        </span>
      </div>
    </div>
  );
};

export default Player;
