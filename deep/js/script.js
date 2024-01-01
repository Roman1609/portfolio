"use strict";

const bodyElement = document.body;
// IS TOUCH SCREEN ======================================
const isTouchScreen = window.matchMedia('(any-pointer: coarse)');
if (isTouchScreen.matches) {
    bodyElement.classList.add('touch');
} else {
    bodyElement.classList.remove('touch');
}
isTouchScreen.addEventListener("change", (e) => {
    if (e.matches) {
        bodyElement.classList.add('touch');
    } else {
        bodyElement.classList.remove('touch');
    }
});

const buttonUp = document.querySelector('.footer__button');
const header = document.querySelector('.header');
// SCROLLING UP ================================
buttonUp.addEventListener("click", () => {
    window.scrollTo({
        top: header,
        behavior: "smooth"
    });
});


// INTERSECTION OBSERVER =========================
let options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.3
};
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add('_watch');
            targetElement.classList.add('_watched');
        }
        else {
            targetElement.classList.remove('_watch');
        }
    })
}, options);

const containers = document.querySelectorAll('[class*="__container"]');
containers.forEach((container) => {
    observer.observe(container);
});

// POPUP =============================================
const popups = document.querySelectorAll('[data-popup]');
const popupButtonsOpen = document.querySelectorAll('[data-popup-open]');
const popupButtonsClose = document.querySelectorAll('[data-popup-close]');

document.addEventListener("click", (e) => {
    const targetElement = e.target;
    if (popups) {
        popups.forEach((popup) => {
            popupButtonsOpen.forEach((openButton) => {
                if (targetElement === openButton) {
                    popup.classList.add('popup-open');
                    bodyElement.style.overflow = 'hidden';
                }
            });
            popupButtonsClose.forEach((closeButton) => {
                if (targetElement === closeButton && popup.classList.contains('popup-open')) {
                    popup.classList.remove('popup-open');
                    bodyElement.style.overflow = 'auto';
                }
            });
            if (popup.classList.contains('popup-open')) {
                if (targetElement === popup && targetElement !== popup.firstChild) {
                    popup.classList.remove('popup-open');
                    bodyElement.style.overflow = 'auto';
                }
            }
        });
    }
});

const servicesItems = document.querySelectorAll('.items-services__item');
servicesItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        item.classList.add('_entered');        
    });
    item.addEventListener("mouseleave", () => {
        item.classList.remove('_entered');        
    });
});

const formBlocks = document.querySelectorAll('.form-block input, .form-block textarea');

formBlocks.forEach(function (input) {
    input.addEventListener('focus', function () {
        // Додаємо клас focused при фокусі
        this.parentNode.classList.add('focused');
    });

    input.addEventListener('blur', function () {
        // Видаляємо клас focused при втраті фокусу
        this.parentNode.classList.remove('focused');
    });
});
