// Конфигурация запросов к серверу
const config = {
  url: 'https://mesto.nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '6f2b5eb2-4db4-4c66-a265-4dc657b93138',
    'Content-Type': 'application/json'
  },
};

// Функция обработки ответа сервера
export function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так. Ошибка: ${res.status}`);
}


// Профиль

// Функция получения информации о профиля с сервера
export function getUserData() {
  return fetch(`${config.url}/users/me`, {
    method: 'GET',
    headers: config.headers,
  }).then(handleResponse);
}

// Функция редактирования профиля
export function editUserProfile({ name, about }) {
  return fetch(`${config.url}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleResponse);
}

// Функция изменения аватара профиля
export function editUserAvatar({ avatar }) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
}



// Карточки

// Функция получения карточек с сервера
export function getInitialCards() {
  return fetch(`${config.url}/cards`, {
    method: 'GET',
    headers: config.headers,
  }).then(handleResponse);
}
