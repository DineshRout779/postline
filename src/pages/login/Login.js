import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Spinner from '../../components/spinner/Spinner';
import Navbar from '../../components/navbar/Navbar';
import { login } from '../../api/auth-api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { user, isFetching, dispatch } = useContext(AuthContext);

  useEffect(() => {
    user && navigate('/', { replace: true });
  }, [navigate, user]);

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
      const { data } = await login(formData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
      navigate('/', { replace: true });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error });
      setMsg(error.response.data.error);
    }
  };

  const loginAsGuest = () => {
    setFormData({
      email: 'guest@email.com',
      password: 'ca06eb9ad6d4c83c334288424549d910ca9a32ae',
    });
  };

  return (
    <>
      <Navbar />
      <div className='container full-height flex justify-center align-center flex-column'>
        <form className='form' onSubmit={handleSubmit} autoComplete='off'>
          <h2>Login</h2>
          <p className='text-center text-accent'>{msg ? msg : ''}</p>
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
                  <Spinner s={'18'} color='white' border='transparent' />
                </div>
              ) : (
                'Login'
              )}
            </button>
          </div>
          <p className='text-center'>
            Don't have an account ? <Link to='/register'>Register</Link>
          </p>
          <button
            onClick={loginAsGuest}
            className='form-control  btn btn-secondary text-center'
          >
            Login as a guest
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
