"use strict";

// Chat GPT Code ===========================
const menuScrollPoints = document.querySelectorAll('[data-scroll-to]');
const toScrollBlocks = document.querySelectorAll('[data-to-scroll]');

// const offsetValue = 50; // Визначте бажане значення зміщення
/*
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
*/

/*

*/
menuScrollPoints.forEach((menuScrollPoint) => {
    const dataPoint = menuScrollPoint.dataset.scrollTo;
    toScrollBlocks.forEach((toScrollBlock) => {
        const toBlock = toScrollBlock.dataset.toScroll;
        if (dataPoint == toBlock) {
            menuScrollPoint.addEventListener("click", (event) => {
                event.preventDefault(); // Зупинити стандартну обробку кліку

                // Отримати значення padding-top від toScrollBlock
                const computedStyle = window.getComputedStyle(toScrollBlock);
                const paddingTop = parseFloat(computedStyle.paddingTop);

                // Отримати висоту контейнера хедера
                const headerCont = document.querySelector('.header__container');
                const headerHeight = parseFloat(window.getComputedStyle(headerCont).minHeight);

                // Використовуйте paddingTop і headerHeight для обчислення нового значення зміщення
                const targetPosition = toScrollBlock.getBoundingClientRect().top + window.scrollY;
                const scrollToPosition = targetPosition - (paddingTop > 0 ? paddingTop : headerHeight);

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });

                bodyElement.classList.remove('menu-open');
                burger.classList.remove('burger-active');
                bodyUnlock();
            });
        }
    });
});

