const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'LOGIN_FAILURE':
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case 'LOGOUT':
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case 'UPDATE_PROFILE':
      return {
        user: {
          ...state.user,
          username: action.payload.username,
          profilePic: action.payload.profilePic,
          email: action.payload.email,
          coverPic: action.payload.coverPic,
        },
        isFetching: false,
        error: false,
      };
    case 'DELETE_PROFILE':
      return {
        user: null,
        isFetching: false,
        error: false,
      };
    case 'FOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload],
        },
      };
    case 'UNFOLLOW':
      return {
        ...state,
        user: {
          ...state.user,
          following: state.user.following.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
export default AuthReducer;
