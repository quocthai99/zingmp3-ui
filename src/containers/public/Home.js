import React, { useEffect } from "react";
import { Slider, Section, NewRelease, ChartSection } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { friday, newEveryday, top100, xone, newMusic } = useSelector((state) => state.app);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getHome());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="overflow-y-auto w-full mb-40">
      <Slider />
      <Section data={friday} />
      <Section data={newEveryday} />
      <NewRelease />
      <Section data={top100} />
      <ChartSection />
      <Section data={xone} />
      <Section data={newMusic} />
    </div>
  );
};

export default Home;
