function modal () {
    // Modal

    const modalTrigers = document.querySelectorAll("[data-modal]"), 
          modal = document.querySelector(".modal");

    function openModal () { // Функция для открытия модельного окна
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
        modal.classList.remove("hide");
        clearInterval(modalTimeID);
    }

    function closeModal () { // Функция для закрытия модельного окна
        modal.classList.add("hide");
        document.body.style.overflow = "";
        modal.classList.remove("show");
    }

    modalTrigers.forEach(item => {  // Навешиваем обработчик событий на кнопки из псевдомассива
        item.addEventListener("click", () => {openModal()});
    });

    modal.addEventListener("click", (event) => { // Закрытие посредством нажатия на пустую область
        if (event.target === modal || event.target.getAttribute("data-close") == "") { // Если точка куда кликнул пользователь совпадает с точкой вне модельного окна, то закрываем его
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => { // Закрытие посредством нажатия кнопки Escape
        if (event.code === "Escape" && modal.classList.contains("show")) { // Если код кнопки равен Escape и модельное окно показано, то закрываем его
            closeModal();
        }
    });

    const modalTimeID = setTimeout(openModal, 50000); // Устанавливаем открытие модельного окна через 6 секунд, как пользователь зашёл на сайт

    function openModalByScroll () { // Открываем модельное окно когда пользователь долистывает страничку до конца
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { // Если высота пролистанного контента + высота окна с которым работает пользователь равна высоте всего сайта, то показываем модельное окно
            openModal();
            window.removeEventListener("scroll", openModalByScroll); // удаляем обработчик пролистывания
        }
    }

    window.addEventListener("scroll", openModalByScroll);
}

module.exports = modal;