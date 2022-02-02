/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc () {
    // Calc

    const result = document.querySelector(".calculating__result span"); // куда мы будем вовыдоить ко-во кл

    let sex, height, weight, age, ratio;

    if (localStorage.getItem("sex")) { // Если в локальном хранилище уже есть какие-то данные
        sex = localStorage.getItem("sex");
    } else { // если нет
        sex = "femail";
        localStorage.setItem("sex", "femail");
    }

    if (localStorage.getItem("ratio")) { // Если в локальном хранилище уже есть какие-то данные
        ratio = localStorage.getItem("ratio");
    } else { // если нет
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375);
    }

    function initLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if (element.getAttribute("id") === localStorage.getItem("sex")) { // Если значение атрибута есть в локальном хранилище
                element.classList.add(activeClass);
            }
            if (element.getAttribute("data-ratio") === localStorage.getItem("ratio")) { // Если значение атрибута есть в локальном хранилище
                element.classList.add(activeClass);
            }
        });
    }

    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");

    function calcTotal () {
        if (!sex || !height || !weight || !age || !ratio) { // Если не указаны какие-то данные
            result.textContent = "Не введены все данные";
            return; // досрочно заканчиваем функцию
        };

        if (sex == "female") { // Расчитываем кол-во кл в зависимости от пола
            result.textContent = ~~((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = ~~((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        };
    }

    calcTotal();

    function getSaticInf (selector, activeClass) { // функция для получения информации
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => { // навешиваем обработчик событий на каждый элемент
            element.addEventListener("click", (e) => { 
                if (e.target.getAttribute("data-ratio")) { // если у элемента есть атрибут со значением data-ratio то
                    ratio = +e.target.getAttribute("data-ratio"); // в переменную присваиваем значение этого атрибута
                    localStorage.setItem("ratio", +e.target.getAttribute("data-ratio")); // записываем значение в локальное хранилище
                } else { // в остальных случаях получаем id элемента
                    sex = e.target.getAttribute("id");
                    localStorage.setItem("sex", e.target.getAttribute("id"));
                }
    
                elements.forEach(element => { // удаляем у всех элементов класс активности
                    element.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass); // добавляем класс активности нажатому элементу
    
                calcTotal();
            });
        });
    }

    getSaticInf("#gender div", "calculating__choose-item_active");
    getSaticInf(".calculating__choose_big div", "calculating__choose-item_active");

    function getDinamicInf (selector) { // функция для получения информации из input
        const input = document.querySelector(selector);

        input.addEventListener("input", () => {

            if (input.value.match(/\D/g)) { // если пользователь вводит не число
                input.style.border = "1px solid red";
            } else {
                input.style.border = "none";
            }

            switch(input.getAttribute("id")) { // определяем в какую переменную записывать значение input
                case "height": 
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age": 
                    age = input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDinamicInf("#height");
    getDinamicInf("#weight");
    getDinamicInf("#age");
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards () {
    // menuCards

    class Card { // Создаём класс
        constructor (src, alt, menuTitle, text, price, parentSelector, ...clases) { // "...clases" - массив с аргументы, которые мы в будущем можем доваить, а можем и нет
            this.src = src;
            this.alt = alt;
            this.menuTitle = menuTitle;
            this.text = text;
            this.price = price;
            this.clases = clases;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.cahngeToUAH();
        }

        cahngeToUAH () { // Метод для конвертации USD в UAH
            this.price *= this.transfer;
        }

        render () { // Метод для создания элемента и помещения его на страницу
            const element = document.createElement("div"); // Создаём контейнер

            if (this.clases.length === 0) { // Если в массив "clases" не были помещены аргументы, то добавляем один по умолчанию
                this.clases = "menu__item"
                element.classList.add(this.element);
            } else {
                this.clases.forEach(clasName => element.classList.add(clasName)); // Добавляем все классы из масссива "clases" нашему div-контейнеру
            }

            element.innerHTML = 
            `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.menuTitle}"</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element); // Добавляем контейнер в родителя
        }
    }

    // 1-ый способ добавления карточек с помощью классов (динамический)
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu") // Путь откуда ма бурём данные
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => { // Перебираем массив с объектами с сервера и берём из объектов свойства
                new Card(img, altimg, title, descr, price, ".menu .container", "menu__item").render(); // По сути тоже самое что и код закоментированный ниэе
            });
        });

    // 2-ой способ добавления карточек с помощью классов (в ручную)
    // new Card(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     9,
    //     ".menu .container",
    //     "menu__item" // Записываем классы, которые хотим добавить div-контейнеру 
    // ).render();

    // 3-ий спопсоб добавления карточек без использования классов(динамический)
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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
 
             ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json) 
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
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimeID);
 
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
             (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
         }, 5000)
     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal (modalSelector, modalTimeID) { // Функция для открытия модельного окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    modal.classList.remove("hide");

    if (modalTimeID) {
        clearInterval(modalTimeID);
    };
}

function closeModal (modalSelector) { // Функция для закрытия модельного окна
    const modal = document.querySelector(modalSelector);

    modal.classList.add("hide");
    document.body.style.overflow = "";
    modal.classList.remove("show");
}

function modal (trigerSelector, modalSelector, modalTimeID) {

    const modalTrigers = document.querySelectorAll(trigerSelector), 
          modal = document.querySelector(modalSelector);

    modalTrigers.forEach(item => {  // Навешиваем обработчик событий на кнопки из псевдомассива
        item.addEventListener("click", () => openModal(modalSelector, modalTimeID));
    });

    modal.addEventListener("click", (event) => { // Закрытие посредством нажатия на пустую область
        if (event.target === modal || event.target.getAttribute("data-close") == "") { // Если точка куда кликнул пользователь совпадает с точкой вне модельного окна, то закрываем его
            closeModal(modalSelector);
        }
    });

    document.addEventListener("keydown", (event) => { // Закрытие посредством нажатия кнопки Escape
        if (event.code === "Escape" && modal.classList.contains("show")) { // Если код кнопки равен Escape и модельное окно показано, то закрываем его
            closeModal(modalSelector);
        }
    });

    function openModalByScroll () { // Открываем модельное окно когда пользователь долистывает страничку до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // Если высота пролистанного контента + высота окна с которым работает пользователь равна высоте всего сайта, то показываем модельное окно
            openModal(modalSelector, modalTimeID);
            window.removeEventListener("scroll", openModalByScroll); // удаляем обработчик пролистывания
        }
    }

    window.addEventListener("scroll", openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, previosArrow, totalCounter, currentCounter, wrapper, field}) {
        // Slider 

        const sliderContainers = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        leftSlideBtn = document.querySelector(previosArrow),
        rightSlideBtn = document.querySelector(nextArrow),
        leftNumber = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper), // своеобразное окно через которое будет видно только один элемент
        slidesField = document.querySelector(field), // контейнер со всеми элементами
        width = window.getComputedStyle(slidesWrapper).width; // ширина окна

  let index = 1;
  let offset = 0; // для контролся отступов 

  // Слайдер "каруселью"

  // Функция для трансформации строк в числа
  function toNum (str) {
      return +str.replace(/\D/g, "");
  }

  function activeDot (arr, ind) {
      arr.forEach(element => {
          element.style.opacity = 0.5;
      });
      arr[ind - 1].style.opacity = 1;
  }

  // ставим началльные значения для чисел
  if (sliderContainers.length < 10) {
      total.textContent = `0${sliderContainers.length}`;
      leftNumber.textContent = `0${index}`;
  } else {
      total.textContent = sliderContainers.length;
      leftNumber.textContent = index;
  }

  slidesField.style.width = 100 * sliderContainers.length + "%"; // расстягиваем наше окно чтобы туда поместились все элементы
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden"; // обрезаем все элементы выходящие за границы окна

  sliderContainers.forEach(slide => { // делаем все элементы одинаково ширины
      slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"), // создаём список в который помещаем точки
        dots = []; // созадём массив в который тоже помещяем точки

  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;
  slider.append(indicators);

  for (let i = 0; i < sliderContainers.length; i++) { // с помощью цикла создаём кол-во точек = кол-ву слайдов
      const dot = document.createElement("li");
      dot.setAttribute("data-slide-to", i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
      if (i == 0) { // первую точку сразу выделяем
          dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
  }

  rightSlideBtn.addEventListener('click', () => {
      if (offset == toNum(width) * (sliderContainers.length - 1)) {  // Если мы отступ доходит до конца, то возвращаем всё в начало
          offset = 0;
      } else { // в отсальных случаях отступаем вправо на ширину одного элемента
          offset += toNum(width);  
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (index == sliderContainers.length) {
          index = 1;
      } else {
          index++;
      }

      if (sliderContainers.length < 10) {
          leftNumber.textContent =  `0${index}`;
      } else {
          leftNumber.textContent =  index;
      }

      activeDot(dots, index);
  });

  leftSlideBtn.addEventListener('click', () => {
      if (offset == 0) { // если мы находимся в начале то отступаем в конец
          offset = toNum(width) * (sliderContainers.length - 1);
      } else { // в остальных случаем отступаем влево на ширину одного элемента
          offset -= toNum(width);
      }

      slidesField.style.transform = `translateX(-${offset}px)`;

      if (index == 1) {
          index = sliderContainers.length;
      } else {
          index--;
      }

      if (sliderContainers.length < 10) {
          leftNumber.textContent =  `0${index}`;
      } else {
          leftNumber.textContent =  index;
      }

      activeDot(dots, index);        
  });

  dots.forEach(dot => {
      dot.addEventListener("click", (e) => {
          const slideTo = e.target.getAttribute("data-slide-to");

          index = slideTo;
          offset = toNum(width) * (slideTo - 1);

          slidesField.style.transform = `translateX(-${offset}px)`;

          if (sliderContainers.length < 10) {
              leftNumber.textContent =  `0${index}`;
          } else {
              leftNumber.textContent =  index;
          }

          activeDot(dots, index);
      });
  });


  // Простой слайдер

  // index = 0;

  // changeNumbers(0);
  // showSlideImg(0);

  // function showSlideImg (index) { 
  //     sliderContainers.forEach(container => {
  //         container.style.display = "none";
  //     });

  //     sliderContainers[index].style.display = "block"
  // }

  // function changeNumbers (index) {
  //     if (index < 10) {
  //         leftNumber.textContent = `0${index + 1}`;
  //     } else {
  //         leftNumber.textContent = `${index + 1}`;
  //     }
  // }

  // leftSlideBtn.addEventListener("click", () => {
  //     if (index == 0) {
  //         index = 3;
  //     } else {
  //         index--;
  //     };

  //     changeNumbers(index);
  //     showSlideImg(index);
  // });

  // rightSlideBtn.addEventListener("click", () => {
  //     if (index >= sliderContainers.length - 1) {
  //         index = 0;
  //     } else {
  //         index++;
  //     }

  //     changeNumbers(index);
  //     showSlideImg(index);
  // });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsParentSelector, tabsSelector, tabsContentSelector, activeClass) {

    //Tabs

    const tabsMenu = document.querySelector(tabsParentSelector),
          tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector);
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none"; // Скрываем конктент каждого таба
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass); // Удаляем класс активности у каждого таба
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();

    tabsMenu.addEventListener("click", (event) => {
        const target = event.target; // Показывает куда нажал пользователь

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => { // Перебираем все табы
                if (item == target) { // Если один из табов совпадает со значение target, то показываем его
                    hideTabContent();
                    showTabContent(i);
                };
            });
        };
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (id, deadline) {

    function getTimeRemaning(endtime) { // Получаем разницу между сегодняшней датой и датой окончания и высчитываем из этой разницы кол-во дней, часов и т.д.
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = ~~(t / (1000 * 60 * 60 * 24)),
              hours = ~~((t / (1000 * 60 * 60) % 24)),
              minutes = ~~((t / 1000 / 60) % 60),
              seconds = ~~((t / 1000) % 60);
              
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        };
    }

    function getZero (num) { // Если число однозначное - добавляем 0
        if (num >= 0 && num < 10) {
            return (`0${num}`);
        } else {
            return num;
        }
    }

    function setClock (selector, endtime) { // Устанавливаем таймер в HTML
        const timer = document.querySelector(selector),
              days = timer.querySelector("#days"),
              hours = timer.querySelector("#hours"),
              minutes = timer.querySelector("#minutes"),
              seconds = timer.querySelector("#seconds"),
              timeInterval = setInterval(updateClock, 1000); //Обновление часов каждую секунду
              
        updateClock(); // Обновление часов при загрузке или обновлении сайта

        function updateClock() { // Обновление часов
            const t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) { // Убираем обновление часов
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => { // оператор async говорит что внутри функции у нас будет какой-то асинхронный код
    const res = await fetch(url, { // await ставиться перед операциями которых необходимо дождаться
        method: "POST", //метод
        headers: { //заголовки
            "Content-type": "application/json"
        },
        body: data // что мы передаём
    });

    return await res.json();
};

// Функция чтобы получить данные из DataBase
const getResource = async (url) => { // оператор async говорит что внутри функции у нас будет какой-то асинхронный код
    const res = await fetch(url); // await ставиться перед операциями которых необходимо дождаться

    if (!res.ok) { // Если наш запрос не выполняется, то выводим ошибку
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");









window.addEventListener("DOMContentLoaded", () => {

    const modalTimeID = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)(".modal", modalTimeID), 50000); // Устанавливаем открытие модельного окна через 6 секунд, как пользователь зашёл на сайт

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimeID);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2022-11-31");
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])("form", modalTimeID);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        previosArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner"
    });
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map