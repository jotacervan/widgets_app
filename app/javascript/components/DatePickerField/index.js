import React, { useState, useEffect } from "react"
import Datetime from "react-datetime"
import Form from "react-bootstrap/Form"
import moment from "moment"
import "react-datetime/css/react-datetime.css"

export default function DatePickerField({value, handleChange}){

  const [date, setDate] = useState('')

  useEffect(() => {
    if(value){
      let dateString = moment.unix(value).toDate();
      setDate(dateString)
    }
  }, [])

  const handleDateChange = (value) => {
    let timeStamp = value.unix()
    setDate(value)
    console.log(timeStamp)
    handleChange({
      target: {
        value: timeStamp,
        name: 'date_of_birth'
      }
    })
  }

  return(
    <Form.Group controlId="formBasicDateOfBirth">
      <Form.Label>Date of Birth</Form.Label>
      <Datetime timeFormat={false} value={date} onChange={handleDateChange} />
    </Form.Group>
  )

}