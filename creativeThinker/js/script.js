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
    const scrollThreshold = 30;

    if (window.scrollY > scrollThreshold && !bodyElement.classList.contains('header-fixed')) {
      bodyElement.classList.add('header-fixed');
    } else if (window.scrollY <= scrollThreshold && bodyElement.classList.contains('header-fixed')) {
      bodyElement.classList.remove('header-fixed');
    }
});

// ===================================================
/* Атрибут		Значення за замовчуванням
-------------------------------------------------------------------------------------------------------------------
data-prlx-cx="коефіцієнт_х"					100							значення більше - менше відсоток зсуву
data-prlx-cy="коефіцієнт_y"					100							значення більше - менше відсоток зсуву
data-prlx-dxr																		проти осі X
data-prlx-dyr																		проти осі Y
data-prlx-a="швидкість_анімації"				50								більше значення – більше швидкість

// =========
Якщо потрібно зчитувати рух миші в блоці-батьку - тому батькові вказати атрибут data-prlx-mouse-wrapper

Якщо в паралакс картинка - розтягнути її на >100%. 
Наприклад:
	width: 130%;
	height: 130%;
	top: -15%;
	left: -15%;
*/
const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]');
if (paralaxMouse.length) {
	this.paralaxMouseInit(paralaxMouse);
} 
function paralaxMouseInit(paralaxMouse) {
    paralaxMouse.forEach(el => {
        const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]');

        // Коеф. X 
        const paramСoefficientX = el.dataset.prlxCx ? +el.dataset.prlxCx : 100;
        // Коеф. У 
        const paramСoefficientY = el.dataset.prlxCy ? +el.dataset.prlxCy : 100;
        // Напр. Х
        const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1;
        // Напр. У
        const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1;
        // Швидкість анімації
        const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;


        // Оголошення змінних
        let positionX = 0, positionY = 0;
        let coordXprocent = 0, coordYprocent = 0;

        setMouseParallaxStyle();

        // Перевіряю на наявність батька, в якому зчитуватиметься становище миші
        if (paralaxMouseWrapper) {
            mouseMoveParalax(paralaxMouseWrapper);
        } else {
            mouseMoveParalax();
        }

        function setMouseParallaxStyle() {
            const distX = coordXprocent - positionX;
            const distY = coordYprocent - positionY;
            positionX = positionX + (distX * paramAnimation / 1000);
            positionY = positionY + (distY * paramAnimation / 1000);
            el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
            requestAnimationFrame(setMouseParallaxStyle);
        }
        function mouseMoveParalax(wrapper = window) {
            wrapper.addEventListener("mousemove", function (e) {
                const offsetTop = el.getBoundingClientRect().top + window.scrollY;
                if (offsetTop >= window.scrollY || (offsetTop + el.offsetHeight) >= window.scrollY) {
                    // Отримання ширини та висоти блоку
                    const parallaxWidth = window.innerWidth;
                    const parallaxHeight = window.innerHeight;
                    // Нуль посередині
                    const coordX = e.clientX - parallaxWidth / 2;
                    const coordY = e.clientY - parallaxHeight / 2;
                    // Отримуємо відсотки
                    coordXprocent = coordX / parallaxWidth * 100;
                    coordYprocent = coordY / parallaxHeight * 100;
                }
            });
        }
    });
};

