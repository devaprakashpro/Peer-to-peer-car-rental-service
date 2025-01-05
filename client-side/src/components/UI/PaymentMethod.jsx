import React from "react";
import masterCard from "../../assets/images/master-card.jpg";
import paypal from "../../assets/images/paypal.jpg";
import "../../styles/payment-method.css";

const PaymentMethod = () => {
    return (
      <>
        <div className="payment">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="radio" /> Cash
          </label>
        </div>
  
        <div className="payment mt-3">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="radio" /> Direct Bank Transfer
          </label>
        </div>
  
        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="radio" /> Master Card
          </label>
  
          <img src={masterCard} alt="" />
        </div>
  
        <div className="payment mt-3 d-flex align-items-center justify-content-between">
          <label htmlFor="" className="d-flex align-items-center gap-2">
            <input type="radio" /> Paypal
          </label>
  
          <img src={paypal} alt="" />
        </div>

      </>
    );
  };
  
  export default PaymentMethod;