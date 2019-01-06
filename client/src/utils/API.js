import axios from 'axios';

const article = '/api/article/';
const note = '/api/note/';

export default {
  // get all noncleared/nonsaved articles
  getArticles: function() {
    return axios.get('/api/article');
  },
  scrapeArticles: function() {
    return axios.get(`${article}scrape`);
  },
  saveArticle: function(id) {
    return axios.put(`${article}save/${id}`);
  },
  unSaveArticle: function(id) {
    return axios.put(`${article}unsave/${id}`);
  },
  showSavedArticles: function() {
    return axios.get(`${article}saved`);
  },
  // clearArticles: function() {
  //   return axios.put(`${article}clear`);
  // },
  getSpecificArticle: function(id) {
    return axios.get(`${article}${id}`);
  },
  addNote: function(id, noteData) {
    return axios.post(`${note}add/${id}`, noteData);
  },
  deleteNote: function(id) {
    return axios.delete(`${note}delete/${id}`);
  }
};
