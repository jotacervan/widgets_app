import React, { useState, useContext } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import { MainContext } from "@/contexts/MainContext"
import { ButtonGroup } from "../style"
import api from "@src/api"

export default function ForgotPassword({ setFormType, setError }) {
  const {setLoading} = useContext(MainContext)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    await api.post('/api/v1/users/reset_password', {user: {email} }).then(res => {
      console.log(res)
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" name="username" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
      </Form.Group>
      <div className="text-right">
        <a href="#" onClick={() => setFormType('login')} >Login</a> |&nbsp;
        <a href="#" onClick={() => setFormType('register')} >Create an account</a>
        <ButtonGroup>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </ButtonGroup>
      </div>
    </Form>
  )
}