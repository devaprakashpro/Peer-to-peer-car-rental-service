import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DocumentTitle from '../components/DocumentTitle/DocumentTitle'
import CommonSection from '../components/UI/CommonSection'
import "../styles/profile.css"

const Profile = () => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://carcoach-apis.onrender.com/api/sessions-students/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <DocumentTitle title="Profile">
      <CommonSection title="Your Profile" />
      <section>
        <h1 className='brand__name__profile'>CarCoach</h1>
            <div className="signup__form__profile">
                <h2 className='welcome__text__profile'>Welcome Back</h2>
                {data?(
                  <div className='profile__sessiondata'>
                    <p>Your Tutor is: {data.tutorName}</p>
                    <p>Your Left Sessions are: {data.sessionsDetails.left_sessions} sessions</p>
                    <p>Date: {data.sessionsDetails.sessionDetails.session_date}</p>
                    <p>Start Time: {data.sessionsDetails.sessionDetails.start_time}</p>
                    <p>Session Duration: {data.sessionsDetails.sessionDetails.session_duration}</p>
                    <p>Location: {data.sessionsDetails.sessionDetails.location}</p>
                    
                 </div>
                ):(
                <p className='m-4 text-black'>No Reserved Tutors Found...</p>
                )}
            </div>
        </section>
    </DocumentTitle>
  )
}

export default Profile