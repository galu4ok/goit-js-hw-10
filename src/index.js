import './sass/index.scss';
import { refs } from './js/refs';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { showLoaders, hideLoaders, hideSelect, showSelect } from './js/tools';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

new SlimSelect({
  select: '#selectElement',
});

hideSelect();
refs.error.classList.add('hidden');
refs.loader.classList.add('hidden');
refs.catBreedSelect.setAttribute('id', 'single');
refs.loader.insertAdjacentHTML(
  'beforebegin',
  `<div class="section"><span class='loader-img'></span></div>`
);
export const loadImage = document.querySelector('div.section');

loadImage.classList.add('visible');
setTimeout(() => {
  loadBreeds();
}, 500);

refs.catBreedSelect.addEventListener('change', getCatCard);

function getCatCard() {
  showLoaders();
  refs.catInfoContainer.innerHTML = '';
  const idValue = refs.catBreedSelect.value;
  fetchCatByBreed(idValue)
    .then(data => {
      if (idValue === '...') {
        hideLoaders();
        Notify.failure('Choose one cat from the list');
        return;
      }
      const catCard = data.map(({ url, breeds }) => {
        return `<img src=${url} alt=${breeds[0].name} width="400">
    <div class='cat-card'>
      <h2>${breeds[0].name}</h2>
      <p>${breeds[0].description}</p>
      <h3>Temperament:</h3>
      <p>${breeds[0].temperament}</p>
    </div>`;
      });
      refs.catInfoContainer.insertAdjacentHTML('beforeend', catCard);
      if (data.length) {
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded one cat');
      } else {
        Notify.failure('No data found!');
      }
    })
    .catch(err => {
      console.log(err);
      hideLoaders();
      hideSelect();
      refs.catInfoContainer.classList.add('hidden');
      Notify.failure(`${refs.error.textContent}`);
    });
}

function createMarkup(arr) {
  const markup = arr
    .map(({ id, name }) => {
      return `<option value=${id}>${name}</option>`;
    })
    .join('');
  refs.catBreedSelect.insertAdjacentHTML('beforeend', markup);
  new SlimSelect({
    select: '#single',
  });
}

function loadBreeds() {
  const startOption = `<option value="...">~~~ Please make a choice ~~~</option>`;
  refs.catBreedSelect.insertAdjacentHTML('afterbegin', startOption);
  fetchBreeds()
    .then(data => {
      createMarkup(data);
      if (data.length) {
        hideLoaders();
        showSelect();
        Notify.success('Successfully loaded all breeds');
      }
    })
    .catch(err => {
      console.log(err);
      refs.catBreedSelect.classList.add('hidden');
      Notify.failure(`${refs.error.textContent}`);
    });
}
