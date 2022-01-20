import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { AuthContextProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import People from './pages/people/People';
import NotFound from './pages/notfound/NotFound';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          index
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='people'
          element={
            <PrivateRoute>
              <People />
            </PrivateRoute>
          }
        />
        <Route
          path='profile/:id'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='search'
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path='login'
          element={user ? <Navigate to={'/'} /> : <Login />}
        />
        <Route
          path='register'
          element={user ? <Navigate to={'/'} /> : <Register />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
};

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to='/login' />;
};

export default App;
