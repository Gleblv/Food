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

export default modal;
export {closeModal};
export {openModal};