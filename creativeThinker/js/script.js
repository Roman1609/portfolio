"use strict";


// BODY ELEMENT =================================
const bodyElement = document.body;
// BURGER BUTTON ================================
const burgerButton = document.querySelector('.header__burger');
// TOUCHSCREEN ==================================
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

// POPUP =====================================
const popups = document.querySelectorAll('[data-popup]');
const popupButtonsOpen = document.querySelectorAll('[data-popup-open]');
const popupButtonsClose = document.querySelectorAll('[data-popup-close]');

// SCROLL POINTS =============================
// Chat GPT Code ================//=========
const menuScrollPoints = document.querySelectorAll('[data-scroll-to]');
const toScrollBlocks = document.querySelectorAll('[data-to-scroll]');
const offsetValue = 50; // Визначте бажане значення зміщення

menuScrollPoints.forEach((menuScrollPoint) => {
    const dataPoint = menuScrollPoint.dataset.scrollTo;
    toScrollBlocks.forEach((toScrollBlock) => {
        const toBlock = toScrollBlock.dataset.toScroll;
        if (dataPoint == toBlock) {
            menuScrollPoint.addEventListener("click", (event) => {
                event.preventDefault(); // Зупинити стандартну обробку кліку

                const targetPosition = toScrollBlock.getBoundingClientRect().top + window.scrollY;
                const scrollToPosition = targetPosition - offsetValue;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });

                bodyElement.classList.remove('menu-open');
            });
        }
    });
});

// My Code =======//========
// const menuScrollPoints = document.querySelectorAll('[data-scroll-to]');
// const toScrollBlocks = document.querySelectorAll('[data-to-scroll]');
// menuScrollPoints.forEach((menuScrollPoint) => {
//     const dataPoint = menuScrollPoint.dataset.scrollTo;
//     toScrollBlocks.forEach((toScrollBlock) => {        
//         const toBlock = toScrollBlock.dataset.toScroll;
//         if (dataPoint == toBlock) {
//             menuScrollPoint.addEventListener("click", () => {
//                 scrollToBlock(toScrollBlock);
//                 bodyElement.classList.remove('menu-open');
//             })
//         }
//     })
// })
// function scrollToBlock(elem) {
//     elem.scrollIntoView({
//         block: "start",
//         inline: "nearest",
//         behavior: "smooth"
//     })
// }

// CLICK ====================================
document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;
    console.log(targetElement);
    if (menuScrollPoints) {
        menuScrollPoints.forEach((point) => {
            if (targetElement === point) {
                e.preventDefault();
            }
        })
    }
    // Burger Button Menu Open ======================
    if (burgerButton) {
        if (targetElement === burgerButton) {
            bodyElement.classList.toggle('menu-open');
        } 
    }
    // Popup`s ======================================
    if (popups) {
        popups.forEach((popup) => {
            popupButtonsOpen.forEach((button) => {
                if (targetElement === button) {
                    bodyElement.classList.add('popup-open');
                }
            });
            popupButtonsClose.forEach((closeButton) => {
                if (bodyElement.classList.contains('popup-open') && targetElement === closeButton) {
                    bodyElement.classList.remove('popup-open');
                }
            }); 
            if (popup) {
                const popupBody = popup.firstElementChild;
                if (targetElement === popup && targetElement !== popupBody) {
                    bodyElement.classList.remove('popup-open');
                }
            }
        });
    }
}

window.addEventListener('scroll', () => {
    const scrollThreshold = 70;

    if (window.scrollY > scrollThreshold && !bodyElement.classList.contains('header-fixed')) {
      bodyElement.classList.add('header-fixed');
    } else if (window.scrollY <= scrollThreshold && bodyElement.classList.contains('header-fixed')) {
      bodyElement.classList.remove('header-fixed');
    }
});



