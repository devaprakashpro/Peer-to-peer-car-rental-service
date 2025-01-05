import React, { useEffect } from 'react'
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from "../components/UI/CommonSection"
import { Col, Container, Row } from 'reactstrap'
import BookingForm from '../components/UI/BookingForm'

const UploadCar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <DocumentTitle title="Upload Car">
      <CommonSection title="Earn With Us" />
      <section>
        <Container>
          <Row>
            <Col lg="12" md="12">
              <h6 className="fw-bold mb-4">Earn By Uploading Your Car</h6>
              <BookingForm service="earn"/>
            </Col>
          </Row>
        </Container>
      </section>

    </DocumentTitle>
  )
}

export default UploadCar