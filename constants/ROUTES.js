import React from "react";

import { GrTechnology } from "react-icons/gr";
import { TiNews } from "react-icons/ti";
import { MdSportsBasketball } from "react-icons/md";
import { MdScience } from "react-icons/md";
import { GiNothingToSay } from "react-icons/gi";
import { FaPeopleCarry } from "react-icons/fa";

const MAIN_ROUTES = [
  {
    title: "News",
    titlePT: "Notícias",
    link: "/category/news",
    index: 0,
    icon: <TiNews />,
  },
  {
    title: "Sciences",
    titlePT: "Ciências",
    link: "/category/sciences",
    index: 1,
    childIds: [6, 7, 8],
    icon: <MdScience />,
  },
  // {
  //   title: "Tech",
  //   titlePT: "Tecnologia",
  //   link: "/category/tech",
  //   index: 2,
  //   icon: <GrTechnology />,
  // },
  {
    title: "Sports",
    titlePT: "Desporto",
    link: "/category/sports",
    index: 2,
    icon: <MdSportsBasketball />,
  },
  // {
  //   title: "Business",
  //   titlePT: "Negócios",
  //   link: "/business",
  //   index: 4,
  //   icon: <MdBusiness />,
  // },
  {
    title: "Culture",
    titlePT: "Cultura",
    link: "/category/culture",
    index: 3,
    icon: <FaPeopleCarry />,
  },
  {
    title: "Opinion",
    titlePT: "Opinião",
    link: "/category/opinion",
    index: 4,
    icon: <GiNothingToSay />,
  },
];

export default MAIN_ROUTES;
