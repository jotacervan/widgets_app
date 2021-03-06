import React, { useContext, useState, useEffect } from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown"
import Alert from "react-bootstrap/Alert"
import Swal from "sweetalert2"

import { Container } from "./style"
import { MainContext } from "@/contexts/MainContext"
import api from "@src/api"
import WidgetCatalog from "@components/WidgetCatalog"
import WidgetForm from "@components/WidgetForm"
import UpdateProfile from "./UpdateProfile"
import ChangePassword from "./ChangePassword"

export default function MyPage({history}){
  const {user,setLoading} = useContext(MainContext)
  const [widgets, setWidgets] = useState([])
  const [search, setSearch] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [changePassword, setChangePassword] = useState(false)

  const handleCloseWidget = () => setShowCreate(false)
  const handleCloseProfile = () => setShowProfile(false)
  const handleClosePassword = () => setChangePassword(false)

  useEffect(() => {
    api.get('/api/v1/users/me/widgets').then(({data}) => {
      setWidgets(data.widgets)
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
    await api.get('/api/v1/users/me/widgets', { params: { term: search } }).then(({data}) => {
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
            <h3>Hello {user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        
        <div className="profile-buttons">
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Update
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => setShowProfile(true)}>Profile Infos</Dropdown.Item>
              <Dropdown.Item href="#" onClick={() => setChangePassword(true)}>Change Password</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="dark" onClick={() => setShowCreate(true)}>Create Widget</Button>
        </div>

        <ChangePassword 
          changePassword={changePassword} 
          handleClosePassword={handleClosePassword} 
        />

        <UpdateProfile 
          showProfile={showProfile} 
          handleCloseProfile={handleCloseProfile} 
        />

        <WidgetForm
          formType="create"
          showCreate={showCreate}
          setWidgets={setWidgets}
          handleCloseWidget={handleCloseWidget}
        />
        
      </div>
      <h3 className="text-center">Your Widget Catalog</h3>
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
      { widgets.length > 0 ? <WidgetCatalog widgets={widgets} setWidgets={setWidgets} /> : 
        <Alert variant="secondary">
          You don't have widgets yet.
        </Alert>
      }
    </Container>
  ) : (
    <h3>Loading ...</h3>
  )

}