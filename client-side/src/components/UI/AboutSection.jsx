import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/images/cars-img/download-bmw-car-png-image-0.png";


const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "200px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Explore the world with VeloRent</h2>
              <p className="section__description">
                VeloRent is a car rental company that offers a wide range of cars
                for rent. We have a variety of cars to suit different needs and
                budgets. Our cars are well-maintained and clean, and we offer a
                hassle-free booking process. We also offer a variety of services
                to make your rental experience more enjoyable, such as GPS
                navigation and insurance coverage.
              </p>

              <div className="about__section-item d-flex">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Wide range of cars to
                  suit different needs and budgets
                </p>
                <br />

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Well-maintained and
                  clean cars
                </p>
              </div>

              <div className="about__section-item d-flex">
                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Hassle-free booking
                  process
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i class="ri-checkbox-circle-line"></i> Additional services
                  such as GPS navigation and insurance coverage
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AboutSection