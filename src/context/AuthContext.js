import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: {
    _id: '61dd2413cee9934ed925a6b2',
    username: 'Dinesh',
    email: 'din@gmail.com',
    password: '$2b$10$7zvM4AUvCA1qjh8411ptMOCGcWlGqZWbSZlOovT4Bc/BeoRi1gxKi',
    profilePic: '',
    coverPic: '',
    followers: ['61dd2424cee9934ed925a6b5', '61dee9828af8ee51c9d1d837'],
    following: ['61dd2424cee9934ed925a6b5', '61dee9828af8ee51c9d1d837'],
    isAdmin: false,
    createdAt: '2022-01-11T06:30:43.080Z',
    updatedAt: '2022-01-14T08:32:12.396Z',
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   JSON.stringify(localStorage.setItem('user', state.user));
  // }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
