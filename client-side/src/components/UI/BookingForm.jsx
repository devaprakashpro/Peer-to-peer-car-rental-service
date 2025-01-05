import React, { useCallback, useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios"
import swal from "sweetalert"


const BookingForm = ({service}) => {
  const {id, user_id, carId, tutor_id} = useParams()
  // const [user_id, setUserId] = useState(useParams().user_id)
  const [responseObject, setResponseObject] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

// ---------------------------------tutors applying with their cars uploading --------------------------------
  useEffect(() => {
    if (success) {
      const tutorMessage = responseObject?.message;
      swal({
        title: "Thank you for Joining Us!",
        text: tutorMessage,
        icon: "success",
        button: "Done",
      });
      if(responseObject.redirectionLink){
        setTimeout(() => {
          window.location=responseObject.redirectionLink;
        }, 3000);
        
      }
    }
  }, [success, responseObject]);

  useEffect(() => {
    if (error) {
      swal({
        title: "Try Again later",
        text: "An error occurred. Please try again later!",
        icon: "error",
        button: "close",
      });
    }
  }, [error]);

  const submitTutorHandler = useCallback(async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      const response = await axios.post(`https://carcoach-apis.onrender.com/api/tutors-applicants/${id}`, data);
      const responseData  = await response.data;
      setResponseObject(responseData);
      console.log(responseObject);
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  },[])

  useEffect(() => {
    if (success) {
      const tutorCarMessage = responseObject?.message;
      swal({
        title: "Thank you for Joining Us!",
        text: tutorCarMessage,
        icon: "success",
        button: "Done",
      });
      setTimeout(() => {
        window.location.href = `/home/${user_id?user_id:id}`
      }, 6000);
    }

  }, [success, responseObject]);
  
  useEffect(() => {
    if (error) {
      swal({
        title: "Try Again later",
        text: "An error occurred. Please try again later!",
        icon: "error",
        button: "close",
      });
    }

  }, []);


  const {tutorId} = useParams();
  const submitTutorCarHandler = useCallback(async(event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.target);
      const response = await axios.post(`https://carcoach-apis.onrender.com/api/tutors-applicants/car/${tutorId}`, data);
      const responseData  = await response.data;
      setResponseObject(responseData);
      console.log(responseObject);
      setSuccess(true);
  }catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  }, [tutorId])
   
    
// ---------------------------------cars upload---------------------------------
useEffect(() => {
  if(responseObject.doneMessage){
    swal({
      title: "Thank you for contacting us!",
      text: responseObject.doneMessage,
      icon: "success",
      button: "Done",
    });
  }
  if(responseObject.unauthorizedMessage){
    swal({
      title: "Unauthorized",
      text: responseObject.unauthorizedMessage,
      icon: "error",
      button: "close",
    });
    setTimeout(() => {
      window.location.href = `/signup`
    }, 6000);
  }
}, [success, responseObject]);


const submitCarHandler = useCallback(async (event) => {
  event.preventDefault();
  try {
    const data = new FormData(event.target);
    const response = await axios.post(`https://carcoach-apis.onrender.com/api/car-uploads/${id?id:""}`, data);
    const responseData  = await response.data;
    setResponseObject(responseData);
    console.log(responseObject);
    setSuccess(true);
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again later.');
  }
},[])


// ---------------------------------tutor reservations---------------------------------
useEffect(() => {
  if(responseObject.doneMessage){
    swal({
      title: "Thank you for contacting us!",
      text: responseObject.doneMessage,
      icon: "success",
      button: "Done",
    });
  }
  if(responseObject.unauthorizedMessage){
    swal({
      title: "Unauthorized",
      text: responseObject.unauthorizedMessage,
      icon: "error",
      button: "close",
    });
  }
}, [success, responseObject]);

