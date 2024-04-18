import { initialCards } from './cards.js';

import avatar from '../images/avatar.jpg';

document.addEventListener('DOMContentLoaded', function() {
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url('${avatar}')`;
});


import '../pages/index.css'; // добавьте импорт главного файла стилей

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const container = document.querySelector('.page');
const placesList = container.querySelector('.places__list');

// Функция создания карточки

function createCard({ name, link }, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = link;
  cardImage.alt = name; // добавил alt для картинок (для хороших практик)
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Вывод карточек на страницу

initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard));
});