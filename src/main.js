//імпорт бібліотек і необхідних функцій
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryMarkup } from './js/render-functions.js';
import { searchImages, limit } from './js/pixabay-api.js';

//отримуємо доступ до форми пошуку, галереї, індикатора загрузки і кнопки підгрузки.
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.js-load-btn');

let currentPage = 1; //змінна для поточної сторінки
let query = ''; //змінна для збереження результату пошуку

btnLoadMore.style.display = 'none'; //спочатку кнопки підгрузки немає
loader.style.display = 'none'; //до сабміту форми індикатору загрузки немає

searchForm.addEventListener('submit', handleSearch); //прослуховуємо форму на подію сабміту

//колбек-функція сабміту форми
async function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  query = form.elements.query.value.trim().toLowerCase();

  //перевірка на пустий рядок
  if (query === '') {
    gallery.innerHTML = '';
    showWarningMessage('Please enter a search query.');
    return;
  }

  loader.style.display = 'block'; // Показуємо індикатор завантаження, очищуємо розмітку, скидуємо поточну сторінку
  gallery.innerHTML = '';
  currentPage = 1;

  try {
    const data = await searchImages(query, currentPage); // робимо запит на пошук
    const markup = createGalleryMarkup(data);
    gallery.innerHTML = markup; // наповненюємо галерею
    lightbox.refresh(); // Оновлюємо SimpleLightbox після вставки нових елементів

    if (data.totalHits > 15) {
      btnLoadMore.style.display = 'block'; // Показуємо кнопку "Load more"
    } else {
      btnLoadMore.style.display = 'none'; // Сховати кнопку, якщо зображення не знайдені
    }
  } catch (error) {
    // оброблюємо помилку якщо фото не знайдено
    onSearchError(error);
  } finally {
    //  При будь-якому результаті приховуємо індикатор завантаження і очищуємо форму
    loader.style.display = 'none';
    form.reset();
  }
}
// прослуховуємо подію кліку на кнопці підгрузки.При події змінюємо номер поточної сторінки, показуємо індикатор завантаження
btnLoadMore.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  //оновлюємо запрос на сервер, доповнюємо розмітку згідно нових даних
  try {
    const data = await searchImages(query, currentPage);
    const markup = createGalleryMarkup(data);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    scrollPage(); // Виклик функції прокручування

    //перевірка на кінець колекції

    const totalPages = Math.ceil(data.totalHits / limit);

    if (currentPage >= totalPages) {
      btnLoadMore.style.display = 'none';
      showInfoMessage(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    onSearchError(error);
  } finally {
    loader.style.display = 'none';
  }
});

//функція для обробки помилки
function onSearchError(error) {
  showErrorMessage(
    'Sorry, there are no images matching your search query. Please try again!'
  );
  gallery.innerHTML = ''; //очищуємо розмітку галереї
  btnLoadMore.style.display = 'none';
  loader.style.display = 'none'; // Приховуємо індикатор завантаження у випадку помилки
}

// Функція для плавного прокручування сторінки
function scrollPage() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

//Ініціалізація бібліотеки SimpleLightbox
let lightbox = new SimpleLightbox('.gallery .gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

// функції з налаштуваннями для різних повідомлень
function showErrorMessage(message) {
  iziToast.error({
    class: 'izi-toast',
    message: message,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: 'rgba(239, 64, 64, 1)',
    progressBarColor: 'rgba(181, 27, 27, 1)',
  });
}

function showWarningMessage(message) {
  iziToast.warning({
    class: 'izi-toast',
    message: message,
    position: 'topRight',
    theme: 'dark',
    backgroundColor: 'rgba(255, 160, 0, 1)',
    progressBarColor: 'rgba(187, 123, 16, 1)',
  });
}

function showInfoMessage(message) {
  iziToast.info({
    class: 'izi-toast',
    message: message,
    position: 'bottomRight',
    theme: 'dark',
    backgroundColor: 'rgba(0, 153, 255, 1)',
    progressBarColor: 'rgba(0, 113, 189, 1)',
  });
}
