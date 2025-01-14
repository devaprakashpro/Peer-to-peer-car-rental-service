import React from "react";
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";

import driverImg from "../../assets/images/toyota-offer-2.png";
import { Link } from "react-router-dom";

const BecomeDriverSection = () => {
  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Monetize your car and earn up to 1,000 a month. We connect car
              owners with people who need a car.
            </h2>
            <div className="earn__container">
            <Link to="/join-us" className="align-self-center">
                <button className="btn become__driver-btn mt-4">
                Become a Driver
                </button>
            </Link>
            <Link to="/earn-with-us">
                <button className="btn become__driver-btn mt-4">
                Upload your Car
                </button>
            </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BecomeDriverSection;
