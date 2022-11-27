import axios from 'axios';

// const API_KEY = '28093a';
const API_KEY = '28093475-fe65f3a9b90a4bdd7046cfe0a';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const pixabayOptions = {
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 3,
  safesearch: true,
};

export const fetchData = async (request, page) => {
  const searchParam = new URLSearchParams(pixabayOptions);
  const url = `?key=${API_KEY}&q=${request}&page=${page}&${searchParam}`;

  const respone = await axios.get(url);
  return respone.data;
};
