function timer () {

    //Timer

    const deadline = "2021-12-31"; // Дата окончания

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
            t = getTimeRemaning(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if(t.total <= 0) { // Убираем обновление часов
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);
}

module.exports = timer;