import React, { useEffect } from "react";
import { Slider } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-y-auto w-full">
      <Slider />
    </div>
  );
};

export default Home;
