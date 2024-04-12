import Swiper from 'swiper';
import 'swiper/css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

const list = document.querySelector('.reviews-main-list');

async function getReviews() {
  const url = 'https://portfolio-js.b.goit.study/api/reviews';

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error('Error occurred while fetching reviews:', error);
    throw error;
  }
}
function renderReview({ avatar_url, author, review }) {
  return `<li class="reviews-item swiper-slide">
            
              <img class="reviews-avatar" src="${avatar_url}" alt="" width="48" height="48" />
              <h3 class="reviews-item-title">${author}</h3>
              <p class="reviews-item-text">
                ${review}
              </p>
           
          </li>`;
}
function renderReviews(reviewsArr) {
  return reviewsArr.map(renderReview).join('');
}

document.addEventListener('DOMContentLoaded', handleReviews);

async function handleReviews() {
  try {
    const review = await getReviews();
    const markup = renderReviews(review);
    list.insertAdjacentHTML('beforeend', markup);

    const swiper = new Swiper('.swiper', {
      direction: 'horizontal',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  } catch (err) {
    console.error('Error occurred while fetching reviews:', error);
    iziToast.error({
      backgroundColor: 'red',
      icon: false,
      progressBar: false,
      close: false,
      position: 'topRight',
      message:
        'Sorry, an error occurred while fetching images. Please try again!',
    });
  }
}

const buttonPrev = document.querySelector('swiper-button-prev');
buttonPrev.addEventListener('click', handleClickPrev);
function handleClickPrev() {}
