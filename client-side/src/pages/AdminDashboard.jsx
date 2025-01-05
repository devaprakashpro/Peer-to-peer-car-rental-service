import React, { useState } from 'react'
import "../styles/admin.css"
import {Link, useParams} from 'react-router-dom'
import AdminDetails from '../components/UI/AdminDetails'

const AdminDashboard = ({name}) => {
  const [paramId, setParamId] = useState(useParams().id)
  return (
    <div className='admin__page'>
        <div className='admin__layout'>  
          <div className='left__admin'>
            <Link to={`/admin/${paramId}/users`}>
              <h4>users</h4>
            </Link>
            <Link to={`/admin/${paramId}/tutors_applicants`}>
              <h4>Tutors</h4>
            </Link>
            <Link to={`/admin/${paramId}/tutor_reservations`}>
              <h4>Reservations</h4>
            </Link>
            <Link to={`/admin/${paramId}/rental_reservations`}>
              <h4>Renting</h4>
            </Link>
            <Link to={`/admin/${paramId}/car_uploads`}>  
              <h4>Car Uploads</h4>
            </Link>
            <Link to={`/admin/${paramId}/students`}>  
              <h4>Students</h4>
            </Link>
            <Link to={`/admin/${paramId}/sessions`}>  
              <h4>Sessions</h4>
            </Link>
            <Link to={`/admin/${paramId}/renters`}>  
              <h4>Renters</h4>
            </Link>
            <Link to={`/admin/${paramId}/contacts`}>  
              <h4>Contacts</h4>
            </Link>
          </div>
          <div className='right__admin'>
            <AdminDetails />
          </div>
        </div>
    </div>
  )
}

export default AdminDashboard