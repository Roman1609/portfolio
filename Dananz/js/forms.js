"use strict";

// FORMS =======================================
const forms = document.forms;

/* ========================================================================
Взяти у змінні потрібні форми, та пропустити їх через функцію нижче
======================================================================== */
const contactForm = forms.contactForm;
const validInputs = contactForm.querySelectorAll('[data-error-input]');

/*
Клас _filled автоматично додається до батьківського елементу інпуту, який має дані. Немає потреби вручну додавати цей клас.
Клас _focused додається до батьківського ел інпута який знаходиться у фокусі
Клас _error додається до батьківського ел інпута якщо внесено не вірні дані
або поле не заповнене
в CSS додати .form-error - клас елементу помилки, який виникає одночасно
із присвоєнням класу _error і додається в кінець батьківського ел. інпута.
*/
/*
Email Validation ============================
*/
function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
/*
Функція помилки, додавання класу та елементу
до інпут додати data-error-input="якесь повідомлення"
*/
function errorInput(input) {
    const errorMessage = input.dataset.errorInput;
    let errorElement = document.createElement('div');
    errorElement.className = 'form-error';
    errorElement.textContent = errorMessage;

    if (!input.parentElement.classList.contains('_error')) {
        input.parentElement.classList.add('_error');
        input.parentElement.insertAdjacentElement("beforeend", errorElement);
    }
}
function removeError(input) {
    input.parentElement.classList.remove('_error');
    let errorElement = input.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}
// клік на лейбли прив'язується по id лейбла та інпута
function clickOnLabels() {
    const labels = document.querySelectorAll('label');
    labels.forEach((label) => {
        // Додаємо обробник події для кліку на label
        label.addEventListener('click', () => {
            const targetId = label.getAttribute('for');
            const targetInput = document.getElementById(targetId);
            if (targetInput) {
                targetInput.focus();
            }
        });
    });
};
clickOnLabels();

// Перевірка заповненості поля
function isNotEmpty(input) {
    if (input.value !== '' && input.value !== null && !input.parentElement.classList.contains('_error')) {
        input.parentElement.classList.add('_filled');
    } else {
        input.parentElement.classList.remove('_filled');
    }
}

function submitForm(form) {
    form.addEventListener("submit", (e) => {
        validInputs.forEach((input) => {
            removeError(input);
            if (input.type === "text" || input.type === "tel") {
                if (input.value === '' || input.value == null) {
                    errorInput(input);
                } else {
                    removeError(input);
                }
            } else if (input.type === "email") {
                if (input.value === '' || input.value == null) {
                    errorInput(input);
                } else if (input.value !== '' && emailTest(input)) {
                    errorInput(input);
                }
                else {
                    removeError(input);
                }
            }
            const inputParent = input.parentElement;
            if (inputParent.classList.contains('_error')) {
                e.preventDefault();
                console.log('not submitted');
            } else {
                e.preventDefault();
                console.log('submitted');
            }
        });
    });
}
submitForm(contactForm);

validInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        removeError(input);
    });
    input.addEventListener("blur", () => {
        isNotEmpty(input);
    });
});






