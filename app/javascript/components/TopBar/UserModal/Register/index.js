import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { ButtonGroup } from "../style"
import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"

export default function RegisterForm({ setFormType, setError }){
  const {setLogged, setLoading} = useContext(MainContext)
  const [register, setRegister] = useState({
    first_name: '',
    last_name: '',
    password: '',
    email: '',
    image_url: ''
  })

  const handleChange = (e) => {
    setRegister({...register, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.post('/api/v1/users', {user: register}).then(res => {
      setLogged(true)
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  return(
    <Form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col s6">
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="first_name" value={register.first_name} onChange={handleChange} placeholder="First Name" />
          </Form.Group>
        </div>
        <div className="col s6">
          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="last_name" value={register.last_name} onChange={handleChange} placeholder="Last Name" />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col s6">
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={register.password} onChange={handleChange} placeholder="Password" />
          </Form.Group> 
        </div>
        <div className="col s6">
          <Form.Group controlId="formBasicImage">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={register.email} onChange={handleChange} placeholder="Email" />
          </Form.Group>
        </div>
      </div>
      <Form.Group controlId="formBasicImageUrl">
        <Form.Label>Image Url</Form.Label>
        <Form.Control type="text" name="image_url" value={register.image_url} onChange={handleChange} placeholder="Image Url" />
      </Form.Group>
      <div className="text-right">
        <a href="#" onClick={() => setFormType('login')} >Login</a> |&nbsp;
        <a href="#" onClick={() => setFormType('forgotPassword')} >Forgot Password?</a>
        <ButtonGroup>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </ButtonGroup>
      </div>
    </Form>   
  )
}