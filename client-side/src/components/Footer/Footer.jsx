import React from 'react'
import {Container, Row, Col, ListGroup, ListGroupItem} from "reactstrap"
import { Link } from "react-router-dom";
import "../../styles/footer.css"
import { AiFillCar, AiFillCopyrightCircle } from 'react-icons/ai';
import {RiSendPlaneLine} from "react-icons/ri"

const Footer = () => {
  const year = new Date().getFullYear()

  const quickLinks = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/tutors",
      display: "Tutors",
    },
    {
      path: "/cars",
      display: "Renting cars",
    },
    {
      path: "/blogs",
      display: "Blog",
    },
    {
      path: "/about",
      display: "About",
    },
    {
      path: "/earn-with-us",
      display: "Earn with us",
    },
    {
      path: "/join-us",
      display: "Join us",
    },
    {
      path: "#",
      display: "Privacy Policy",
    },
    {
      path: "/contact",
      display: "Contact",
    },
  ];
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className="d-flex align-items-center gap-2">
                  <AiFillCar size={150} color='#fff'/>
                  <span>CarCoach</span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
              quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
              Delectus et ad illo recusandae temporibus?
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">Egypt, Cairo, El-Sheikh Zayed</p>
              <p className="office__info">Phone: +1-202-555-0149</p>

              <p className="office__info">Email: carcoach578@gmail.com</p>

              <p className="office__info">Office Time: 7am - 10pm</p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <RiSendPlaneLine size={25} color='#ffff'/>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                <AiFillCopyrightCircle />Copyright {year}, Developed by
                CarCoach. All rights reserved.
              </p>
            </div>
          </Col>

        </Row>
      </Container>

    </footer>
  )
}

export default Footer