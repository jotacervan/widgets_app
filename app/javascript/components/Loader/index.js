import React from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Container } from "./style"

export default function Loader(){
  return(
    <Container>
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
    </Container>
  )
}