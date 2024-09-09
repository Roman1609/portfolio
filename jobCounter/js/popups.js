
/*
до самого попапу додаємо = data-popup
до кнопки відкриття = data-popup-open
докнопки закривання = data-popup-close

якщо попапів декілька то сам попапи до його кнопки відкривання
прив'язуємо через значення дата-атрибуту. Приклад
<button data-popup-open="1" class="body-main__button">Get Started</button>
<div data-popup="1" class="popup">
<button data-popup-close class="body-popup__button"></button>
</div>

До самих попапів дописати властивість появи 
&.popup-open {
    visibility: visible;
    opacity: 1;
    ...
}

Примітка!!! Якщо bodyElement вже було оголошено раніше,
то закоментувати його тут!!!
*/
// Написано ChatGPT, ВИПРОБУВАННЯ НЕ ПРОХОДИЛО.
// Отримуємо всі попапи, кнопки відкриття та закриття попапів, та елемент body
const popups = document.querySelectorAll('[data-popup]');
const popupButtonsOpen = document.querySelectorAll('[data-popup-open]');
const popupButtonsClose = document.querySelectorAll('[data-popup-close]');
const bodyElement = document.body;

// Слухаємо кліки на документі
document.addEventListener("click", (e) => {
    const targetElement = e.target;
    console.log(targetElement);
    if (popups) {
        // Проходимося по всіх попапах
        popups.forEach((popup) => {
            // Перевіряємо кнопки відкриття
            popupButtonsOpen.forEach((openButton) => {
                // Отримуємо значення data-popup-open
                const popupIdToOpen = openButton.dataset.popupOpen;
                // Перевіряємо, чи клікнуто на відповідну кнопку та чи є значення data-popup-open
                if (targetElement === openButton || targetElement.closest('[data-popup-open]') === openButton && popupIdToOpen) {
                    // Закриваємо всі відкриті попапи
                    popups.forEach((otherPopup) => {
                        otherPopup.classList.remove('popup-open');
                    });
                    // Знаходимо відповідний попап за значенням data-popup
                    const correspondingPopup = document.querySelector(`[data-popup="${popupIdToOpen}"]`);
                    if (correspondingPopup) {
                        // Відкриваємо відповідний попап та блокуємо прокрутку body
                        correspondingPopup.classList.add('popup-open');
                        bodyElement.style.overflow = 'hidden';
                    }
                }
            });

            // Перевіряємо кнопки закриття
            popupButtonsClose.forEach((closeButton) => {
                // Перевіряємо, чи клікнуто на кнопку закриття та чи відкритий попап
                if (targetElement === closeButton || targetElement.closest('[data-popup-close]') === closeButton && popup.classList.contains('popup-open')) {
                    // Закриваємо попап та відновлюємо прокрутку body
                    popup.classList.remove('popup-open');
                    bodyElement.style.overflow = 'auto';
                }
            });

            // Перевіряємо клік на самому попапі (поза його вмістом)
            if (popup.classList.contains('popup-open')) {
                // Якщо клікнуто поза вмістом попапа, закриваємо його та відновлюємо прокрутку body
                if (targetElement === popup && targetElement !== popup.firstChild) {
                    popup.classList.remove('popup-open');
                    bodyElement.style.overflow = 'auto';
                }
            }
        });
    }
});
