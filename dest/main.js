//CHECK MAIN HOMEPAGE
let main = document.getElementsByTagName("main");
// console.log(main[0].classList.contains("homepage"));

// SCROLL BACK TO TOP WITH VANILLA JAVASCRIPT

let body = document.body;
heightBody = document.body.clientHeight;
let backtotop = document.querySelector(".btnbtt");

//BACK TO TOP FUNCTION
backtotop.addEventListener("click", function () {
  window.scrollTo(0, 0);
});
//SCROLL HEADER
let heightHeader = document.querySelector("header").offsetHeight;
let slider = document.querySelector(".slider");
let heightSlider = slider.clientHeight;
let bgHeader = document.querySelector(".header");

//FUNCTION SCROLL
function scroll() {
  window.addEventListener("scroll", function () {
    let scrollPage = window.pageYOffset;
    if (scrollPage > heightSlider - heightHeader)
      // {
      //   [...bgHeader].forEach((element) => {
      //     element.classList.add("--bg");
      //   });
      // }
      bgHeader.classList.add("--bg");
    // else {
    //   [...bgHeader].forEach((element) => {
    //     element.classList.remove("--bg");
    //   });
    // }
    else {
      bgHeader.classList.remove("--bg");
    }
    if (scrollPage > heightBody / 3) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      backtotop.classList.remove("active");
    }
  });
}
scroll();

// CHANGE LANGUAGE WITH VANILLA JAVASCRIPT
function handleChangeLanguage() {
  let lang = document.querySelector(".lang");
  lang.addEventListener("click", function (element) {
    element.stopPropagation();
    element.preventDefault();
    lang.classList.toggle("active");
  });
  let langItems = document.querySelectorAll(
    ".lang .lang__select .lang__select-item"
  );
  let langCurrent = document.querySelector(".lang .lang__current span");
  langItems.forEach(function (item) {
    item.addEventListener("click", function () {
      let langText = this.textContent;
      let langCurrentSpan = langCurrent.textContent;
      langCurrent.innerHTML = langText;
      this.innerHTML = langCurrentSpan;
    });
  });
  document.addEventListener("click", function () {
    lang.classList.remove("active");
  });
}
handleChangeLanguage();

//BUTTON MOBILE FUNCTION WITH VANILLA JAVASCRIPT
function handelButtonMobile() {
  let btnMobile = document.querySelector(".btnmobile");
  let nav = document.querySelector(".nav");
  //HANDLE NAV
  btnMobile.addEventListener("click", function () {
    btnMobile.classList.toggle("active");
  });
  btnMobile.addEventListener("click", function () {
    nav.classList.toggle("active");
  });
  function hideNav() {
    btnMobile.classList.remove("active");
    nav.classList.remove("active");
  }
  window.addEventListener("resize", function () {
    let hideNavResize = this.window.innerWidth;
    if (hideNavResize < 997) {
      hideNav();
    }
  });
}
handelButtonMobile();

//POPUPVIDEO FUNCTION WITH VANILLA JAVASCRIPT
function handlePopupvideo() {
  let popupvideo = document.querySelector(".popupvideo");
  let videoItem = document.querySelectorAll(
    ".video .video__item .video__item-list .item .item-img"
  );
  let iframeVideo = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe iframe"
  );
  let btnClose = document.querySelector(
    ".popupvideo .popupvideo__inner .popupvideo__inner-iframe .close"
  );
  videoItem.forEach(function (item) {
    item.addEventListener("click", function (element) {
      element.stopPropagation();
      popupvideo.classList.add("active");
      //get id video
      let getId = item.getAttribute("data-video-src");

      iframeVideo.setAttribute(
        "src",
        `https://www.youtube.com/embed/iJFseWl8AlE}`
      );
    });
  });
  btnClose.addEventListener("click", function () {
    popupvideo.classList.remove("active");
    iframeVideo.setAttribute("src", "");
  });
  window.document.addEventListener("click", function () {
    popupvideo.classList.remove("active");
  });
}
handlePopupvideo();

