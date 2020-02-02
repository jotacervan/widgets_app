import React, { useContext, useState, useEffect } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Swal from "sweetalert2"

import { Container } from "./style"
import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"
import WidgetCatalog from "@components/WidgetCatalog"

export default function UserPage({match, history}){
  const {setLoading} = useContext(MainContext)
  const [user, setUser] = useState({})
  const [widgets, setWidgets] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get(`/api/v1/users/${match.params.id}`).then(({data}) => {
      setUser(data.user)
      api.get(`/api/v1/users/${data.user.id}/widgets`).then(({data}) => {
        setWidgets(data.widgets)
      }).catch(({response}) => {
        Swal.fire({
          icon: 'error',
          text: response.data.message
        }).then(() => history.push('/'))
      })
    }).catch(({response}) => {
      Swal.fire({
        icon: 'error',
        text: response.data.message
      }).then(() => history.push('/'))
    })

  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.get(`/api/v1/users/${user.id}/widgets`, { params: { term: search } }).then(({data}) => {
      setWidgets(data.widgets)
    }).catch(({response}) => {
      Swal.fire({
        icon: 'Error',
        text: response.data.message
      })
    })
    setLoading(false)
  }
  
  return user.id ? (
    <Container>
      <div className="header">
        <div className="profile-header">
          <Image className="profile-picture" src={user.images.medium_url} thumbnail roundedCircle />
          <div>
            <h3>{user.name}</h3>
          </div>
        </div>
        
      </div>
      <h3 className="text-center">Widget Catalog</h3>
      <br />
      <Form onSubmit={handleSearch}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search widgets"
            aria-label="Search widgets"
            aria-describedby="basic-addon2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroup.Append>
            <Button type="submit" variant="outline-secondary" >Search</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      { widgets.length > 0 ? <WidgetCatalog widgets={widgets} setWidgets={setWidgets} catalogType="public" /> : 
        <Alert variant="secondary">
          You don't have widgets yet.
        </Alert>
      }
    </Container>
  ) : (
    <h3>Loading ...</h3>
  )

}