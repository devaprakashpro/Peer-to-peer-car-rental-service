import React, { useState, useEffect } from "react";
import "../styles/signin.css";
import { Link, useNavigate } from "react-router-dom";
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://192.168.0.114:8000/api/users/signin/",
        { email, password }
      );

      if (response.data.message) {
        setError(response.data.message);
      } else {
        const { token, id } = response.data;
        if (id) {
          localStorage.setItem("token", token);
          localStorage.setItem("id", id);
          setShowSuccessModal(true); // Show success modal
          // Wait for modal to be shown and then navigate
          setTimeout(() => {
            navigate(`/home/${id}`);
            // Refresh the page after successful navigation to load all data
            window.location.reload();
          }, 100); // Slight delay for smooth transition
        } else {
          localStorage.setItem("token", token);
          navigate("/home"); // If no userId, navigate to default home page
          // Refresh after redirect to load home page properly
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Signin Error: ", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    const userId = localStorage.getItem("id");
    if (userId) {
      navigate(`/home/${userId}`);
    } else {
      console.error("User ID not found in localStorage");
      navigate("/home"); // Fallback to default home page
      // Refresh after navigating to home
      window.location.reload();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    if (token && userId) {
      navigate(`/home/${userId}`);
    }
  }, [navigate]);

  return (
    <DocumentTitle title="Login Form">
      <div className="body">
        <div className="page__container">
          <h1 className="brand__name">VeloRent</h1>
          <div className="signin__form">
            <h2 className="welcome__text">Welcome Back</h2>
            <form className="input__container" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
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
              {error && <p className="error__message">{error}</p>}
              <button
                type="submit"
                className="signin__button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <Link to="/forgot" className="signup__content">
              <h4 className="forget__password">Forgot password?</h4>
            </Link>
            <hr className="horizontal__line" />
            <Link to="/signup" className="signup__text">
              <h5 className="signin__text">Don't have an account? Sign up</h5>
            </Link>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success__modal">
          <div className="modal__content">
            <h2>Welcome Back!</h2>
            <p>Login successful! Redirecting to your dashboard...</p>
            <button className="modal__button" onClick={handleModalClose}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </DocumentTitle>
  );
};

export default Signin;
