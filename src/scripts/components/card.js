// Функция создания карточки
const cardTemplate = document.querySelector('#card-template').content;

export function createCard({ name, link }, deleteCard, likeCard, handleImageClick) {

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

  cardImage.addEventListener('click', function () {
    handleImageClick({ name, link });
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}

// функция лайк карточки
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};