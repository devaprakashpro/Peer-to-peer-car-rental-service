import React from 'react'
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";
import {HiOutlineLocationMarker} from "react-icons/hi"

const TutorItem = (props) => {
    const { first_name, last_name, email, age, driver_image, working_location, experience_years, rating, bio, gender, id} = props.item;
    const {user_id} = props;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
    <div className="car__item">
      <div className="car__img">
        <img src={driver_image} alt="" className="w-100 car__item__img" />
      </div>

      <div className="car__item-content mt-4">
        <h4 className="section__title text-center">{first_name} {last_name}</h4>
        <h6 className="rent__price text-center mt-">
          {experience_years} <span>years of Experience</span>
        </h6>

        <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
          <span className=" d-flex align-items-center gap-1">
            <HiOutlineLocationMarker size={22} color="#f9a826"/> {working_location}
          </span>
            <span className=" d-flex align-items-center gap-2">
                <span style={{ color: "#f9a826" }}>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                    <i class="ri-star-s-fill"></i>
                </span>
                ({rating} ratings)
            </span>
        </div>

        <button className=" w-50 car__item-btn car__btn-rent">
          <Link to={user_id?`/tutors/${id}/details/${user_id}`:`/tutors/${id}/details/`}>Reserve</Link>
        </button>

        <button className=" w-50 car__item-btn car__btn-details">
          <Link to={user_id?`/tutors/${id}/details/${user_id}`:`/tutors/${id}/details/`}>Details</Link>
        </button>
      </div>
    </div>
  </Col>
  )
}

export default TutorItem