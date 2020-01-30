import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { ButtonGroup } from "./style"

export default function UserModal({ loginModal, handleClose }){
  const [formType, setFormType] = useState('login')

  return(
    <Modal size="lg" centered show={loginModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Login/Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { formType === 'login'    && <LoginForm setFormType={setFormType} /> } 
        { formType === 'register' && <RegisterForm setFormType={setFormType} /> }
      </Modal.Body> 
    </Modal>
  )

}

function LoginForm({ setFormType }){
  const handleSubmit = (e) => e.preventDefault();
  const formType = () => setFormType('register')

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group> 
      <ButtonGroup>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="primary" onClick={formType} type="button">
          Register
        </Button>
      </ButtonGroup>
    </Form>
  )
}

function RegisterForm({ setFormType }){
  const handleSubmit = (e) => e.preventDefault();
  const formType = () => setFormType('login')

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="First Name" />
      </Form.Group>
      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Last Name" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group> 
      <Form.Group controlId="formBasicImage">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group controlId="formBasicImageUrl">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" placeholder="Image Url" />
      </Form.Group>

      <ButtonGroup>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <Button variant="primary" onClick={formType} type="button">
          Login 
        </Button>
      </ButtonGroup>
    </Form>   
  )
}
