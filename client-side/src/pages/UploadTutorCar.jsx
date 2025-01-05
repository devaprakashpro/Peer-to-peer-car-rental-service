import React, { useEffect } from 'react'
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from "../components/UI/CommonSection"
import { Col, Container, Row } from 'reactstrap'
import BookingForm from '../components/UI/BookingForm'


const UploadTutorCar = () => {
    useEffect(()=>{
        window.scrollTo(0,0)
    }, [])
      return (
        <DocumentTitle title="Tutor Car Details">
          <CommonSection title="Your Car Details" />
          <section>
            <Container>
              <Row>
                <Col lg="12" md="12">
                  <h6 className="fw-bold mb-4">Earn By Uploading Your Car</h6>
                  <BookingForm service="tutorCar"/>
                </Col>
              </Row>
            </Container>
          </section>
    
        </DocumentTitle>
      )
}

export default UploadTutorCar