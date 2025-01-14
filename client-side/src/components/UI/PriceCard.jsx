import React from "react"
import { price } from "../../assets/data/priceData"
import "../../styles/priceCard.css"
import { Link } from "react-router-dom"

const PriceCard = () => {
    return (
      <>
        <div className='content flex__price mtop'>
        {price.map((item, index) => (
          <div className='box shadow' key={index}>
            <div className='topbtn'>
              <button className='btn3'>{item.best}</button>
            </div>
            <h3>{item.plan}</h3>
            <h1>
              <span>Rs. </span>
              {item.price}
            </h1>
            <p>{item.ptext}</p>

            <ul>
              {item.list.map((val) => {
                const { icon, text, change } = val
                return (
                  <li>
                    <label
                      style={{
                        background: change === "color" ? "#ec65551f" : "#25b8641f",
                        color: change === "color" ? "#ec6555" : "#25b864",
                      }}
                    >
                      {icon}
                    </label>
                    <p>{text}</p>
                  </li>
                )
              })}
            </ul>
            <Link to="/tutors">
            <button
              className='btn5'
              style={{
                background: item.plan === "Standard" ? "#25b864" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#25b864",
              }}
            >
              Start {item.plan}
            </button>
            </Link>
          </div>
        ))}
      </div>
      </>
    )
}

export default PriceCard;
