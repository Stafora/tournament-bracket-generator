import axios from 'axios'

export default {
    state: {
        news: [],
    },
    getters: {
        NEWS(state) {
          return state.news;
        }
    },
    
    mutations: {
        SET_NEWS_TO_STATE: (state, news) => {
            state.news = news;
        }
    },
    
    actions: {
        GET_NEWS_API({commit}, page = 1) {
            return axios('http://localhost/api/v1/news/news?page='+page, {
                method: "GET"
            })
            .then((news) => {
                console.log(news.data.data);
                commit('SET_NEWS_TO_STATE', news.data.data);
                return news;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        }
    },
  }