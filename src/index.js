import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

// Делаем запрос

const url = `https://api.thecatapi.com/v1/breeds`;
const imageUrl = `https://api.thecatapi.com/v1/images/search`;
const api_key =
  'live_wiC60OFEUqzeRcuy1bwn3yYBHRpNqzjqT8Cy8cqXt9BgcRKHkumJM3XaVpUczFvL';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

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

function fetchBreeds() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Произошла ошибка при выполнении запроса');
      }
      return response.json();
    })
    .then(data => {
      return data.map(({ id, name }) => ({ id, name }));
    })
    .catch(error => {
      console.log('Ошибка:', error.message);
      throw error;
    });
}
