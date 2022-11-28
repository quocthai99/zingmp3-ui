import React, { memo, useEffect, useState, useRef } from "react";
import { Line } from 'react-chartjs-2';
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import _ from "lodash"
import { Link } from "react-router-dom";

import bgChart from "../assets/bg-chart.jpg";
import path from "../ultis/path";
import icons from "../ultis/icons";

import {SongItem} from "./"

const {BsPlayCircle} = icons

const ChartSection = () => {
  const [data, setData] = useState(null)
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0
  })
  const [selected, setSelected] = useState(null)
  const {chart, rank} = useSelector(state => state.app)
  const chartRef = useRef()
  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRadio: false,
    scales: {
        y: {
            ticks: { display: false },
            grid: { color: 'rgba(255,255,255,0.3)', drawTicks: false },
            min: chart?.minScore,
            max: chart?.maxScore,
            border: { dash: [3,4]}
        },
        x: {
            ticks: { color: 'white' },
            grid: { color: 'transparent' }
        }
    },
    plugins: {
        legend: false,
        tooltip: {
          enabled: false,
          external: ({tooltip}) => {
            if (!chartRef || !chartRef.current) return
            if (tooltip.opacity === 0) {
              if (tooltipState.opacity !== 0) setTooltipState(prev => ({...prev, opacity: 0}))
              return
            }
            const counters = []
            for ( let i = 0; i < 3; i++) {
              counters.push({
                data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
                encodeId: Object.keys(chart?.items)[i]
              })
            }
            const rs = counters.find(i => i.data.some(n => n === +tooltip.body[0]?.lines[0]?.replace(',', '')))
            setSelected(rs.encodeId)
            const newTooltipData = {
              opacity: 1,
              left: tooltip.caretX,
              top: tooltip.caretY
            }
            if (!_.isEqual(tooltipState, newTooltipData)) setTooltipState(newTooltipData)
          }
        }
    },
    hover: {
      mode: 'dataset',
      intersect: false
  }
}
console.log(tooltipState);

  useEffect(() => {
    const labels = chart?.times?.filter(item => +item.hour % 2 === 0)?.map(item => `${item.hour}:00`)
    const datasets = []
    if (chart?.items) {
      for( let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]?.filter(item => +item.hour % 2 === 0)?.map(item => item.counter),
          borderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          tension: 0.2,
          borderWidth: 2,
          pointHoverRadius: 5,
          pointBackgroundColor: 'white',
          pointHitRadius: 5,
          pointBorderColor: i === 0 ? '#4a90e2' : i === 1 ? '#50e3c2' : '#e35050',
          animation: false,
          pointHoverBorderWidth: 5
        })
      }
    }
    setData({labels, datasets});

  }, [chart])
    
  return (
    <div className="px-[59px] mt-12 relative max-h-[430px] rounded-md">
      <img
        src={bgChart}
        alt=""
        className="w-full object-cover rounded-md max-h-[430px] "
      />
      <div className="absolute top-0 left-[59px] right-[59px] bottom-0 z-10 bg-gradient-to-t from-[rgba(77,34,174,0.5)] to-[rgba(115,20,140,0.5)] " ></div>
      <div className="absolute bottom-0 top-0 left-[59px] right-[59px] z-20 p-5 flex flex-col gap-8" >
        <Link to={path.ZING_CHART} className="flex items-center gap-2 text-white hover:text-green-700" >
          <h3 className="text-2xl  font-bold ">#zingchart</h3>
          <span className="text-white" ><BsPlayCircle size={20} /></span>
        </Link>
        <div className="flex gap-4 h-full">
          <div className="flex-3 flex flex-col gap-2" >
            {rank?.filter((i,index) => index < 3)?.map((item,index) => (
              <SongItem
                key={item.encodeId}
                sid={item.encodeId}
                thumbnail={item.thumbnail}
                title={item.title}
                artists={item.artistsNames}
                order={index + 1}
                percent= {Math.round(+item?.score * 100 / +chart?.totalScore)}
                style='text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945EA7] '
              />
            ))}
            <Link to={path.ZING_CHART} className="text-white px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit m-auto " >
              Xem them
            </Link>
          </div>
          <div className="flex-7 h-[90%] relative " >
            {data && <Line data={data} ref={chartRef} options={options} />}
            <div className="tooltip" style={{top: tooltipState.top, left: tooltipState.left, opacity: tooltipState.opacity, position: "absolute"}} >
              <SongItem
                thumbnail={rank?.find(i => i.encodeId === selected)?.thumbnail}
                artists={rank?.find(i => i.encodeId === selected)?.artistsNames}
                title={rank?.find(i => i.encodeId === selected)?.title}
                sid={rank?.find(i => i.encodeId === selected)?.encodeId}
                style='bg-white'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChartSection);
