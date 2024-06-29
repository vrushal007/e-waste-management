import { Person2, QuestionAnswer, Recycling } from "@mui/icons-material";

import SvgColor from "../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  // {
  //   title: "dashboard",
  //   path: "/",
  //   icon: icon("ic_analytics"),

  // },
  {
    title: "user",
    path: "/user",
    icon: icon("ic_user"),
    access: ["admin"],
  },
  // {
  //   title: "product",
  //   path: "/products",
  //   icon: icon("ic_cart"),
  // },
  // {
  //   title: "blog",
  //   path: "/blog",
  //   icon: icon("ic_blog"),
  // },
  {
    title: "Recyclers",
    path: "/recyclers",
    icon: <Recycling />,
    access: ["admin", "user"],
  },
  {
    title: "Collector",
    path: "/collector",
    icon: <Person2 />,
    access: ["admin", "recycler"],
  },
  {
    title: "My Requests",
    path: "/my-requests",
    icon: <QuestionAnswer />,
    access: ["admin", "user"],
  },
  {
    title: "User Orders",
    path: "/user-orders",
    icon: icon("ic_cart"),
    access: ["admin", "user"],
  },
  {
    title: "Assigned Orders",
    path: "/assigned-orders",
    icon: icon("ic_cart"),
    access: ["admin", "collector"],
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
