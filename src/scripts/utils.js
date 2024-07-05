// Функция процесса загрузки на кнопке
export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}