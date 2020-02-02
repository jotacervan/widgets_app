import React, { useState, useEffect, useContext } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Swal from "sweetalert2"

import api from "@src/api"
import { Container } from "./style"
import { MainContext } from "@/contexts/MainContext"
import WidgetCatalog from "@components/WidgetCatalog"

export default function Widget(){
  const {setLoading} = useContext(MainContext)
  const [widgets, setWidgets] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/api/v1/widgets/visible').then(({data}) => {
      setWidgets(data.widgets)
      setLoading(false)
    }).catch(({response}) => {
      setLoading(false)
      Swal.fire({
        icon: 'Error',
        text: response.data.message
      })
    })
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    await api.get('/api/v1/widgets/visible', { params: { term: search } }).then(({data}) => {
      setWidgets(data.widgets)
    }).catch(({response}) => {
      Swal.fire({
        icon: 'Error',
        text: response.data.message
      })
    })
    setLoading(false)
  }

  return(
    <Container>
      <h3 className="text-center">Widget Catalog</h3>
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
      <WidgetCatalog widgets={widgets} catalogType="public" />
    </Container>
  )
}
