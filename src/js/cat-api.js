const API_KEY =
  'live_ZRLp1ZLypF7pT0H1v7lLON15tgrynDdkDFW2YiqZ1ZtaDv3kVchTklzaOLvm0D3N';
const BASE_URL = 'https://api.thecatapi.com/v1';
const BREADS_LIST = 'breeds';
const SEARCH_POINT = 'images/search';

import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = API_KEY;

// Функція fetchBreeds() виконує HTTP-запит і повертає проміс із масивом порід - результатом запиту

function fetchBreeds() {
  return axios(`${BASE_URL}/${BREADS_LIST}`).then(response => {
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  });
}
//Функція fetchCatByBreed(breedId), яка очікує ідентифікатор породи, робить HTTP-запит і повертає
//проміс із даними про кота - результатом запиту

function fetchCatByBreed(breedId) {
  return axios(
    `${BASE_URL}/${SEARCH_POINT}?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (response.status != 200) {
      throw new Error(response.statusText);
    }
    return response.data;
  });
}

export { fetchBreeds, fetchCatByBreed };
