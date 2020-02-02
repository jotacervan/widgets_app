import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export default function UpdateProfile({showProfile, handleCloseProfile}){
  return(
    <Modal show={showProfile} onHide={handleCloseProfile}>
      <Modal.Header closeButton>
        <Modal.Title>Edit your informations</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfile}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCloseProfile}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}