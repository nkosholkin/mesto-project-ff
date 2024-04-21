import '../pages/index.css';

import avatar from '../images/avatar.jpg';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

document.addEventListener('DOMContentLoaded', function() {
  // добавление аватара
  const profileImage = document.querySelector('.profile__image');
  profileImage.style.backgroundImage = `url('${avatar}')`;
  // плавное появление попапа
  const popups = document.querySelectorAll('.popup');
  popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
  });
});

// Основные DOM узлы

const container = document.querySelector('.page');
const placesList = container.querySelector('.places__list');

// Вывод карточек на страницу

(function showCards() {
  initialCards.forEach(function (item) {
    placesList.append(createCard(item, deleteCard, likeCard));
  });
})();

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

// Изменение данных профиля

// Для получения значений полей ввода и самой формы
const formProfile = document.forms['edit-profile'];
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;

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

  closeModal(document.querySelector('.popup_type_edit'));

};

formProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки

const formPlace = document.forms['new-place'];
const placeNameInput = formPlace.elements['place-name'];
const placeLinkInput = formPlace.elements.link;
const popupNewCard = document.querySelector('.popup_type_new-card');

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  const newCard = createCard(newPlace, deleteCard, likeCard);
  placesList.prepend(newCard);
  formPlace.reset();

  closeModal(popupNewCard);

};

formPlace.addEventListener('submit', handlePlaceFormSubmit);
