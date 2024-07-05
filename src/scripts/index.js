import '../pages/index.css';
// import { initialCards } from './components/cards.js';
import { createCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { validationSettings, enableValidation, clearValidation} from './validation.js';
import { getUserData, editUserProfile, editUserAvatar, getInitialCards, addNewCard } from './api.js';
import { renderLoading } from './utils.js';

// DOM элементы
// Список карточек
const placesList = document.querySelector('.places__list');

// Для изменения данных профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const profileInfo = document.querySelector('.profile__info');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Для получения значений полей ввода и самой формы профиля
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = document.forms['edit-profile'];
const profileNameInput = profileForm.elements['name'];
const profileDescriptionInput = profileForm.elements['description'];

// Для изменения аватара профиля
const profileAvatarPopup = document.querySelector('.popup_type_avatar');
const profileAvatarForm = document.forms['avatar'];
const profileAvatarLink = profileAvatarForm.elements['avatar-link'];

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
// (function showCards() {
//   initialCards.forEach(function (item) {
//     placesList.append(createCard(item, deleteCard, likeCard, handleImageClick));
//   });
// })();

// Слушаем нажатие на кнопку изменения аватара
profileImage.addEventListener('click', function () {
  openModal(profileAvatarPopup);
  clearValidation(profileAvatarForm, validationSettings);
});

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
function handleImageClick(image, title) {
  placeImagePopup.src = image.src;
  placeImagePopup.alt = image.alt;
  placeCaptionPopup.textContent = title.textContent;

  openModal(placePopup);
}

// Получение данных профиля с сервера
Promise.all([getInitialCards(), getUserData()])
  .then(([cardsData, userData]) => {
    setInfoProfile(userData);
    setInfoCards(cardsData, userData._id);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  });

// Функция установки данных профиля
function setInfoProfile(userData) {
  profileInfo.dataset.userId = userData._id;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
};

function setInfoCards(cardData, ownerId) {
  cardData.forEach((card) => {
    placesList.append(
      createCard({ card: card, handleImageClick, likeCard }, ownerId)
    );
  });
}

// Изменение данных профиля
// Обработчик начальных значений полей профиля при первой загрузки
function handleProfileEditButton() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

// Функция изменения данных профиля на сервере
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(profileForm.querySelector('.popup__button'), true);

  editUserProfile({
    name: profileNameInput.value,
    about: profileDescriptionInput.value
  })
    .then((userData) => {
      setInfoProfile(userData);
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(profileForm.querySelector('.popup__button'), false);
    });
}
profileForm.addEventListener('submit', handleProfileFormSubmit);


// Функция изменения аватара профиля

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(profileAvatarForm.querySelector('.popup__button'), true);

  editUserAvatar({
    avatar: profileAvatarLink.value
  })
    .then((userData) => {
      setInfoProfile(userData);
      closeModal(profileAvatarPopup);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(profileAvatarForm.querySelector('.popup__button'), false);
    });
}

profileAvatarForm.addEventListener('submit', handleAvatarFormSubmit);


// Добавление новой карточки места
// function handlePlaceFormSubmit(evt) {
//   evt.preventDefault();

//   const newPlace = {
//     name: placeNameInput.value,
//     link: placeLinkInput.value
//   };

//   const newCard = createCard(newPlace, deleteCard, likeCard, handleImageClick);
//   placesList.prepend(newCard);
//   newPlaceForm.reset();

//   closeModal(newPlacePopup);

// };

// Добавление новой карточки места
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();

  renderLoading(newPlaceForm.querySelector('.popup__button'), true);

  addNewCard({
    name: placeNameInput.value,
    link: placeLinkInput.value
  })
    .then((card) => {
      placesList.prepend(
        createCard({ card: card, handleImageClick, likeCard }, card.owner._id)
      );
      newPlaceForm.reset();
      closeModal(newPlacePopup);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(newPlaceForm.querySelector('.popup__button'), false);
    });
}


newPlaceForm.addEventListener('submit', handlePlaceFormSubmit);
