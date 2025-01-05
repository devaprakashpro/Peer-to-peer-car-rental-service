import React, { useState } from 'react'
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import axios from 'axios';


const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    if (password !== confirmPassword) {
      setPasswordError('Passwords must match');
      return;
    }
    try {
      const response = await axios.post('https://carcoach-apis.onrender.com/api/users/signup', { firstName, lastName, email, password });
      if(response.data.errorMessage){
        setPasswordError(response.data.errorMessage);
      }
      const id = response.data.id;
      if(id){
        localStorage.setItem('token', response.data.token);
        window.location.href = `/home/${id}`;
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(null);
  };

  return (
    <DocumentTitle title="Signup Form">
      <div className='page__container'>
        <h1 className='brand__name'>CarCoach</h1>
        <div className="signup__form">
          <h2 className='welcome__text'>Welcome</h2>
            <form className="input__container" onSubmit={handleSubmit}>
              <input type="text" placeholder="First name" className='signin__input' value={firstName} onChange={(event) => setFirstName(event.target.value)} />
              <input type="text" placeholder="Last name" className='signin__input' value={lastName} onChange={(event) => setLastName(event.target.value)} />
              <input type="email" placeholder="Email" className='signin__input' value={email} onChange={(event) => setEmail(event.target.value)} />
              <input type="password" placeholder="Password" className='signin__input' value={password} onChange={(event) => setPassword(event.target.value)} />
              <input type="password" placeholder="Confirm Password" className='signin__input'value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {passwordError && <p className="error__message">{passwordError}</p>}
              <button type='submit' className='signin__button'>Sign Up</button>
            </form>
          
          <h5 className='login__with'>or Signup with</h5>
          <hr className='horizontal__line' />
          <Link to="/signin" className='signup__content'>
            <h5 >Already have an account? signin</h5>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Signup