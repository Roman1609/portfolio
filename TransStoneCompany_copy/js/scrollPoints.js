"use strict";

// Chat GPT Code ===========================
/*
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
                document.documentElement.classList.remove("lock");
                burgerButton.classList.remove('burger-active');
            });
        }
    });
});
*/

/*
Відредаговано, взяти padding-top від кожного блоку =====
!!! Протестувати !!!
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

                // Використовуйте paddingTop для обчислення нового значення зміщення
                const targetPosition = toScrollBlock.getBoundingClientRect().top + window.scrollY;
                const scrollToPosition = targetPosition - paddingTop;

                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });

                bodyElement.classList.remove('menu-open');
                document.documentElement.classList.remove("lock");
                burgerButton.classList.remove('burger-active');
            });
        }
    });
});
*/
