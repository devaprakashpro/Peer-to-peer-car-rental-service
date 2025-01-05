import React, { useEffect } from 'react'
import "../styles/priceCard.css"
import PriceCard from '../components/UI/PriceCard'
import { Col, Container, Row } from 'reactstrap'
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import CommonSection from "../components/UI/CommonSection"

const Pricing = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  return (
    <DocumentTitle title="Pricing">
      <CommonSection title="Our Pricing Plans" />
      <section >
        <Container>
          <Row className='price padding'>
            <Col lg="12" md="12">
              <PriceCard />
            </Col>
          </Row>
        </Container>
      </section>

    </DocumentTitle>
  )
}

export default Pricing