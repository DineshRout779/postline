import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../components/spinner/Spinner';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const { isFetching, dispatch } = useContext(AuthContext);
  const url = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(`${url}/auth/login/`, formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.user });
      navigate('/', { replace: true });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error });
      console.log(error.response);
      if (error.response.status === 404) {
        setMsg('User not registered!');
      }
      if (error.response.status === 403) {
        setMsg('Invalid Credentials!');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className='container full-height flex justify-center align-center'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className='text-center text-danger'>{msg ? msg : ''}</p>
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
                  <Spinner s={'18'} />
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
          <p className='text-center'>
            Don't have an account ? <Link to='/register'>Register</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
