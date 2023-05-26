// import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import './css/styles.css';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');
const loader = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    const breedOptions = breeds.map(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      return option;
    });
    breedSelect.append(...breedOptions);
  })
  .catch(error => {
    console.log('Произошла ошибка:', error);
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfo.innerHTML = `
        <img src="${catData.url}" alt="Cat Image" width = "700" heigh="500">
        <h3>${catData.breeds[0].name}</h3>
        <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      console.log('Произошла ошибка:', error);
    });
});
