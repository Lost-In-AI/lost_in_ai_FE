import React from "react";
import type { NavigationType } from "../../types/type";
import Home from "../pages/Home";
// import AuthContainer from "../pages/AuthContainer";

export const navigation: NavigationType[] = [
  {
    path: "/",
    element: React.createElement(Home),
    name: "Home",
  },
  // {
  //   path: "/login",
  //   element: React.createElement(AuthContainer, { isLogin: true }),
  //   name: "Login",
  // },
  // {
  //   path: "/register",
  //   element: React.createElement(AuthContainer, { isLogin: false }),
  //   name: "Register",
  // },
  // aggiungi qui altre pagine, se serviranno
];
