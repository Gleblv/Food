import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

function forms (formSelector, modalTimeID) {
     //Forms

     const forms = document.querySelectorAll(formSelector);

     const message = { // Сообщения для пользователя
         loading: "img/form/spinner.svg", // значок загрузки
         succsess: "Спасибо! Мы ка можно скорее с вами свяжемся",
         fail: "Что-то пошло не так..."
     }
 
     forms.forEach(item => {
         bindPostData(item);
     });
 
     function bindPostData(form) { // Создаём функцию для отпрвки формы
         form.addEventListener("submit", (event) => { // Когда пользователь отправляет форму
             event.preventDefault(); // ОТменяем стандартное поведение, чтобы страница не перезагружалась
 
             const statusMessage = document.createElement("img");
             statusMessage.src = message.loading;
             statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             // form.append(statusMessage);
             form.insertAdjacentElement("afterend", statusMessage); // Вставка элемента после формы
             
             const formData = new FormData(form); // Формируем специальный объект для отправки данных из формы на сервер
 
             // Перервод данныз из формата FormData в JSON
             const json = JSON.stringify(Object.fromEntries(formData.entries())) // переводим из формата FormData в JSON
 
             postData("http://localhost:3000/requests", json) 
             .then(data => {
                 console.log(data); // Выводим в консоль ответ от сервера
                 showThanksModal(message.succsess); // показываем окно с сообщением об успешной отправке
                 statusMessage.remove();
             }).catch(() => { // если возникает ошибка
                 showThanksModal(message.fail); // показываем коно с сообщение об ошибке
             }).finally(() => { // в любом случае
                 form.reset(); // Сбрасываем заполненные поля формы после отправки
             })
         });
     }
 
     function showThanksModal (message) {
         const previosModalDilog = document.querySelector(".modal__dialog");
 
         previosModalDilog.classList.add("hide"); // Скрываем контент модального окна
         openModal(".modal", modalTimeID);
 
         const thanksModal = document.createElement("div"); // создаём контейнер для нового контента
         thanksModal.classList.add("modal__dialog"); // добавляем контейнер для нового контента
         thanksModal.innerHTML = ` // добавляем сам контент
             <div class="modal__content">
                 <div class="modal__close" data-close>&times;</div>
                 <div class="modal__title">${message}</div>
             </div>
         `;
 
         document.querySelector(".modal").append(thanksModal); // помещаем его в модальное окно
         setTimeout(() => { // Сбрасываем новый контент и возвращаем старый
             thanksModal.remove();
             previosModalDilog.classList.add("show");
             previosModalDilog.classList.remove("hide");
             closeModal(".modal");
         }, 5000)
     }
}

export default forms;