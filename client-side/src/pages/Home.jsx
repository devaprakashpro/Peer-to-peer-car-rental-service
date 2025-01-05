import React, { useEffect, useState } from 'react'
import HeroSlider from '../components/UI/HeroSlider'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'
import {Row, Col, Container} from "reactstrap"
import ReserveForm from '../components/UI/ReserveForm'
import AboutSection from '../components/UI/AboutSection'
import ServicesList from '../components/UI/ServicesList'
import CarItem from '../components/UI/CarItem'
import BecomeDriverSection from '../components/UI/BecomeDriverSection'
import Testimonials from '../components/UI/Testimonials'
import BlogList from '../components/UI/BlogList'
import axios from 'axios'

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get('https://carcoach-apis.onrender.com/api/car-uploads-all');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
      <DocumentTitle title="Home">
        <section className="p-0 hero__slider-section">
          <HeroSlider />
          
          <div className="hero__form">
            <Container>
              <Row className="form__row">
                <Col lg="4" md="4">
                  <div className="find__cars-left">
                    <h2>Reserve Your Sessions Here</h2>
                  </div>
                </Col>

                <Col lg="8" md="8" sm="12">
                  <ReserveForm />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
        {/* =========== about section ================ */}
        <AboutSection aboutClass="notAboutPage"/>
      {/* ========== services section ============ */}        
        <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">See our</h6>
              <h2 className="section__title">Popular Services</h2>
            </Col>
            <ServicesList />
          </Row>
        </Container>
      </section>
      {/* =========== car offer section ============= */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {data?data.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            )):(<p>Loading data...</p>)}
          </Row>
        </Container>
      </section>
      {/* =========== become a driver section ============ */}
      <BecomeDriverSection />
      {/* =========== testimonial section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-4 text-center">
              <h6 className="section__subtitle">Our clients says</h6>
              <h2 className="section__title">Testimonials</h2>
            </Col>
            <Testimonials />
          </Row>
        </Container>
      </section>
      {/* =============== blog section =========== */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5 text-center">
              <h6 className="section__subtitle">Explore our blogs</h6>
              <h2 className="section__title">Latest Blogs</h2>
            </Col>

            <BlogList />
          </Row>
        </Container>
      </section>


      </DocumentTitle>
  )
}

export default Home