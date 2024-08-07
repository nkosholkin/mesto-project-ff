import { deleteCard, addlikeCard, dislikeCard } from '../api.js';

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, ownerId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.card.link;
  cardImage.alt = cardData.card.name; // добавил alt для картинок (для хороших практик)
  cardTitle.textContent = cardData.card.name;

  likeButton.addEventListener('click', function () {
    likeCard(cardData.card, likeButton, likeCount)
  });

  cardImage.addEventListener('click', function () {
    cardData.handleImageClick(cardImage, cardTitle);
  });

  likeCount.textContent = cardData.card.likes.length;

  if (cardData.card.likes.some((like) => like._id === ownerId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.card.owner._id !== ownerId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () =>{
      deleteCard(cardData.card)
        .then((res) => {
          cardElement.remove();
        })
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошибка: ${err}`);
    });
  });
  }

  return cardElement;
}

// Функция лайк карточки
export function likeCard(card, likeButton, likeCount) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    dislikeCard(card)
      .then((res) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  } else {
    addlikeCard(card)
      .then((res) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCount.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. Ошибка: ${err}`);
      });
  }
}