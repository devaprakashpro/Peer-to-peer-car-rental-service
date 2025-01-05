import React, { useState } from 'react'
import "../styles/signin.css"
import { Link } from 'react-router-dom';
import DocumentTitle from "../components/DocumentTitle/DocumentTitle"
import axios from 'axios';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted');
    try {
      const response = await axios.post('https://carcoach-apis.onrender.com/api/users/signin', { email, password });
      if(response.data.message){
        setError(response.data.message);
        console.log(response.data.message)
      }else{
        localStorage.setItem('token', response.data.token);
        const {redirectUrl} = response.data;
        window.location.href = redirectUrl;
      }
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
    }
  };
  
  return (
    <DocumentTitle title="Login Form">
      <div className='page__container'>
        <h1 className='brand__name'>CarCoach</h1>
        <div className="signup__form">
        <h2 className='welcome__text'>Welcome Back</h2>
          <form className="input__container" onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" className='signin__input' value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Password" className='signin__input' value={password} onChange={(event) => setPassword(event.target.value)} />
            {error && <p className="error__message">{error}</p>}
            <button type='submit' className='signin__button'>Sign in</button>
          </form>
          <Link to="/forgot" className='signup__content'>
          <h4 className='forget__password'>forget password?</h4>
          </Link>
          <h5 className='login__with'>or login with</h5>
          <hr className='horizontal__line' />
          <Link to="/signup" className='signup__content'>
            <h5 >don't have an account? signup</h5>
          </Link>
        </div>
      </div>
    </DocumentTitle>
  )
}

export default Signin