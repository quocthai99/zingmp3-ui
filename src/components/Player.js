import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import * as apis from "../apis";
import * as actions from "../store/actions"
import icons from "../ultis/icons";

const {
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  CiShuffle,
  BsPlayCircle,
  BsPauseCircle,
} = icons;

var intervalId

const Player = () => {
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music); // encodeid banner slider and play music default is false
  const [songInfo, setSongInfo] = useState(null); // dữ liệu của bài hát được click vào detail
  const [curSeconds, setCurSeconds] = useState(0)
  const [isShuffle, setIsShuffle] = useState(false)
  // const [source, setSource] = useState(null); // dữ liệu của bài hát được click vào source nhac
  const [audio, setAudio] = useState(new Audio())
  const dispatch = useDispatch()
  const thumbRef = useRef()
  const trackRef = useRef()

  useEffect(() => {
    const fetchSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId),
      ]);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data["128"]));
      } else {
        audio.pause()
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.warn(res2.data.msg)
        setCurSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    };

    fetchSong();
  }, [curSongId]);

  
  // play music
  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if (isPlaying) {
      audio.play()
      intervalId = setInterval(() => {
        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setCurSeconds( Math.round(audio.currentTime))
      }, 200)
    }
  }, [audio]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      audio.play()
      dispatch(actions.play(true))
    }
  };

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    let percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = percent * songInfo.duration / 100
    setCurSeconds( Math.round(percent * songInfo.duration / 100))
  }

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex

      songs?.forEach((item,index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex + 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex

      songs?.forEach((item,index) => {
        if (item.encodeId === curSongId) currentSongIndex = index
      })
      dispatch(actions.setCurSongId(songs[currentSongIndex - 1].encodeId))
      dispatch(actions.play(true))
    }
  }

  const handleShuffle = () => {

  }

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
            onClick={() => setIsShuffle(prev => !prev)}
            className={`cursor-pointer ${isShuffle && `text-purple-600 `}`}>
            <CiShuffle size={24} />
          </span>
          <span
            onClick={handlePrevSong}
            className={`${!songs ? 'text-gray-500' : 'cursor-pointer '}`}>
            <MdSkipPrevious size={24} />
          </span>
          <span
            onClick={handleTogglePlayMusic}
            className="hover:text-main-500 cursor-pointer "
          >
            {isPlaying ? (
              <BsPauseCircle size={40} />
            ) : (
              <BsPlayCircle size={40} />
            )}
          </span>
          <span onClick={handleNextSong} className={`${!songs ? 'text-gray-500' : 'cursor-pointer '}`}>
            <MdSkipNext size={24} />
          </span>
          <span className="hover:text-main-500 cursor-pointer ">
            <CiRepeat size={24} />
          </span>
        </div>

        <div className="w-full flex items-center justify-center text-xs" >
            <span>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
            <div ref={trackRef} onClick={handleClickProgressbar} className="w-3/4 h-[3px] hover:h-[6px] cursor-pointer bg-[rgba(0,0,0,0.1)] m-auto relative rounded-l-full rounded-r-full " >
                <div ref={thumbRef} className="absolute top-0 left-0 bg-[#0e8080] bottom-0 rounded-l-full rounded-r-full hover:h-[6px] cursor-pointer " ></div>
            </div>
            <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-[30%] flex-auto ">Volume</div>
    </div>
  );
};

export default Player;
