import { loadImage } from '../index';
import { refs } from './refs';

function showSelect() {
  refs.catBreedSelect.classList.remove('hidden');
  refs.catBreedSelect.classList.add('visible');
}

function hideSelect() {
  refs.catBreedSelect.classList.add('hidden');
  refs.catBreedSelect.classList.remove('visible');
}

function showLoaders() {
  loadImage.classList.remove('hidden');
  loadImage.classList.add('visible');
}

function hideLoaders() {
  loadImage.classList.add('hidden');
  loadImage.classList.remove('visible');
}

export { showLoaders, hideLoaders, hideSelect, showSelect };
