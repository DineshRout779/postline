export const LoginStart = () => ({
  type: 'LOGIN_START',
});

export const LoginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
});

export const LoginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const Logout = () => ({
  type: 'LOGOUT',
});

export const UpdateUser = (userData) => ({
  type: 'UPDATE_PROFILE',
  payload: userData,
});

export const DeleteUser = () => ({
  type: 'DELETE_PROFILE',
});

export const FollowUser = (userId) => ({
  type: 'FOLLOW',
  payload: userId,
});

export const UnFollowUser = (userId) => ({
  type: 'UNFOLLOW',
  payload: userId,
});
