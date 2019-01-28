import axios from 'axios';
import { toast } from 'react-toastify';
import { read_cookie } from 'sfcookies';
import { GOT_ARTICLE, ERROR_GETTING_ARTICLE} from '../actionTypes';

export const getArticles = (slug) =>dispatch=> {

    const token = read_cookie("token");
      let url = `https://ah-jumanji-staging.herokuapp.com/api/articles/${slug}/`;
      return axios.get(url, {
          headers: {
            Accept: "application/json",
            Authorization: `Token ${token}`
         },
            crossDomain: true
        })
        .then((response) => {
          dispatch(gotArticle(response.data.articles));
          toast.success(`🦄 ${response.data.articles.slug} has been fetched`, { position: toast.POSITION.TOP_RIGHT, autoClose: 3500 });
        })
        .catch((err) => {
            dispatch(getError(err));
            toast.error('🦄 Could not get that article!',{ position: toast.POSITION.TOP_RIGHT });
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

export function getError(err){
    return{
        type: ERROR_GETTING_ARTICLE,
        payload:err
    };
}