//MENU FUNCTION WITH VANILLA JAVASCRIPT
function handleMenu() {
  let sections = [];
  let fcMenu = document.querySelectorAll(".header .menu a");

  function removeActive() {
    fcMenu.forEach(function (menu_element) {
      menu_element.classList.remove("active");
    });
  }

  fcMenu.forEach(function (element) {
    let className = element.getAttribute("href").replace("#", "");
    let section = document.querySelector("." + className);
    sections.push(section);
    element.addEventListener("click", function (valueCurrent) {
      valueCurrent.preventDefault();
      window.scrollTo({
        top: section.offsetTop - heightHeader + 1,
        behavior: "smooth",
      });
      fcMenu.forEach(function (menu_element) {
        menu_element.classList.remove("active");
      });
      element.classList.add("active");
    });
  });
  window.addEventListener("scroll", function (element) {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (scroll_element, index) {
      if (
        positionScroll > scroll_element.offsetTop - heightHeader &&
        positionScroll < scroll_element.offsetTop + scroll_element.offsetHeight
      ) {
        removeActive();
        fcMenu[index].classList.add("active");
      } else {
        fcMenu[index].classList.remove("active");
      }
    });
  });
}
handleMenu();

// SLIDER FUNCTION WITH VANILLA JAVASCRIPT
function handleSliderVanillaJS() {
  let sliderItem = document.querySelectorAll(
    ".slider .slider__item-list .slider__item"
  );
  let currentSlider = 0;
  sliderItem.forEach(function (item, index) {
    if (item.classList.contains("active")) {
      currentSlider = index;
    }
  });
  let number = document.querySelector(".slider__bottom-pagging .number");
  let dots = document.querySelectorAll(".slider__bottom-pagging .dots li");

  function selectDots() {
    dots.forEach(function (element, index) {
      element.addEventListener("click", function () {
        // element.classList.add("is-active");
        goTo(index);
      });
    });
  }
  selectDots();
  //FUNCTION GO TO SLIDER INDEX
  function goTo(index) {
    //remove and add slider current
    sliderItem[currentSlider].classList.remove("active");
    sliderItem[index].classList.add("active");
    // remove and add dots current
    dots[currentSlider].classList.remove("is-active");
    dots[index].classList.add("is-active");
    currentSlider = index;

    number.innerHTML = (currentSlider + 1).toString().padStart(2, "0");
  }

  let nextBtn = document.querySelector(".next");
  let prevBtn = document.querySelector(".prev");
  nextBtn.addEventListener("click", function () {
    if (currentSlider < sliderItem.length - 1) {
      // sliderItem[currentSlider].classList.remove("active");
      // sliderItem[currentSlider + 1].classList.add("active");
      // currentSlider++;
      goTo(currentSlider + 1);
    } else {
      // sliderItem[currentSlider].classList.remove("active");
      // sliderItem[0].classList.add("active");
      // currentSlider = 0;
      goTo(0);
    }
  });
  prevBtn.addEventListener("click", function () {
    if (currentSlider > 0) {
      goTo(currentSlider - 1);
      // sliderItem[currentSlider].classList.remove("active");
      // sliderItem[currentSlider - 1].classList.add("active");
      // currentSlider--;
    } else {
      // sliderItem[currentSlider].classList.remove("active");
      // sliderItem[sliderItem.length - 1].classList.add("active");
      // currentSlider = sliderItem.length - 1;
      goTo(sliderItem.length - 1);
    }
  });
}

// TABS NEWS FUNCTION WITH VANILLA JAVASCRIPT
function handleNewsTabs() {
  let newsTabs = document.querySelectorAll(
    ".news .news__tabs .news__tabs-item"
  );
  let listNews = document.querySelectorAll(".news__list");
  newsTabs.forEach(function (tab_element) {
    tab_element.addEventListener("click", function () {
      newsTabs.forEach(function (tab) {
        tab.classList.remove("active");
      });
      this.classList.add("active");

      let getData = tab_element.getAttribute("data-tag");

      listNews.forEach(function (listNewsTabs) {
        listNewsTabs.classList.remove("active");
      });
      document
        .querySelector(".news__list-item-" + getData)
        .classList.add("active");
    });
  });
}
handleNewsTabs();

