(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,o,r){var c=t.name,d=t.link,a=e.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__image"),s=a.querySelector(".card__title"),p=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button");return i.src=d,i.alt=c,s.textContent=c,p.addEventListener("click",(function(){n(a)})),u.addEventListener("click",o),i.addEventListener("click",(function(){r({name:c,link:d})})),a}function n(e){e.remove()}function o(e){e.target.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),e.addEventListener("click",a),document.addEventListener("keydown",i)}function c(e){e.classList.remove("popup_is-opened"),e.removeEventListener("click",a),document.removeEventListener("keydown",i)}function d(){return document.querySelector(".popup_is-opened")}function a(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&c(d())}function i(e){"Escape"===e.key&&c(d())}var s=document.querySelector(".places__list"),p=document.querySelector(".profile__edit-button"),u=document.querySelector(".profile__title"),l=document.querySelector(".profile__description"),m=document.querySelector(".popup_type_edit"),_=document.forms["edit-profile"],v=_.elements.name,f=_.elements.description,y=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),L=document.forms["new-place"],q=L.elements["place-name"],S=L.elements.link,g=document.querySelector(".popup_type_image"),E=document.querySelector(".popup__image"),h=document.querySelector(".popup__caption");function x(e){var t=e.name,n=e.link;E.src=n,E.alt=t,h.textContent=t,r(g)}document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".popup").forEach((function(e){e.classList.add("popup_is-animated")}))})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){s.append(t(e,n,o,x))})),p.addEventListener("click",(function(){v.value=u.textContent,f.value=l.textContent,r(m)})),y.addEventListener("click",(function(){r(k)})),_.addEventListener("submit",(function(e){e.preventDefault(),u.textContent=v.value,l.textContent=f.value,c(m)})),L.addEventListener("submit",(function(e){e.preventDefault();var r=t({name:q.value,link:S.value},n,o,x);s.prepend(r),L.reset(),c(k)}))})();