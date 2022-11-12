import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {Scrollbars} from 'react-custom-scrollbars-2'

import * as apis from "../../apis";
import {Lists} from '../../components'

const Album = () => {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response?.data?.data);
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  return (
    <div className="py-5 flex gap-8 w-full h-full px-[59px] ">
      {/* Thumbnail Playlist */}
      <div className="flex-none w-1/4 flex flex-col items-center gap-2 ">
        <img src={playlistData?.thumbnailM} alt="thumbnai" className="w-full object-contain rounded-md shadow-md" />
        <div className="flex flex-col gap-1" >
          <h3 className="text-[20px] text-gray-700 font-bold ">{playlistData?.title} </h3>
          <div className="flex gap-2 items-center text-gray-500 text-xs " >
            <span>Cập nhật:</span>
            <span>{moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
          </div>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">{playlistData?.artistsNames}</span>
          <span className="flex gap-2 items-center text-gray-500 text-xs ">{`${playlistData?.like / 1000}k người yêu thích`}</span>
        </div>
      </div>

      {/* List Songs */}
    <Scrollbars>
      <div className="flex-auto gap-2 flex flex-col mb-40">
        <div className="flex gap-1 text-sm" >
            <span>Lời tựa:</span>
            <span>{playlistData?.sortDescription}</span>
        </div>
          <div >
            <Lists songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
          </div>
      </div>
    </Scrollbars>
    </div>
  );
};

export default Album;
