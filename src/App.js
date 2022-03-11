import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { AuthContextProvider } from './context/AuthContext';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import NotFound from './pages/notfound/NotFound';
import FindPeople from './pages/findpeople/FindPeople';
import Welcome from './pages/welcome/Welcome';

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index path='/' element={<Welcome />} />
        <Route
          path='/home'
          element={
            <PrivateRoute redirectTo='/login'>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/findpeople'
          element={
            <PrivateRoute redirectTo='/login'>
              <FindPeople />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile/:id'
          element={
            <PrivateRoute redirectTo='/login'>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path='/search'
          element={
            <PrivateRoute redirectTo='/login'>
              <Search />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
};

const PrivateRoute = ({ children, redirectTo }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to={redirectTo} />;
};

export default App;
