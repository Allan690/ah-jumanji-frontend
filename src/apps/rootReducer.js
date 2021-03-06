import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

// import all reducers from the individual app modules
import Articles from './Articles/reducers/ArticlesReducer';
import socialAuth from './SocialLogin/reducers/socialReducer';
import Login from './Login/reducers/loginReducer';
import resetAccountPassword from './resetPassword/reducers/resetPasswordReducer';
import Register from "./Register/reducers/registerReducer";
import profileReducer  from './UserProfile/reducers/profileReducer';
import ratingReducer from "./Rating/reducers/ratingReducer";
import Dashboard from "./Dashboard/reducers/dashboardReducer";
import Notifications from "./Notifiications/reducers/noticationsReducers";
import LikeReducer from "./Like/reducers/likeReducer";
import commentListReducer from './Comments/Reducers/CommentListReducer';
import followingReducer from './following/reducers/followingReducer';
import commentsReactionsReducer from './UserReactions/Reducers/CommentReactionsReducer';
import Errors from "./error pages/reducers/errorMessageReducer";
import Bookmarks from "./Bookmarks/reducers/bookmarksReducer";

export default (history) => combineReducers({
  router: connectRouter(history),
  socialAuth,
  Login,
  Register,
  resetAccountPassword,
  profileReducer,
  Articles,
  ratingReducer,
  Dashboard,
  Notifications,
  commentListReducer,
  LikeReducer,
  commentsReactionsReducer,
  followingReducer,
  Errors,
  Bookmarks,
  //Add your reducers here
});
