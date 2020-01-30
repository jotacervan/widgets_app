import React, { useState, useContext } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"

import { MainContext } from "@/contexts/MainContext"
import UserModal from "./UserModal"

export default function TopBar(){
  const [loginModal, setLoginModal] = useState(false)
  const [logged,  setLogged] = useContext(MainContext)

  const handleOpen = () => setLoginModal(true)
  const handleClose = () => setLoginModal(false)

  return(
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Widget App</Navbar.Brand>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            <Nav.Link href={void(0)} onClick={handleOpen} >Login</Nav.Link>
            <UserModal loginModal={loginModal} handleClose={handleClose} /> 
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
