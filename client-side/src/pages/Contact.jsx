import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle.js";
import CommonSection from "../components/UI/CommonSection";
import swal from "sweetalert"
import axios from "axios"

import "../styles/contact.css";

const socialLinks = [
  {
    url: "#",
    icon: "ri-facebook-line",
  },
  {
    url: "#",
    icon: "ri-instagram-line",
  },
  {
    url: "#",
    icon: "ri-linkedin-line",
  },
  {
    url: "#",
    icon: "ri-twitter-line",
  },
];

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [response, setRespone] = useState({});
  const [errorMessage, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const userId = useParams().id;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://carcoach-apis.onrender.com/api/contact-us/${userId?userId:""}`, {
        name: name,
        email: email,
        message: message
      });
      const responseData  = await response.data;
      setRespone(responseData)
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
      if(error){
        swal({
          title: "An error occurred",
          text: errorMessage,
          icon: "error",
          button: "close",
        });
      }
    }
  };

useEffect(() => {
  if(success){
    if(response.doneMessage){
      swal({
        title: "Thank you for contacting us!",
        text: response.doneMessage,
        icon: "success",
        button: "Done",
      });
    }
    if(response.unauthorizedMessage){
      swal({
        title: "Unauthorized",
        text: response.unauthorizedMessage,
        icon: "error",
        button: "close",
      });
    }
  }
}, [success, response]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <DocumentTitle title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form onSubmit={handleSubmit}>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Your Message Here..."
                    className="textarea textarea__contact"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  ></textarea>
                </FormGroup>

                <Button className="contact__btn" type="submit">
                  Send Message
                </Button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>
                <p className="section__description mb-0">
                  123 El Sheikh Zayed, Cairo, Egypt
                </p>
                <div className=" d-flex align-items-center gap-2">
                  <h6 className="fs-6 mb-0">Phone:</h6>
                  <p className="section__description mb-0">+1-202-555-0149</p>
                </div>

                <div className=" d-flex align-items-center gap-2">
                  <h6 className="mb-0 fs-6">Email:</h6>
                  <p className="section__description mb-0">carcoach578@gmail.com</p>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>

                <div className=" d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                    >
                      <i class={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </DocumentTitle>
  );
};

export default Contact;
