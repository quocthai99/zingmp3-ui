import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const Section = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5 ">
      <div className="flex items-center justify-between ">
        <h3 className="text-5 font-bold ">{data?.title}</h3>
        <span className="text-xs ">TẤT CẢ</span>
      </div>

      <div className="flex items-start justify-between  gap-[28px]">
        {data?.items
          ?.filter((item, index) => index <= 4)
          ?.map((item) => {
            return (
              <div
                key={item.encodeId}
                onClick={() => {
                  navigate(item?.link?.split(".")[0]);
                }}
                className="flex flex-col flex-auto w-1/5 text-sm gap-3 cursor-pointer "
              >
                <img
                  src={item.thumbnailM}
                  alt="avatar"
                  className="w-full object-cover rounded-lg "
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{item.title}</span>
                  {data?.sectionId === "h100" ? (
                    <span>{item.artistsNames}</span>
                  ) : (
                    <span>
                      {item.sortDescription.length >= 40
                        ? `${item.sortDescription?.slice(0, 40)}...`
                        : item.sortDescription}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(Section);
