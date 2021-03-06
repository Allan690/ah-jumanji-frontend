import axios from 'axios';
import { toast } from 'react-toastify';
import { read_cookie } from 'sfcookies';
// import getUserCookie from '../../common/utils/readTokens';
import * as types from './types';
import config from '../../../config/config';

// const token = getUserCookie();
const token = read_cookie('token');
export const viewProfile = () => async dispatch => {
  let endpoint = config.api.getProfileUrl;
  try {
    await axios.get(
      endpoint,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`
        }
      })
      .then(response => {
        if (response.data.profile.profile_photo === '') {
          response.data.profile.profile_photo = config.avatarImage.avatarUrl;
          dispatch(viewProfileSuccess(response.data.profile));
          localStorage.setItem("profPic", response.data.profile.profile_photo);
        } else {
          dispatch(viewProfileSuccess(response.data.profile));
          localStorage.setItem("profPic", response.data.profile.profile_photo);
        }
      });
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.detail);
    dispatch(viewProfileFailed(error));
    window.location.replace('/');
  }
};

export const editProfile = (profileData) => async dispatch => {
  let endpoint = config.api.editProfileUrl;
  try {
      await axios.put(endpoint, profileData, { headers: { Authorization: `Token ${token}`} })
      .then(response => {
      dispatch(editProfileSuccess(response.data));
      toast.dismiss();
      toast.success('Profile has been updated', { autoClose: 1000});
      setTimeout(function() {
        window.location.replace('/a/profile');
      }, 1000);
      });
  } catch (error) {
    if (error.response.data.errors.hasOwnProperty('country')) {
      toast.dismiss();
      toast.error(error.response.data.errors.country[0]);
      dispatch(editProfileFailed(error));
    } else {
      toast.dismiss();
      // toast.error(error.response.data.errors.website[0]);
      let erroredInput = document.querySelector("input[name=website]");
      erroredInput.classList.add('highlight-error-input');

      // Show error below input
      let subscript = erroredInput.nextElementSibling;
      subscript.classList.remove("hidden");
      subscript.innerHTML = error.response.data.errors.website[0];
      dispatch(editProfileFailed(error));
      window.location.replace('/');
    }
  }
};


export const viewProfileSuccess = (user) => {
  return {
    type: types.VIEW_PROFILE_SUCCESS,
    payload: user
  };
};

export const viewProfileFailed = (error) => {
  return {
    type: types.VIEW_PROFILE_FAILED,
    payload: error
  };
};

export const editProfileSuccess = (profileData) => {
  return {
    type: types.EDIT_PROFILE_SUCCESS,
    payload: profileData
  };
};

export const editProfileFailed = (error) => {
  return {
    type: types.EDIT_PROFILE_FAILED,
    payload: error
  };
};

export const viewAuthorProfile = (author_profile) => {
  return {
    type: types.VIEW_AUTHOR_PROFILE,
    author_profile
  };
};
export function fetchAuthorProfile() {
  const username = `${location.pathname.split("/")[3]}`;
  const AuthorProfileUrl = `${config.api.authorProfileUrl}${username}`;
  return function(dispatch) {
      return axios.get(AuthorProfileUrl, {
          headers: {
              Accept: 'application/json',
              Authorization: `Token ${token}`
          }
      }).then(res => {
          //gets author Profile
          dispatch(viewAuthorProfile(res.data));
      });
  };
}