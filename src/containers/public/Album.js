import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";

import * as apis from "../../apis";
import { Lists, AudioLoading } from "../../components";
import * as actions from "../../store/actions";
import icons from "../../ultis/icons";

const { BsPlayCircle } = icons;

const Album = () => {
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music); // encodeid banner slider and play music default is false
  const { pid } = useParams();

  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response?.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  return (
    <div className="py-5 flex gap-8 w-full h-full px-[59px] ">
      {/* Thumbnail Playlist */}
      <div className="flex-none w-1/4 flex flex-col items-center gap-2 ">
        <div className="w-full relative overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnai"
            className={`w-full object-contain ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            } shadow-md`}
          />
          <div className={`flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 text-white hover:bg-overlay-30 ${isPlaying && 'rounded-full'}`}>
            {isPlaying ? (
              <span className="p-2 border border-white rounded-full">
                <AudioLoading />
              </span>
            ) : (
              <BsPlayCircle size={50} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-[20px] text-gray-700 font-bold ">
            {playlistData?.title}
          </h3>
          <div className="flex gap-2 items-center text-gray-500 text-xs ">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </div>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">{`${
            playlistData?.like / 1000
          }k người yêu thích`}</span>
        </div>
      </div>

      {/* List Songs */}
      <Scrollbars>
        <div className="flex-auto gap-2 flex flex-col mb-40">
          <div className="flex gap-1 text-sm">
            <span>Lời tựa:</span>
            <span>{playlistData?.sortDescription}</span>
          </div>
          <div>
            <Lists totalDuration={playlistData?.song?.totalDuration} />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
