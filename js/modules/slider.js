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

export default slider;