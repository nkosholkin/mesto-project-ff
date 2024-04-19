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

function createCard({ name, link }, deleteCard, likeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name; // добавил alt для картинок (для хороших практик)
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', function () {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', likeCard);

  return cardElement;
}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// функция лайк карточки

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

// Вывод карточек на страницу

initialCards.forEach(function (item) {
  placesList.append(createCard(item, deleteCard, likeCard));
});



// Попап


const mainContent = document.querySelector('.content');




// const profileEditButton = document.querySelector('.profile__edit-button');

const popupProfile = document.querySelector('.popup_type_edit');

function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.classList.remove('popup_is-animated');
}



mainContent.addEventListener('click', function(evt) {
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


// const addPlaceButton = document.querySelector('.profile__add-button');

const popupPlace = document.querySelector('.popup_type_new-card');

// const placesItem = document.querySelector('.places__item');

const popupImage = document.querySelector('.popup_type_image');


// Закрытие попапов по клику на крестик

const popupCloseButtons = document.querySelectorAll('.popup__close');

popupCloseButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    button.closest('.popup').classList.remove('popup_is-opened');
  });
});

// Закрытие попапов по клику на оверлей

const popups = document.querySelectorAll('.popup');

popups.forEach(function (popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target === popup) {
      popup.classList.remove('popup_is-opened');
    }
  });
});


// Закрытие попапов по нажатию на Esc

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }
});






// Функция изменения данных профиля

const formElement = document.forms['edit-profile'];

const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  // profileName.textContent = profileName.textContent;
  // profileDescription.textContent = profileDescription.textContent;

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');

};

formElement.addEventListener('submit', handleProfileFormSubmit);







// Функция добавления новой карточки

const formElementPlace = document.forms['new-place'];

const placeNameInput = formElementPlace.elements['place-name'];

const placeLinkInput = formElementPlace.elements.link;

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  // console.log(newPlace);

  placesList.prepend(createCard(newPlace, deleteCard));

  formElementPlace.reset();

  document.querySelector('.popup_type_new-card').classList.remove('popup_is-opened');

};

formElementPlace.addEventListener('submit', handlePlaceFormSubmit);
