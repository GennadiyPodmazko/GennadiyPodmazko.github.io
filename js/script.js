'use strict';

const options = {
  itemSelector: '.grid-item',
  percentPosition: true,
  gutter: '.gutter-sizer',
  columnWidth: '.grid-sizer',
};

const pckry = new Packery('.grid__wrapper', options);

window.addEventListener('load', () => {
  // reformat grid after images are loaded
  pckry.layout()
  // remove loading class which prevents the site from being shown
  document.querySelector('body').classList.remove('loading');

  document.querySelectorAll('a[href^="#"]:not(.popup-link)').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        // const topOffset = scrollTarget.offsetHeight;
        const topOffset = 0; // если не нужен отступ сверху
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition - 130,
            behavior: 'smooth'
        });
    });
  });


  // let pckry;
  let draggie;

  

  // check is touch device
  function isTouchDevice() {
    return !!('ontouchstart' in window);
  }

  

  if (!isTouchDevice()) {
    pckry.getItemElements().forEach(function (itemElem) {
      draggie = new Draggabilly(itemElem);
      // draggie.on( 'dragMove', elementInViewport);
      pckry.bindDraggabillyEvents(draggie);
    });
  }

  const homeTextAnimation = (time) => {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
  };

  let time;

  try {
    let typed = new Typed('#typed', { // id of the block for animation
      strings: ['Write your own ticket!'], // Text
      typeSpeed: 200, // Printing speed
      startDelay: 0, // Delay before starting animation
      backSpeed: 50, // Speed of deleting
      backDelay: 2000, // Pause time before deleting
      loop: true // Should it be repeated?
    });
  } catch (error) {
  }


  if (isTouchDevice()) {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('start-animation');
          }, 2500);
        } else {
          entry.target.classList.remove('start-animation');
        }
    });
  });

  let el = document.querySelectorAll('.grid-item-team');
  el.forEach((item) => {
    observer.observe(item);
  });
  }



  if (isTouchDevice()) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "0",
        scrub: true,

        onEnter: (
          () => {
              ScrollTrigger.batch(".grid-item:not(.grid-item-team)", {
                interval: 0.1, // time window (in seconds) for batching to occur.
                batchMax: 1,   // maximum batch size (targets). Can be function-based for dynamic values
                onEnter: batch => {
                  if (batch[0].classList.contains('we-write-books')) {
                    markerAnimate();
                  }
                  else {
                    batch[0].classList.add('start-animation');
                    setTimeout(() => {
                      batch[0].classList.remove('start-animation');
                    }, (+batch[0].dataset.delaymob));
                  }


                },
                onEnterBack: batch => {
                  if (batch[0].classList.contains('we-write-books')) {
                    markerAnimate();
                  }
                  else {
                    batch[0].classList.add('start-animation');
                    setTimeout(() => {
                      batch[0].classList.remove('start-animation');
                    }, (+batch[0].dataset.delaymob));
                  }
                },
                start: "top center",
                end: "top 100px",
                // markers: true,
              });
            }
        ),
        pin: false,
      }
    });

  }



  // fist section video

  const homeVideoPlayButtons = document.querySelectorAll('.home-video-play');

  homeVideoPlayButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let homeVideoParrent = item.closest('.home-video');
      const video = homeVideoParrent.querySelector('video');
      homeVideoParrent.classList.toggle('home-video_play');
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      video.addEventListener('ended', () => {
        homeVideoParrent.classList.remove('home-video_play');
      });
      video.addEventListener('pause', () => {
        homeVideoParrent.classList.remove('home-video_play');
      });
      document.addEventListener('scroll', () => {
        if(video.getBoundingClientRect().y < -100){
            video.pause();
        }
      });
    });
  });


  // header popup team

  const teamItems = document.querySelectorAll('.header__team-item');

  teamItems.forEach((item) => {
    item.addEventListener('click', teamItemOpen);
  });

  function teamItemOpen(e) {
    if (this.classList.contains('header__team-item_active') && !e.target.closest('.header-team-popup__wrap')) {
      this.classList.remove('header__team-item_active');
    } else {
      teamItems.forEach((item) => {
        item.classList.remove('header__team-item_active');
      });
      this.classList.add('header__team-item_active');
    }
  }



  // book animation

  let bookRepeat = false;
  let booksBlock = document.querySelector('.we-write-books');

  function markerAnimate(e) {
    let booksBlock = document.querySelector('.we-write-books');
    if (booksBlock.classList.contains('start-animation') && bookRepeat) {
      booksBlock.classList.remove('start-animation');

      setTimeout(() => {
        booksBlock.classList.add('start-animation');
      }, 100);

      bookRepeat = false;
    } else {
      booksBlock.classList.add('start-animation');
    }

    document.querySelector('.line_1').addEventListener('animationend', function (e) {
      bookRepeat = true;
    });
  }

  try {
    booksBlock.addEventListener('mouseover', markerAnimate);
  } catch (error) {

  }

  // function homeGridItemsAnimate () {
  //   this.classList.add('.start-animation');
  // }


  if (!isTouchDevice()) {
    const homeGridItems = document.querySelectorAll('.grid-item:not(.we-write-books)');
    const homeGridItemsAll = document.querySelectorAll('.grid-item');

    homeGridItems.forEach((item) => {
      item.addEventListener('mouseover', () => {
        item.classList.add('start-animation');
        setTimeout(() => {
          item.classList.remove('start-animation');
        }, (item.dataset.delay || 1000));
      });

      // item.addEventListener('mouseout', () => {
      //   // console.log(item);
      //   setTimeout(() => {
      //     item.classList.remove('start-animation');
      //   }, (item.dataset.delay || 1000));
      // });
    });
  }

  popupLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('body').classList.add('body_popup-open');
      document.querySelector(link.getAttribute('href')).classList.add('popup-open');
    });
  });

  popupOverlays.forEach((overlay) => {
    overlay.addEventListener('click', closeAllPopup);
  });
  popupClose.forEach((close) => {
    close.addEventListener('click', closeAllPopup);
  });
});