// GALLERY FUNCTION WITH VANILLA JAVASCRIPT
function handleGallery() {
  let showImage = document.querySelector(".showimage");
  let image = document.querySelectorAll(
    ".gallery .gallery__list .gallery__list-item img"
  );
  let selectImg = document.querySelector(".showimage__inner-img img");
  image.forEach(function (imageItem) {
    imageItem.addEventListener("click", function (element) {
      element.stopPropagation();
      let getDataImg = imageItem.getAttribute("data-img");
      showImage.classList.add("active");
      selectImg.setAttribute("src", `img/gallery${getDataImg}.jpg`);
    });
  });
  window.document.addEventListener("click", function () {
    showImage.classList.remove("active");
  });
}
// handleGallery();

//FUNCTION HANDLE SLIDER WITH FLICKITY
function handleSlider() {
  var sliderFlickity = document.querySelector(".slider__item-wrap");
  var flickityItem = new Flickity(sliderFlickity, {
    // options
    cellAlign: "left",
    contain: true,
    wrapAround: true,
    prevNextButtons: false,
    fade: true,
    on: {
      ready: function () {
        // handleDotsSlider();
        let dotsFlickity = document.querySelector(".flickity-page-dots");
        let dotsSlider = document.querySelector(".slider__bottom-pagging");
        dotsSlider.appendChild(dotsFlickity);
      },
      change: function (index) {
        // handleNumberSlider(index);
        let numberSlider = document.querySelector(
          ".slider__bottom-pagging .number"
        );
        numberSlider.innerHTML = (index + 1).toString().padStart(2, "0");
      },
    },
  });

  // CONTROL
  let nextBtn = document.querySelector(".next");
  let prevBtn = document.querySelector(".prev");

  nextBtn.addEventListener("click", function () {
    flickityItem.next(true);
  });
  prevBtn.addEventListener("click", function () {
    flickityItem.previous(true);
  });
  // function handleDotsSlider() {
  //   let dotsFlickity = document.querySelector(".flickity-page-dots");
  //   let dotsSlider = document.querySelector(".slider__bottom-pagging");
  //   dotsSlider.appendChild(dotsFlickity);
  // }
  // function handleNumberSlider(index) {
  //   let numberSlider = document.querySelector(
  //     ".slider__bottom-pagging .number"
  //   );
  //   numberSlider.innerHTML = (index + 1).toString().padStart(2, "0");
  // }
}
handleSlider();

// HANDLE ALBUM IMAGE WITH FLICKITY
function handleAlumImage() {
  var album = document.querySelector(".album");
  var progressBarAlbum = document.querySelector(".progress-bar-album");

  var flickityAlbumImg = new Flickity(album, {
    imagesLoaded: true,
    freeScroll: true,
    contain: true,
    wrapAround: true,
    pageDots: false,
    lazyLoad: true,
    lazyLoad: 2,
    // disable previous & next buttons and dots
    prevNextButtons: false,
  });
  flickityAlbumImg.on("scroll", function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBarAlbum.style.width = progress * 100 + "%";
  });

  // var imgs = carousel.querySelectorAll(".album__img img");
  // // get transform property
  // var docStyle = document.documentElement.style;
  // var transformProp =
  //   typeof docStyle.transform == "string" ? "transform" : "WebkitTransform";

  // flkty.on("scroll", function () {
  //   flkty.slides.forEach(function (slide, i) {
  //     var img = imgs[i];
  //     var x = ((slide.target + flkty.x) * -1) / 3;
  //     img.style[transformProp] = "translateX(" + x + "px)";
  //   });
  // });
}
handleAlumImage();

Fancybox.bind("[data-fancybox]", {
  on: {
    load: (fancybox, slide) => {},
  },
});
