import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Alert from "react-bootstrap/Alert"
import Form from "react-bootstrap/Form"

import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"
import Swal from "sweetalert2"

export default function UpdateProfile({changePassword, handleClosePassword}){
  const {setLoading} = useContext(MainContext)
  const [formUser, setFormUser] = useState({current_password: '', new_password: ''})
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setLoading(true)
    await api.post('/api/v1/users/change_password', {user: formUser}).then(({data}) => {
      Swal.fire({
        icon: 'success',
        text: 'Password updated successfully'
      })
      setError(null)
      handleClosePassword()
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  const handleChange = (e) => setFormUser({...formUser, [e.target.name]: e.target.value})

  return(
    <Modal show={changePassword} onHide={handleClosePassword}>
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { error && 
          <Alert variant="danger">
            {error}
          </Alert>
        }
        <Form.Group controlId="formBasicCurrentPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control type="password" name="current_password" value={formUser.current_password} onChange={handleChange} placeholder="Current Password" />
        </Form.Group>
        <Form.Group controlId="formBasicNewPassowrd">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" name="new_password" value={formUser.new_password} onChange={handleChange} placeholder="New Password" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePassword}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}