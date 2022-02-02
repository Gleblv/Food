import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import cards from "./modules/cards";
import calc from "./modules/calc";
import forms from "./modules/forms";
import slider from "./modules/slider";
import {openModal} from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {

    const modalTimeID = setTimeout(() => openModal(".modal", modalTimeID), 50000); // Устанавливаем открытие модельного окна через 6 секунд, как пользователь зашёл на сайт

    tabs(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
    modal("[data-modal]", ".modal", modalTimeID);
    timer(".timer", "2022-11-31");
    cards();
    calc();
    forms("form", modalTimeID);
    slider({
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