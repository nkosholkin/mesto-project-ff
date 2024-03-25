// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const container = document.querySelector('.page');
const placesList = container.querySelector('.places__list');

// @todo: Функция создания карточки

function renderCard({ name, link, alt }, cardDeleteHandler) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  // добавил кнопку лайка, чтобы можно было посмотреть, как она работает :)
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = alt; // добавил alt для картинок (для хороших практик)
  cardTitle.textContent = name;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });

  deleteButton.addEventListener('click', function () {
    cardDeleteHandler(cardElement);
  });

  return cardElement;
}


// @todo: Функция удаления карточки

function cardDeleteHandler(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  placesList.append(renderCard(item, cardDeleteHandler));
});