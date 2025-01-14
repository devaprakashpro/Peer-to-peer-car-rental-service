import React from "react";
import Slider from "react-slick";
import "../../styles/testimonial.css";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
import ava04 from "../../assets/images/ava-4.jpg";

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <Slider {...settings}>
      <div className="testimonial py-4 px-3">
        <p className="section__description">
          I had an amazing experience with this service. The team was
          incredibly professional and made everything so easy for me. I
          highly recommend them to anyone in need of these services.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava01} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Rajesh Kumar</h6>
            <p className="section__description">Customer from Delhi</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          The service provided was excellent and exceeded my expectations.
          The staff was friendly and attentive throughout the process.
          I would definitely use their service again.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava02} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Mohan Lal</h6>
            <p className="section__description">Customer from Mumbai</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          A wonderful experience from start to finish. The team was
          professional and courteous, ensuring all my needs were met. I
          am very satisfied with their service.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava03} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Satish Kumar</h6>
            <p className="section__description">Customer from Chennai</p>
          </div>
        </div>
      </div>

      <div className="testimonial py-4 px-3">
        <p className="section__description">
          The team was extremely helpful and made the whole process
          seamless. I couldn’t be happier with the service I received and
          will be recommending them to others.
        </p>

        <div className="mt-3 d-flex align-items-center gap-4">
          <img src={ava04} alt="" className="w-25 h-25 rounded-2" />

          <div>
            <h6 className="mb-0 mt-3">Ramesh Kumar</h6>
            <p className="section__description">Customer from Kolkata</p>
          </div>
        </div>
      </div>
    </Slider>
  )
}

export default Testimonials