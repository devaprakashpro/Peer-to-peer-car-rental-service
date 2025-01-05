import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import DocumentTitle from '../components/DocumentTitle/DocumentTitle';
import { useParams } from "react-router-dom";
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import {AiOutlineUser, AiFillMessage} from "react-icons/ai"
import {HiOutlineLocationMarker} from "react-icons/hi"
import axios from "axios"


const TutorDetails = () => {
  const { tutor_id } = useParams();
  const [data, setData] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://carcoach-apis.onrender.com/api/tutors-applicants/${tutor_id}`);
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

  console.log(data);
  return(
    <DocumentTitle title={data?.name}>
    <section>
    <Container>
    {data?(
     <Row>
       <Col lg="5" md="12" sm="12">
         <img src={data.driver_image} alt="" className="w-100" />
       </Col>
       <Col lg="7" md="12" sm="12">
         <div className="car__info">
           <h2 className="section__title">{data.name}</h2>

           <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
             <h6 className="rent__price fw-bold fs-4">
             {data.experience_years} <span>years of Experience</span>
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
             {data.bio}
           </p>

           <div
             className=" d-flex align-items-center mt-3"
             style={{ columnGap: "4rem" }}
           >
             <span className=" d-flex align-items-center gap-4 section__description">
               <span>
                <AiOutlineUser color='#f9a826'/>{" "}
                {data.gender}
               </span>
               <span>
                <HiOutlineLocationMarker color='#f9a826'/>{" "}
                {data.working_location}
               </span>
             </span>
           </div>

           <div
             className=" d-flex align-items-center mt-3"
             style={{ columnGap: "1.8rem" }}
           >
             <span className=" d-flex align-items-center gap-4 section__description">
             <span>
                <AiFillMessage color='#f9a826'/>{" "}
                {data.email}
               </span>
              <span>{data.phone}</span>
             </span>
           </div>
         </div>
       </Col>

       <Col lg="7" className="mt-5">
         <div className="booking-info mt-5">
           <h5 className="mb-4 fw-bold ">Booking Information</h5>
           <BookingForm service="tutor_booking"/>
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

export default TutorDetails