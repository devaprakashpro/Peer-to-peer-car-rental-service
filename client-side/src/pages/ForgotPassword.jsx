import React, { useState } from 'react';
import axios from 'axios';
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('https://carcoach-apis.onrender.com/api/password/forgot', { email });
        setMessage(response.data);
      } catch (error) {
        setMessage(error.response.data);
      }
    };

  return (
    <DocumentTitle title="Forget Password">
    <div className='page__container'>
      <h1 className='brand__name'>CarCoach</h1>
      <div className="signup__form">
        <h2 className='welcome__text'>Forget Password</h2>
        <form className="input__container" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" 
            required className='signin__input input__forget' 
            value={email} onChange={(event) => setEmail(event.target.value)} />
            {message && <p className="success__message">{message}</p>}
          <button type='submit' className='signin__button'>Next</button>
        </form>
        <hr className='horizontal__line' />
        <Link to="/signup" className='signup__content'>
          <h5 >don't have an account? signup</h5>
        </Link>
      </div>
    </div>
  </DocumentTitle>
  )
}

export default ForgotPassword