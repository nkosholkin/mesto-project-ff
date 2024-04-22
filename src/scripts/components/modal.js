// Открытие попапов
export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupWithClick); // только слушаем, когда попап открыт
  document.addEventListener('keydown', closePopupWithButton); // только слушаем, когда попап открыт
}

// Закрытие попапов
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupWithClick); // перестаем слушать, когда попап закрыт
  document.removeEventListener('keydown', closePopupWithButton); // перестаем слушать, когда попап закрыт
}

// Функция выбора текущего открытого попапа
function selectCurrentyOpenedPopup() {
  return document.querySelector('.popup_is-opened');
};

// Функция закрытия попапов по клику на оверлей или по кнопке закрыть
function closePopupWithClick(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    closeModal(selectCurrentyOpenedPopup());
  }
};

// Функциня закрытие попапов по нажатию на Esc
function closePopupWithButton(evt) {
  if (evt.key === 'Escape') {
    closeModal(selectCurrentyOpenedPopup());
  }
};
