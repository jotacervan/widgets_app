import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { ButtonGroup } from "../style"
import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"

export default function LoginForm({ setFormType, setError }){
  const {setLogged, setLoading} = useContext(MainContext)
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.post('/api/v1/auth', loginForm).then(res => {
      setLogged(true)
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  const handleChange = (e) => {
    setLoginForm({...loginForm, [e.target.name]: e.target.value})
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" name="username" value={loginForm.username} onChange={handleChange} placeholder="Username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" value={loginForm.password} onChange={handleChange} placeholder="Password" />
      </Form.Group> 
      <div className="text-right">
        <a href="#" onClick={() => setFormType('forgotPassword')} >Forgot Password?</a> |&nbsp;
        <a href="#" onClick={() => setFormType('register')} >Create an account</a>
        <ButtonGroup>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  )
}