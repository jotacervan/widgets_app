import React, { useState, useContext } from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NavDropdown from "react-bootstrap/NavDropdown"
import Swal from "sweetalert2"

import { MainContext } from "@/contexts/MainContext"
import UserModal from "./UserModal"
import api from "@src/api"

export default function TopBar(){
  const [loginModal, setLoginModal] = useState(false)
  const {logged,setLogged,user,setUser} = useContext(MainContext)

  const handleOpen = () => setLoginModal(true)
  const handleClose = () => setLoginModal(false)
  const handleLogout = () => {
    api.post('/api/v1/auth/revoke').then(res => {
      setLogged(false)
      setUser({})
      Swal.fire({
        text: 'Logged Out succesfully',
      })
    }).catch(res => {
      console.log(res)
    })
  }

  return(
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Widget App</Navbar.Brand>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>
            { logged ? 
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">My Widgets</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">New Widget</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href={void(0)} onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            :
              <>
                <Nav.Link href={void(0)} onClick={handleOpen} >Login</Nav.Link>
                <UserModal loginModal={loginModal} handleClose={handleClose} /> 
              </>
            }
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}
