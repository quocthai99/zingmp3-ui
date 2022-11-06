import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";

import * as apis from "../../apis";
import { Lists } from "../../components";

const Album = () => {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid);
      if (response.data.err === 0) {
        setPlaylistData(response.data.data);
      }
    };

    fetchDetailPlaylist();
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full gap-8 w-full px-[59px] ">
      <div className="flex-none w-1/4 flex flex-col gap-2 ">
        <img
          src={playlistData?.thumbnailM}
          alt="thumbnail"
          className="w-full object-contain rounded-md shadow-md"
        />

        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[20px] font-bold text-gray-700 ">
            {playlistData?.title}
          </h3>
          <span className="flex gap-4 text-gray-500 text-sm ">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-4 text-gray-500 text-sm ">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-4 text-gray-500 text-sm ">{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>

      <Scrollbars style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto mb-40">
          <span className="text-sm ">
            <span className="text-gray-600 pr-2">Lời tựa</span>
            <span>{playlistData?.description}</span>
          </span>

          <Lists
            songs={playlistData?.song?.items}
            totalDuration={playlistData?.song?.totalDuration}
          />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
