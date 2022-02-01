function tabs () {

    //Tabs

    const tabsMenu = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent");
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = "none"; // Скрываем конктент каждого таба
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active"); // Удаляем класс активности у каждого таба
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = "block";
        tabs[i].classList.add("tabheader__item_active");
    }

    hideTabContent();
    showTabContent();

    tabsMenu.addEventListener("click", (event) => {
        const target = event.target; // Показывает куда нажал пользователь

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => { // Перебираем все табы
                if (item == target) { // Если один из табов совпадает со значение target, то показываем его
                    hideTabContent();
                    showTabContent(i);
                };
            });
        };
    });
}

module.exports = tabs;