import React, { useState, useContext } from "react"
import Card from "react-bootstrap/Card"
import CardColumns from "react-bootstrap/CardColumns"
import Image from "react-bootstrap/Image"
import Swal from "sweetalert2"

import { Container } from "./style"
import WidgetForm from "@components/WidgetForm"
import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"


export default function WidgetCatalog({widgets, setWidgets, catalogType}){
  const {setLoading} = useContext(MainContext)
  const [showForm, setShowForm] = useState(false)
  const [activeWidget, setActiveWidget] = useState([{},null])

  const showModal = (widget,i) => {
    setShowForm(true)
    setActiveWidget([widget,i])
  }
  const handleCloseWidget = () => setShowForm(false)

  const handleDelete = async (widget) => {
    setLoading(true)
    await api.delete(`/api/v1/widgets/${widget.id}`).then(res => {
      Swal.fire({
        icon: 'success',
        text: 'Deleted successfully'
      }).then(() => {
        setWidgets(widgets => widgets.filter(w => w.id !== widget.id))
      })
    }).catch(res => {
      Swal.fire({
        icon: 'error',
        text: 'Unable to delete, please try again later'
      })
    })
    setLoading(false)
  }

  return(
    <Container>
      <CardColumns>
        { widgets.map((widget,i) => (
          <Card key={widget.id}>
            <Card.Body>
              <Card.Title>{widget.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <Image className="thumb-user" src={widget.user.images.small_url} thumbnail roundedCircle />
                {widget.user.name}
              </Card.Subtitle>
              <Card.Text>
                {widget.description}
              </Card.Text>
              { catalogType === "public" ?
                <Card.Link href="#">Creator page</Card.Link>
              :
                <>
                  <Card.Link href="#" onClick={() => showModal(widget,i)}>Edit</Card.Link>
                  <Card.Link href="#" onClick={() => handleDelete(widget)}>Delete</Card.Link>
                </>
              }
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
      <WidgetForm
        formType="update"
        widgets={widgets}
        data={activeWidget}
        showCreate={showForm}
        setWidgets={setWidgets}
        handleCloseWidget={handleCloseWidget}
      />
    </Container>
  )
}