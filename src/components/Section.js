import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = () => {
  const { friday } = useSelector((state) => state.app);
  const navigate = useNavigate()
  console.log(friday);

  return (
    <div className="mt-12 px-[59px] flex flex-col gap-5 ">
      <div className="flex items-center justify-between ">
        <h3 className="text-5 font-bold ">{friday?.title}</h3>
        <span className="text-xs ">TẤT CẢ</span>
      </div>

      <div className="flex items-center justify-between  gap-[28px]" >
        {friday?.items?.map((item) => {
          return (
            <div
              key={item.encodeId}
              onClick={() => {
                navigate(item?.link?.split('.')[0])
              }}
              className="flex flex-col flex-auto w-1/5 text-sm gap-3 cursor-pointer "
            >
              <img src={item.thumbnailM} alt="avatar" className="w-full object-cover rounded-lg " />
              <div className="flex flex-col" >
                <span className="font-semibold" >{item.title}</span>
                <span>{`${item.sortDescription?.slice(0,40)}...`}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Section);
