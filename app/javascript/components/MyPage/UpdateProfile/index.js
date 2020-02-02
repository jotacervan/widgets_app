import React, { useState, useEffect, useContext } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"

import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"
import DatePickerField from "@components/DatePickerField"
import Swal from "sweetalert2"

export default function UpdateProfile({showProfile, handleCloseProfile}){
  const {
    user: {
      first_name,
      last_name,
      date_of_birth,
      images: {
        original_url: image_url
      }
    },setUser,setLoading} = useContext(MainContext)
  const [formUser, setFormUser] = useState({})

  useEffect(() => {
    setFormUser({
      first_name,
      last_name,
      date_of_birth,
      image_url
    })
  }, [first_name])

  const handleSubmit = async () => {
    setLoading(true)
    await api.put('/api/v1/users/me', {user: formUser}).then(({data}) => {
      Swal.fire({
        icon: 'success',
        text: 'User updated successfully'
      })
      setUser(data.user)
      handleCloseProfile()
    }).catch(({response}) => {
      Swal.fire({
        icon: 'error',
        text: response.data.message
      })
    })
    setLoading(false)
  }

  const handleChange = (e) => setFormUser({...formUser, [e.target.name]: e.target.value})

  return(
    <Modal show={showProfile} onHide={handleCloseProfile}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your informations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="first_name" value={formUser.first_name} onChange={handleChange} placeholder="First Name" />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="last_name" value={formUser.last_name} onChange={handleChange} placeholder="Last Name" />
        </Form.Group>
        <DatePickerField value={formUser.date_of_birth} handleChange={handleChange} />
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image_url" value={formUser.image_url} onChange={handleChange} placeholder="Image URL" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfile}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}