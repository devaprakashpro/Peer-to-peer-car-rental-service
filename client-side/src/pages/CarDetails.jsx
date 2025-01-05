import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from '../components/DocumentTitle/DocumentTitle';
import { useParams } from "react-router-dom";
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import axios from 'axios';


const CarDetails = () => {
  const { carId } = useParams();
  const [data, setData] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://carcoach-apis.onrender.com/api/car-uploads/${carId}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  return (
    <DocumentTitle title={data?.model}>
    <section>
    <Container>
    {data?(
          <Row>
            <Col lg="6">
              <img src={data.car_image} alt="" className="w-100" />
            </Col>
            <Col lg="6">
              <div className="car__info">
                <h2 className="section__title">{data.model}</h2>

                <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                  <h6 className="rent__price fw-bold fs-4">
                    ${data.hour_price}.00 / Day
                  </h6>

                  <span className=" d-flex align-items-center gap-2">
                    <span style={{ color: "#f9a826" }}>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                      <i class="ri-star-s-fill"></i>
                    </span>
                    ({data.rating} ratings)
                  </span>
                </div>

                <p className="section__description">
                  {data.details}
                </p>

                <div
                  className=" d-flex align-items-center mt-3"
                  style={{ columnGap: "4rem" }}
                >
                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-roadster-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {data.model}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-settings-2-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {data.motor_type}
                  </span>

                  <span className=" d-flex align-items-center gap-1 section__description">
                    <i
                      class="ri-timer-flash-line"
                      style={{ color: "#f9a826" }}
                    ></i>{" "}
                    {`${data.hour_speed} kmpl`}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                <BookingForm service="book" />
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                <PaymentMethod />
              </div>
            </Col>
          </Row>
          ):(<p>Loading data...</p>)}
        </Container>
      </section>
    </DocumentTitle>
  )
}

export default CarDetails