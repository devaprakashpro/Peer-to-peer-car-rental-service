import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { id, car_image, year, model, motor_type, hour_speed, hour_price } = props.item;
  const {user_id} = props;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={car_image} alt="" className="w-100 car__item__img" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{model}</h4>
          <h6 className="rent__price text-center mt-">
            EGP{hour_price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {year}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {motor_type}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {`${hour_speed} kpml`}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent">
            <Link to={user_id?`/cars/${id}/details/${user_id}`:`/cars/${id}/details/`}>Rent</Link>
          </button>

          <button className=" w-50 car__item-btn car__btn-details">
            <Link to={user_id?`/cars/${id}/details/${user_id}`:`/cars/${id}/details/`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
