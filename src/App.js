import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Search from './pages/search/Search';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/search' element={<Search />} />
        {/* <Route path='/people' element={<Poeple />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
