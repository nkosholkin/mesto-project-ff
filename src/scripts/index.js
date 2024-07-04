import '../pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationSettings, enableValidation, clearValidation} from './validation.js';

// DOM элементы
// Список карточек
const placesList = document.querySelector('.places__list');

// Для изменения данных профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Для получения значений полей ввода и самой формы профиля
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements['name'];
const profileDescriptionInput = profileForm.elements['description'];

// Для добавления новой карточки
const addPlaceButton = document.querySelector('.profile__add-button');

// Для получения значений полей ввода и самой формы новой карточки
const newPlacePopup = document.querySelector('.popup_type_new-card');
const newPlaceForm = document.forms['new-place'];
const placeNameInput = newPlaceForm.elements['place-name'];
const placeLinkInput = newPlaceForm.elements['link'];

// Для открытия попапа с изображением
const placePopup = document.querySelector('.popup_type_image');
const placeImagePopup = document.querySelector(".popup__image");
const placeCaptionPopup = document.querySelector(".popup__caption");

// Валидация форм
enableValidation(validationSettings);

// Плавное появление попапа - можно было добавить и в HTML сразу,
// но по условию лучше не менять HTML файл
function handleDOMContentLoaded () {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(function(popup) {
    popup.classList.add('popup_is-animated');
  });
};

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

// Вывод карточек на страницу
(function showCards() {
  initialCards.forEach(function (item) {
    placesList.append(createCard(item, deleteCard, likeCard, handleImageClick));
  });
})();

// Слушаем нажатие на кнопку изменения профиля
profileEditButton.addEventListener('click', function () {
  handleProfileEditButton();
  openModal(profilePopup);
  clearValidation(profileForm, validationSettings);
});

// Слушаем нажатие на кнопку добавления новой карточки места
addPlaceButton.addEventListener('click', function () {
  openModal(newPlacePopup);
  clearValidation(newPlaceForm, validationSettings);
});

// Обработчик клика на изображение карточки
function handleImageClick({ name, link }) {
  placeImagePopup.src = link;
  placeImagePopup.alt = name;
  placeCaptionPopup.textContent = name;

  openModal(placePopup);
}

// Изменение данных профиля
// Обработчик начальных значений полей профиля при первой загрузки
function handleProfileEditButton() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Функция изменения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profilePopup);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки места
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  const newCard = createCard(newPlace, deleteCard, likeCard, handleImageClick);
  placesList.prepend(newCard);
  newPlaceForm.reset();

  closeModal(newPlacePopup);

};

newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);