const submitTutorReservationHandler = useCallback(async (event) => {
  event.preventDefault();
  try {
    const formData  = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    console.log(requestData);
    const response = await axios.post(`https://carcoach-apis.onrender.com/api/tutor-reserve/${user_id?user_id+"/":""}${tutor_id}`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData  = await response.data;
    setResponseObject(responseData);
    console.log(responseObject);
    setSuccess(true);
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again later.');
  }
},[user_id])

// ---------------------------------car reservations---------------------------------
const submitCarReservationHandler = useCallback(async (event) => {
  event.preventDefault();
  try {
    const formData  = new FormData(event.target);
    const requestData = {};
    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    console.log(requestData);
    // variable id here is the tutorid
    const response = await axios.post(`https://carcoach-apis.onrender.com/api/car-rent/${user_id?user_id+"/":""}${carId}`, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData  = await response.data;
    setResponseObject(responseData);
    console.log(responseObject);
    setSuccess(true);
  } catch (error) {
    console.error(error);
    setError('An error occurred. Please try again later.');
  }
},[user_id])

  if(service==="book"){
   return (
      <>
        <Form onSubmit={submitCarReservationHandler}>
        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="Name" name="name"/>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="Your Address" name="address"/>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="email" required placeholder="Email" name="email" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="tel" required placeholder="Phone Number" name="phone"/>
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="text" required placeholder="Pickup Location" name="pickup_location" />
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input type="text" required placeholder="Return Location" name="return_location" />
        </FormGroup>

        <FormGroup className="booking__form d-inline-block me-4 mb-4">
          <input type="date" required placeholder="Journey Date" name="journey_date"/>
        </FormGroup>
        <FormGroup className="booking__form d-inline-block mb-4">
          <input
            type="text"
            required placeholder="Renting Duration"
            name="renting_period"
          />
        </FormGroup>

        <FormGroup className="booking__form textarea__tutor">
            <select name="payment_method" id="">
            <option value="cash">Cash</option>
            <option value="direct bank transfer">Direct Bank Transfer</option>
              <option value="mastercard">Master Card</option>
              <option value="paypal">PayPal</option>
            </select>
        </FormGroup>

        <FormGroup>
          <textarea
            rows={5}
            type="textarea"
            className="textarea"
            required placeholder="Write"
            name="details"
          ></textarea>
        </FormGroup>
        <button type="submit" className="contact__btn">
             Reserve Now
        </button>
      </Form>
      </>
      )}if(service==="tutor_booking"){
        return (
           <>
             <Form onSubmit={submitTutorReservationHandler}>
             <FormGroup className="booking__form d-inline-block me-4 mb-4">
               <input type="text" required placeholder="Name" name="name"/>
             </FormGroup>
     
             <FormGroup className="booking__form d-inline-block mb-4">
               <input type="email" required placeholder="Email" name="email" />
             </FormGroup>

             <FormGroup className="booking__form d-inline-block me-4 mb-4">
               <input type="tel" required placeholder="Phone Number" name="phone"/>
             </FormGroup>
     
             <FormGroup className="booking__form d-inline-block mb-4">
               <input type="date" required placeholder="Start Date" name="start_date" className="date__picker__tutor"/>
             </FormGroup>

             <FormGroup className="booking__form d-inline-block me-4 mb-4">
               <input
                 type="time"
                 required placeholder="Time"
                 className="time__picker__tutor"
                 name="session_time"
               />
             </FormGroup>

             <FormGroup className="booking__form d-inline-block mb-4">
               <select name="package_price" id="">
                 <option value="basic">Basic</option>
                 <option value="standard">Standard</option>
                 <option value="platinum">Platinum</option>
               </select>
             </FormGroup>

             <FormGroup className="booking__form textarea__tutor">
               <select name="payment_method" id="">
                <option value="cash">Cash</option>
                <option value="direct bank transfer">Direct Bank Transfer</option>
                 <option value="mastercard">Master Card</option>
                 <option value="paypal">PayPal</option>
               </select>
             </FormGroup>

             <FormGroup>
               <textarea
                 rows={5}
                 type="textarea"
                 className="textarea"
                 required placeholder="Write"
                 name="details"
               ></textarea>
             </FormGroup>
              <button type="submit" className="contact__btn">
                Reserve Now
              </button>
           </Form>
           </>
           )} else if(service==="earn"){
          return (
            <div>
              <Form onSubmit={submitCarHandler}>
            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Name" name="name"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input type="tel" required placeholder="Phone Number" name="phone" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="License Plate" name="license_plate"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input type="text" required placeholder="Pickup Location" name="from_address"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="number" required placeholder="Speed Per Hour" name="hour_speed" />
            </FormGroup>
            
            <FormGroup className="booking__form d-inline-block mb-4">
              <input type="text" required placeholder="Car Year" name="year" />
            </FormGroup>    

          <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car Model" name="model"  />
            </FormGroup>

            <FormGroup className="booking__form  d-inline-block mb-4">
              <input type="file" required placeholder="Upload you car image" name= "car_image" className="upload__image__earn" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <select name="usage" id="">
                <option value="renting">For Renting</option>
                <option value="coaching">For Driving Services</option>
              </select>
            </FormGroup>
            
            <FormGroup className="booking__form d-inline-block mb-4">
              <select name="motor_type" id="">
                <option value="automatic">Automatic Car</option>
                <option value="manual">Manual Car</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="date" required className="time__picker__earn" name="available_from"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="number"
                required placeholder="Price Per Hour"
                name="hour_price"
              />
            </FormGroup>

            <FormGroup>
              <textarea
                rows={5}
                type="textarea"
                className="textarea"
                required placeholder="Additional Details..."
                name="details"
              ></textarea>
            </FormGroup>

            <button className="contact__btn" type="submit">
                Upload Car
            </button>
          </Form>
          </div>
        )}

      else if(service==="join"){
       
        return(
          <div>
            <Form onSubmit={submitTutorHandler}>
              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="First Name"name="first_name" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Last Name" name="last_name"  />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="number" required placeholder="Your Age" name="age" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="text" required placeholder="Your Gender" name="gender" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="email" required placeholder="Email" name="email" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="tel" required placeholder="Phone Number" name="phone" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="Your Address" name="address" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="number" required placeholder="Years of Experience" name="experience_years" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block me-4 mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__tutor" name="driver_image" />
              </FormGroup>

              <FormGroup className="booking__form  d-inline-block mb-4">
                <input type="file" required placeholder="Upload you car image" className="upload__image__doc1" name="driver_license" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input
                  type="time"
                  required placeholder="Pickup Time"
                  className="time__picker__join"
                  name="interview_time"
                />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <input type="date" required placeholder="Pickup Date"name="interview_date" />
              </FormGroup>
              

              <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <input type="text" required placeholder="working Location" name="working_location" />
              </FormGroup>

              <FormGroup className="booking__form d-inline-block mb-4">
                <select name="is_own_car" id="" placeholder="Have a car">
                  <option value="">Have A car</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </FormGroup>

              <FormGroup>
                <textarea
                  rows={5}
                  type="textarea"
                  className="textarea"
                  required placeholder="Write a Brief About Yourself..."
                  name="bio"
                ></textarea>
              </FormGroup>
              <button className="contact__btn" type="submit">
                  Apply Now
              </button>
            </Form>
          </div>
      )}
      
      else if(service==="tutorCar"){
       
        return (
          <div>
            <Form onSubmit={submitTutorCarHandler}>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car Model" name="model" />
            </FormGroup>

            <FormGroup className="booking__form  d-inline-block mb-4">
              <input type="file" required placeholder="Upload you car image" className="upload__image__earn" name= "car_image"/>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="Car color" name="color" />
            </FormGroup>
            
            <FormGroup className="booking__form d-inline-block mb-4">
              <select name="motor_type" id="">
                <option value="automatic">Automatic Car</option>
                <option value="manual">Manual Car</option>
              </select>
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
              <input type="text" required placeholder="License plate" name="license_plate" />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="text"
                required placeholder="Year Model"
                name="year"
              />
            </FormGroup>

            <FormGroup className="booking__form d-inline-block me-4 mb-4">
            <input type="number" required placeholder="Speed Per Hour" name="hour_speed" />
          </FormGroup>

            <FormGroup className="booking__form d-inline-block mb-4">
              <input
                type="number"
                required placeholder="price per hour"
                name="hour_price"
              />
            </FormGroup>

            <FormGroup>
              <textarea
                rows={5}
                type="textarea"
                className="textarea"
                required placeholder="Additional Details..."
                name="details"
              ></textarea>
            </FormGroup>
            {/* {tutorCarMessage && <p>{tutorCarMessage}</p>} */}
            <button className="contact__btn" type="submit">
                Upload Car
            </button>
          </Form>
        </div>
      )}
};

export default BookingForm;
