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

export { getTrendingMovies, getMovieDetails };
