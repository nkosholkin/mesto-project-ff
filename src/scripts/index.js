import avatar from '../images/avatar.jpg';

import { initialCards } from './components/cards.js';

import { createCard, deleteCard, likeCard } from './components/card.js';

import '../pages/index.css';


document.addEventListener('DOMContentLoaded', function() {
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url('${avatar}')`;
  // плавное появление попапа
  const popups = document.querySelectorAll('.popup');
  popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
  });
});

// // Темплейт карточки

// const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы

const container = document.querySelector('.page');
const placesList = container.querySelector('.places__list');

// // Функция создания карточки

// function createCard({ name, link }, deleteCard, likeCard) {
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const deleteButton = cardElement.querySelector('.card__delete-button');

//   const likeButton = cardElement.querySelector('.card__like-button');

//   cardImage.src = link;
//   cardImage.alt = name; // добавил alt для картинок (для хороших практик)
//   cardTitle.textContent = name;

//   deleteButton.addEventListener('click', function () {
//     deleteCard(cardElement);
//   });

//   likeButton.addEventListener('click', likeCard);

//   return cardElement;
// }

// // Функция удаления карточки

// function deleteCard(cardElement) {
//   cardElement.remove();
// }

// // функция лайк карточки

// function likeCard(evt) {
//   evt.target.classList.toggle('card__like-button_is-active');
// };

// Вывод карточек на страницу

initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard));
});


// Попапы

const popupProfile = document.querySelector('.popup_type_edit');
const popupPlace = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

container.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('profile__edit-button')) {
    openModal(popupProfile);
  }
  if (evt.target.classList.contains('profile__add-button')) {
    openModal(popupPlace);
  }
  if (evt.target.classList.contains('card__image')) {
    openModal(popupImage);
    document.querySelector('.popup__image').src = evt.target.src;
    document.querySelector('.popup__image').alt = evt.target.alt;
    document.querySelector('.popup__caption').textContent = evt.target.alt;

  }

});


// Открытие попапов

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopups); // только слушаем, когда попап открыт
  document.addEventListener('click', closePopups); // только слушаем, когда попап открыт
}


// Закрытие попапов

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopups); // перестаем слушать, когда попап закрыт
  document.removeEventListener('click', closePopups); // перестаем слушать, когда попап закрыт
}

// Закрытие попапов по клику на оверлей, по кнопке закрытия и по клавише Escape
function closePopups(evt) {
  const popups = document.querySelectorAll('.popup');

  popups.forEach(function (popup) {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup); // закрытие по клику на кнопку закрытия
     }
    if (evt.target === popup) {
      closeModal(popup); // закрытие по клику на оверлей
    }
    if (evt.key === 'Escape') {
      closeModal(popup); // закрытие по клавише Escape
    }
  });
};


// Изменение данных профиля

// Для получения значений полей ввода и самой формы
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

// Для установки начальных значений полей ввода при первой загрузки
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// Функция изменения данных профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');

};

formElement.addEventListener('submit', handleProfileFormSubmit);




// Добавление новой карточки

const formElementPlace = document.forms['new-place'];
const placeNameInput = formElementPlace.elements['place-name'];
const placeLinkInput = formElementPlace.elements.link;

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  placesList.prepend(createCard(newPlace, deleteCard, likeCard));
  formElementPlace.reset();
  document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');

};

formElementPlace.addEventListener('submit', handlePlaceFormSubmit);
