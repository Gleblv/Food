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

module.exports = calc