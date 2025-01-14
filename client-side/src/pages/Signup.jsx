import React, { useState } from "react";
import "../styles/signin.css";
import { Link } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";
import axios from "axios";

// Modal Component for Success Message
const SuccessModal = ({ onClose }) => {
  return (
    <div className="success__modal">
      <div className="modal__content">
        <h2>Account Created Successfully!</h2>
        <p>
          Welcome to VeloRent! Your account has been created successfully. Now
          you can enjoy full access to all our services.
        </p>
        <button className="modal__button" onClick={onClose}>
          Continue to VeloRent
        </button>
      </div>
    </div>
  );
};

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Show modal after successful signup

 const handleSubmit = async (event) => {
   event.preventDefault();
   setPasswordError(null);
   setServerError(null);

   // Check if passwords match
   if (password !== confirmPassword) {
     setPasswordError("Passwords must match");
     return;
   }

   setIsSubmitting(true);

   try {
     // Send data to the server
     const response = await axios.post(
       "https://carcoach-apis.onrender.com/api/users/signup",
       { firstName, lastName, email, password }
     );

     // Handle errors from the server (if any)
     if (response.data.errorMessage) {
       setPasswordError(response.data.errorMessage);
     }

     // If successful, store the token and id in localStorage
     const { id, token } = response.data;
     if (id && token) {
       localStorage.setItem("token", token);
       localStorage.setItem("id", id); // Store user id in localStorage
       setShowSuccessModal(true); // Show success modal
     }
   } catch (err) {
     console.error(err);
     setServerError("Something went wrong. Please try again later.");
   } finally {
     setIsSubmitting(false);
   }
 };


  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(null);
  };

 const handleModalClose = () => {
   setShowSuccessModal(false); // Close modal
   const userId = localStorage.getItem("id"); // Get the id from localStorage
   if (userId) {
     window.location.href = `/home/${userId}`; // Redirect to the user's home page
   } else {
     console.error("User ID not found in localStorage");
   }
 };


  return (
    <DocumentTitle title="Signup Form">
      <div className="body">
        <div className="page__container">
          <h1 className="brand__name">VeloRent</h1>
          <div className="signup__form">
            <h5 className="welcome__text">To Create an account</h5>
            <p className="signup__text">
              Fill in the information below to join the CarCoach community.
            </p>
            <form className="input__container" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First name"
                className="signin__input"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last name"
                className="signin__input"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email address"
                className="signin__input"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="signin__input"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="signin__input"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {passwordError && (
                <p className="error__message">{passwordError}</p>
              )}
              {serverError && <p className="error__message">{serverError}</p>}
              <button
                type="submit"
                className="signin__button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>

            <hr className="horizontal__line" />
            <p className="signup__text">
              Already have an account? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>

        {/* Show success modal if account is successfully created */}
        {showSuccessModal && <SuccessModal onClose={handleModalClose} />}
      </div>
    </DocumentTitle>
  );
};

export default Signup;
