import React from 'react'
import "../../styles/reserve-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from 'react-router-dom';

const ReserveForm = () => {
  return (
    <Form className="form">
    <div className=" d-flex align-items-center justify-content-between flex-wrap">
      <FormGroup className="form__group">
        <input type="text" placeholder="Address" required />
      </FormGroup>

      <FormGroup className="form__group">
        <input type="date" placeholder="Start date" required />
      </FormGroup>

      <FormGroup className="form__group">
      <input
        className="journey__time"
        type="time"
        required
      />

      </FormGroup>
      <FormGroup className="select__group">
        <select>
          <option value="automatic">Automatic Car</option>
          <option value="manual">Manual Car</option>
        </select>
      </FormGroup>

      <FormGroup className="form__group">
        <Link to="/tutors">
          <button className="btn find__car-btn">Find Tutor</button>
        </Link>
      </FormGroup>
    </div>
  </Form>
  )
}

export default ReserveForm



