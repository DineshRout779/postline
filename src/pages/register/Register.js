import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Spinner from '../../components/spinner/Spinner';
import { AuthContext } from '../../context/AuthContext';

const url = process.env.REACT_APP_API_URL;

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { isFetching } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');

    try {
      await axios.post(`${url}/auth/register/`, formData);
      navigate('/login');
    } catch (error) {
      console.log(error.response);
      setMsg(error.response.data.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='container full-height flex justify-center align-center'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Register</h2>
          <p className='text-center text-danger'>{msg ? msg : ''}</p>
          <div className='form-group'>
            <label htmlFor='name'>name</label>
            <input
              type='text'
              name='username'
              id='name'
              className='form-control'
              placeholder='Enter Name'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>email</label>
            <input
              type='email'
              name='email'
              id='email'
              className='form-control'
              placeholder='Enter Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>password</label>
            <input
              type='password'
              name='password'
              id='password'
              className='form-control'
              placeholder='Enter Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <button
              type='submit'
              className='form-control btn btn-primary text-center'
            >
              {isFetching ? (
                <div className='flex justify-center align-center'>
                  <Spinner s={'18'} color='white' />
                </div>
              ) : (
                'Register'
              )}
            </button>
          </div>
          <p className='text-center'>
            Already a user ? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
