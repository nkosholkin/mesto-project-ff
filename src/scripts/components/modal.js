// Открытие попапов

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopups); // только слушаем, когда попап открыт
  document.addEventListener('click', closePopups); // только слушаем, когда попап открыт
}


// Закрытие попапов

export function closeModal(popup) {
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