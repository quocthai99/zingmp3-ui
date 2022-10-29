import icons from "./icons";

const { MdOutlineLibraryMusic, BiDisc, TbChartArcs, HiOutlineChartPie } = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icon: <MdOutlineLibraryMusic />
  },
  {
    path: "",
    text: "Khám phá",
    end: true,
    icon: <BiDisc />
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icon: <TbChartArcs />
  },
  {
    path: "follow",
    text: "Theo dỗi",
    icon: <HiOutlineChartPie />
  },
];
