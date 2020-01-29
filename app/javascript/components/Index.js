import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter} from "react-router-dom"

import Routes from "../Routes"

export default function Index(){
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}
