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

  // Закрытие по клику на кнопку закрытия
  if (evt.target.classList.contains('popup__close')) {
    popups.forEach((popup) => {
      if (popup.contains(evt.target)) {
        closeModal(popup);
      }
    });
  }

  // Закрытие по клику на оверлей
  else if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }

  // Закрытие по клавише Escape
  else if (evt.key === 'Escape') {
    popups.forEach(closeModal);
  }
}