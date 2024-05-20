window.addEventListener("DOMContentLoaded", () => {
  const resizableSwiper = (
    breakpoint,
    swiperClass,
    swiperSettings,
    callback
  ) => {
    let swiper;

    breakpoint = window.matchMedia(breakpoint);

    const enableSwiper = function (className, settings) {
      swiper = new Swiper(className, settings);

      if (callback) {
        callback(swiper);
      }
    };

    const checker = function () {
      if (breakpoint.matches) {
        return enableSwiper(swiperClass, swiperSettings);
      } else {
        if (swiper !== undefined) swiper.destroy(true, true);
        return;
      }
    };

    breakpoint.addEventListener("change", checker);
    checker();
  };

  const someFunc = (instance) => {
    if (instance) {
      instance.on("slideChange", function (e) {
        console.log("*** mySwiper.activeIndex", instance.activeIndex);
      });
    }
  };

  resizableSwiper("(max-width: 768px)", ".swiper", {
    width: 240,
    spaceBetween: 16,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});

//Кнопка показать/скрыть..............

const btn = document.querySelector(".cards-more");
const cards = Array.from(document.querySelectorAll(".swiper-slide"));
const arr = cards.slice(6);

function openCards() {
  arr.forEach((item) => {
    item.classList.toggle("hidden");
  });
  btnText();
}

function btnText() {
  if(window.innerWidth > 768) {
  arr.forEach((item) => {
    if (item.classList.contains("hidden")) {
      btn.innerHTML = "Показать все";
      btn.classList.remove("cards-close");
      btn.classList.remove("btn-hide")
    } else {
      btn.innerHTML = "Скрыть";
      btn.classList.add("cards-close");
      btn.classList.add("btn-hide")
    }
  });
}
}

window.addEventListener("resize", () => {
  arr.forEach((item) => {
    if (window.innerWidth < 769) {
      item.classList.add("hidden");
      btn.innerHTML = "Показать все";
      btn.classList.remove("cards-close");
    }
  });
});

btn.addEventListener("click", openCards);
