import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter} from "react-router-dom"
import Container from "react-bootstrap/Container"

import Routes from "../Routes"
import TopBar from "./TopBar"
import MainProvider from "../contexts/MainContext"
import { MainContent } from "./style"

export default function Index({logged}){
  return (
    <MainContent>
      <BrowserRouter>
        <MainProvider loggedIn={logged}>
          <TopBar />
          <Container>
            <Routes />
          </Container>
        </MainProvider>
      </BrowserRouter>
    </MainContent>
  );
}
