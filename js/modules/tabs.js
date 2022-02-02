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

export default tabs;