import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";
import CommonSection from "../components/UI/CommonSection";
import "../styles/profile.css";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://carcoach-apis.onrender.com/api/sessions-students/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <DocumentTitle title="Profile">
      <CommonSection title="Your Profile" />
      <section>
        <h1 className="brand__name__profile">VeloRent</h1>
        <div className="signup__form__profile">
          <h2 className="welcome__text__profile">Welcome Back</h2>
          {data ? (
            <div className="profile__sessiondata">
              <div className="profile__info">
                <img
                  className="profile__avatar"
                  src={data.avatarUrl || "default-avatar.jpg"}
                  alt="Profile"
                />
                <div>
                  <p>Your Tutor is: {data.tutorName}</p>
                  <p>
                    Your Left Sessions: {data.sessionsDetails.left_sessions}{" "}
                    sessions
                  </p>
                </div>
              </div>
              <p>Date: {data.sessionsDetails.sessionDetails.session_date}</p>
              <p>
                Start Time: {data.sessionsDetails.sessionDetails.start_time}
              </p>
              <p>
                Duration: {data.sessionsDetails.sessionDetails.session_duration}
              </p>
              <p>Location: {data.sessionsDetails.sessionDetails.location}</p>
              <button className="button">Edit Profile</button>
            </div>
          ) : (
            <p className="m-4 text-black">No Reserved Tutors Found...</p>
          )}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124178.48261111544!2d78.082216!3d11.036111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859afb7e216f5%3A0x4216946818414e5!2sTamil%20Nadu!5e0!3m2!1sen!2sin!4v1645043054517!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </DocumentTitle>
  );
};

export default Profile;
