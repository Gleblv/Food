import {getResource} from "../services/services";

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
    getResource("http://localhost:3000/menu") // Путь откуда ма бурём данные
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

export default cards;