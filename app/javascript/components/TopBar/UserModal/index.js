import React, { useState, useEffect } from "react"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"

import ForgotPassword from "./ForgotPassword"
import Login from "./Login"
import Register from "./Register"

export default function UserModal({ loginModal, handleClose }){
  const [formType, setFormType] = useState('login')
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [formType])

  return(
    <Modal size="lg" centered show={loginModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Login/Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error &&
          <Alert variant="danger">
            {error}
          </Alert>
        }
        { formType === 'login'    && <Login setFormType={setFormType} setError={setError} /> } 
        { formType === 'register' && <Register setFormType={setFormType} setError={setError} /> }
        { formType === 'forgotPassword' && <ForgotPassword setFormType={setFormType} setError={setError} /> }
      </Modal.Body> 
    </Modal>
  )

}
