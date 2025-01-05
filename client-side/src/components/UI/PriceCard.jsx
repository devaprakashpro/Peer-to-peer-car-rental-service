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
              <span>EGP</span>
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
                        background: change === "color" ? "#dc35451f" : "#27ae601f",
                        color: change === "color" ? "#dc3848" : "#27ae60",
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
                background: item.plan === "Standard" ? "#27ae60" : "#fff",
                color: item.plan === "Standard" ? "#fff" : "#27ae60",
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