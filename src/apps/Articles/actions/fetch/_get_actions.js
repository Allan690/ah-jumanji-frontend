import axios from 'axios';
import { read_cookie, bake_cookie } from 'sfcookies';
import { redirectUrl } from '../common/common';
import { GOT_ARTICLE, ERROR_GETTING_ARTICLE} from '../actionTypes';
import getUserCookie from '../../../common/utils/readTokens';

import config from '../../../../config/config';

const token = read_cookie('token');
const loggedInUsername = read_cookie('loggedInUsername');
const endpointSingleBookmark = config.api.singleBookmarksUrl;

export const getArticles = (slug) =>dispatch=> {

      const token = getUserCookie();
      let url = `https://ah-jumanji-staging.herokuapp.com/api/articles/${slug}/`;
      let fetch = axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`
         },
            crossDomain: true
        })
        .then((response) => {
          let r = response.data.articles;
          let slug = response.data.articles.slug;
          bake_cookie("article_author", r.author.user);
          axios.all([fetchBookmark(slug)]).then(
            axios.spread(
              (bookmarked) =>{
                Object.assign(r, {"bookmarked": bookmarked});
                dispatch(gotArticle(r));
              }
            )
          );

        })
        .catch((err) => {
            dispatch(getError(err));
            redirectUrl(`/not_found/${slug}`);
        });
    return fetch;
};

export const fetchBookmark = (slug) => {
  return axios.get(endpointSingleBookmark+slug, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Token '+token
    }
  })
  .then(res => {
      let bookmarked = false;
      let bookmarkArray = res.data.bookmarks;
      if (bookmarkArray) {
        for (const i in bookmarkArray) {
          if (bookmarkArray[i].user.username==loggedInUsername) {
            bookmarked = true;
            return (bookmarked);
          }
        }
      }
      return (bookmarked);
  })
  .catch( error => {
    return(error);
  });
};


export function gotArticle(data){
    return{
        type: GOT_ARTICLE,
        payload:{
            read_article: data,
            posting: false,
            fetching: false
        }
    };
}

export function getError(){
    return{
        type: ERROR_GETTING_ARTICLE,
        payload: {message: "Could not get that article"}
    };
}

