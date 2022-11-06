import axios from "../axios";

export const apiGetSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/song",
        method: "get",
        params: {
          id: sid,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apigetDetailSong = (sid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/infoSong",
        method: "get",
        params: {
          id: sid,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDetailPlaylist = (pid) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: "/detailplaylist",
        method: "get",
        params: {
          id: pid,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
