import axios from 'axios';

const API_KEY = 'e3cac6b09ca16e2df27fc1a61005a6af';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

const getTrendingMovies = () => {
  return axios
    .get(`/trending/all/day?api_key=${API_KEY}`)
    .then(({ data: { results } }) => results);
};

const getMovieDetails = id => {
  return axios
    .get(`movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(({ data }) => data);
};

const getMoviesByQuery = query => {
  return axios
    .get(
      `/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
    )
    .then(({ data: { results } }) => results);
};

const getMovieCast = id => {
  return axios
    .get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(({ data: { cast } }) => cast);
};

const getMovieReviews = id => {
  return axios
    .get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    .then(({ data: { results } }) => results);
};

export {
  getTrendingMovies,
  getMovieDetails,
  getMoviesByQuery,
  getMovieCast,
  getMovieReviews,
};
