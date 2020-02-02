import React, { useState, useContext, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Form from "react-bootstrap/Form"
import Alert from "react-bootstrap/Alert"
import Swal from "sweetalert2"
import update from 'immutability-helper';

import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"

export default function WidgetForm({formType, widgets, data = null, showCreate, setWidgets, handleCloseWidget}){
  const {setLoading} = useContext(MainContext)
  const [error, setError] = useState(null)
  const [widget, setWidget] = useState({
    name: '',
    description: '',
    kind: 'visible'
  })

  useEffect(() => {
    data && data[0].id && setWidget(data[0])
  }, [data])

  const handleChange = (e) => setWidget({...widget, [e.target.name]: e.target.value})

  const handleCreate = async () => {
    setLoading(true)
    setError(null)
    await api.post('/api/v1/widgets', { widget }).then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Widget created succesfully'
      })
      setError(null)
      setWidgets(widgets => [...widgets, res.data.widget])
      setWidget({
        name: '',
        description: '',
        kind: 'visible'
      })
      handleCloseWidget()
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  const handleUpdate = async () => {
    setLoading(true)
    setError(null)
    await api.put(`/api/v1/widgets/${widget.id}`, { widget }).then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Widget updated succesfully'
      })
      setWidgets(update(widgets, {[data[1]]: {$set: widget}}))
      handleCloseWidget()
    }).catch(({response}) => {
      setError(response.data.message)
    })
    setLoading(false)
  }

  return(
    <Modal show={showCreate} onHide={handleCloseWidget}>
      <Modal.Header closeButton>
        {formType === "create" ? 
          <Modal.Title>Create a new widget</Modal.Title>
        :
          <Modal.Title>Edit widget</Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        { error && 
          <Alert variant="danger">
            {error}
          </Alert>
        }
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={widget.name} onChange={handleChange} placeholder="Name" />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={widget.description} onChange={handleChange} placeholder="Description" />
        </Form.Group>
        <Form.Group controlId="formBasicKind">
          <Form.Label>Kind</Form.Label>
          <Form.Control as="select" name="kind" value={widget.kind} onChange={handleChange} placeholder="Kind" >
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseWidget}>
          Close
        </Button>
        <Button variant="primary" onClick={formType === 'create' ? handleCreate : handleUpdate}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}