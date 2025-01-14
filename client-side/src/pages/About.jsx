import React from 'react'
import { Col, Row, Container } from 'reactstrap'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'
import CommonSection from '../components/UI/CommonSection'
import AboutSection from '../components/UI/AboutSection'
import driveImg from "../assets/images/slider-img/car-img3.jpg";
import BecomeDriverSection from '../components/UI/BecomeDriverSection'
import OurMembers from '../components/UI/OurMembers'


const About = () => {
  return (
    <DocumentTitle title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__page-img">
                <img src={driveImg} alt="" className="w-100 rounded-3" />
              </div>
            </Col>

            <Col lg="6" md="6" sm="12">
              <div className="about__page-content">
                <h2 className="section__title">
                  The Leading Car Rental Company in USA
                </h2>

                <p className="section__description">
                  We are a company that provides a wide range of car rental
                  services. Our fleet consists of various types of vehicles,
                  including luxury cars, SUVs, and vans. We also offer a variety
                  of rental options, such as daily, weekly, and monthly rentals.
                </p>

                <p className="section__description">
                  Our team is dedicated to providing a high level of customer
                  service and ensuring that our customers have a great
                  experience when renting a car from us. We strive to make the
                  rental process as smooth and convenient as possible.
                </p>

                <div className=" d-flex align-items-center gap-3 mt-4">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>

                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4>+91 93854 21977</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <BecomeDriverSection />
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMembers />
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default About