const popupLinks = document.querySelectorAll('.popup-link');
  const popups = document.querySelectorAll('.popup-block');
  const popupOverlays = document.querySelectorAll('.popup-block__overlay');
  const popupClose = document.querySelectorAll('.popup-block__close');

function closeAllPopup() {
  document.querySelector('body').classList.remove('body_popup-open');

  popups.forEach((popup) => {
    popup.classList.remove('popup-open');
  });
}

/* Copy to clickboard */
function copyToClickboard(element) {
  
  navigator.clipboard.writeText(element.value);

  let svgCheck = document.createElement("i");
  svgCheck.setAttribute("class", "bi bi-check2")

  element.replaceChildren(svgCheck);

  setTimeout(function() {
    let svgClickboard = document.createElement("i");
    svgClickboard.setAttribute("class", "bi bi-clipboard")

    element.replaceChildren(svgClickboard);
  }, 2000)
}


/* Register course form */
const iti = intlTelInput(document.getElementById("phone"), {
  separateDialCode: true,
  preferredCountries: ["ua", "us"],
});

let registerCourseForm = document.getElementById("registerCourseForm");
registerCourseForm.addEventListener('submit', sendRegisterRequest);
function sendRegisterRequest(event) {
 event.preventDefault(); 

 cancelValidationBorder();

 let isValid = true;
 
 if(!this.policy.checked) {
   this.policy.classList.add("invalid");
   isValid = false;
 }
 if(this.name.value.length>100 || this.name.value.length<1) {
   this.name.parentElement.classList.add("invalid");
   isValid = false;
 }
 if(this.email.value.length>100 || this.email.value.length<1) {
   this.email.parentElement.classList.add("invalid");
   isValid = false;
 }
 if(!this.phone.value) {
   this.phone.parentElement.parentElement.classList.add("invalid");
   isValid = false;
 }
 if(!this.course.value) {
   this.course.parentElement.classList.add("invalid");
   isValid = false;
 }

 if(!isValid) return;

 let name = this.name.value;
 let email = this.email.value;
 let countryCode = iti.s.dialCode;
 let phone = this.phone.value;
 let course = this.course.value;
 
 fetch("https://docs.google.com/forms/d/e/1FAIpQLSccf7WdfEaVK95-tgVP8lzaENGC1er5G5FDZWnu8QRqGH-MbQ/formResponse"
 , {
   method: "POST",
   headers: {
     "Content-Type": "application/x-www-form-urlencoded",
   },
   body: "entry.1239952446="+name
   +"&entry.2046075764="+email
   +"&entry.1314615058="+countryCode
   +"&entry.2134381035="+phone
   +"&entry.1078540857="+course
   +"&fvv=1&partialResponse=%5Bnull%2Cnull%2C%224625185403490877421%22%5D&pageHistory=0&fbzx=4625185403490877421", // body data type must match "Content-Type" header
 });

 closeAllPopup();
 iti.setCountry("ua");
 this.name.value="";
 this.email.value="";
 this.phone.value="";
 this.course.value="";
 this.policy.checked=false;
}

function cancelValidationBorder() {
 const validatedElements = [...document.getElementsByClassName("invalid")];
 for (let item of validatedElements) {
   item.classList.remove("invalid");
 }
}