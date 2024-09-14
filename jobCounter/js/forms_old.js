"use strict";

// FORMS ===================================
// const forms = document.forms;
// const submitButtons = document.querySelectorAll('[data-form-submit]');

/*
До кожної форми, яку потрібно перевіряти, додайте атрибут data-valid-form.
Клас _filled автоматично додається до батьківського елементу інпуту, який має дані. Немає потреби вручну додавати цей клас.
Клас _focused додається до бфтьківського ел інпута який знаходиться у фокусі
Клас _error додається до батьківського ел інпута якщо внесено не вірні дані
або поле не заповнене (для поля обов'язково required)
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
до інпут додати data-error-message="якесь повідомлення"
*/
function errorInput(input) {
    const errorMessage = input.dataset.errorMessage;
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

/*
до кожної форми яку потрібно перевіряти додати data-valid-form
*/
const validForms = document.querySelectorAll('[data-valid-form]');
function validationForm() {
    validForms.forEach((form) => {
        const textInputs = form.querySelectorAll('input[type="text"]');
        const allInputs = form.querySelectorAll('input');
        const emailInputs = form.querySelectorAll('input[type="email"]');

        allInputs.forEach((input) => {
            // усі інпути подія фокус та блур ==========
            input.addEventListener("focus", () => {
                input.parentElement.classList.add('_focused');
                removeError(input);
            });
            input.addEventListener("blur", () => {
                input.parentElement.classList.remove('_focused');
            });
            // Перевірка чекбоксів та радіо ===========
            input.addEventListener("change", () => {
                if (input.type === "checkbox" || input.type === "radio") {
                    input.parentElement.classList.add('_chosen');
                    removeError(input);
                } 
                if (input.type === "file") {
                    input.parentElement.classList.add('_file-loaded');
                    removeError(input);
                } else {
                    input.parentElement.classList.remove('_chosen');
                    input.parentElement.classList.remove('_file-loaded');
                    errorInput(input);
                }
            })
        });
        // перевірка текстових інпутів ====================
        textInputs.forEach((input) => {
            input.addEventListener("change", () => {
                if (input.value === '' && input.required) {
                    input.parentElement.classList.remove('_filled');
                    errorInput(input);
                } else if (input.value === '' || input.value.length <= 0 && !input.required) {
                    input.parentElement.classList.remove('_filled');
                    removeError(input);
                } else {
                    input.parentElement.classList.add('_filled');
                    removeError(input);
                }
            }); 
        });
        emailInputs.forEach((email) => {
            email.addEventListener("change", () => {
                if (email.value !== '' && !emailTest(email)) {
                    email.parentElement.classList.add('_filled');
                    removeError(email);
                } else if (email.value === '' && emailTest(email) && email.required) {
                    email.parentElement.classList.remove('_filled');
                    errorInput(email);
                    isValid = false;
                } else if (email.value === '' && email.value.length <= 0) {
                    email.parentElement.classList.remove('_filled');
                    removeError(email);
                }
            })
            
            const submitButtons = form.querySelectorAll('button[type="submit"]');
            submitButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const currentForm = button.closest('form');
                    if (currentForm && !validationForm(currentForm)) {
                        event.preventDefault();
                        console.log('-');
                    } else {
                        event.preventDefault();
                        console.log('+');
                    }
                });
            });

        });
        clickOnLabels();
    });
}
validationForm();

// Очищення форми ===============================

function formReset(form) {
    if (form instanceof HTMLFormElement) {
      form.reset();
    }
}

/*
Приклад застосування ===================== замінити на [data-form-reset]
const resetButtons = document.querySelectorAll('.button_reset');
Код нижче помістити у функцію 'клік'
if (resetButtons) {
        resetButtons.forEach((button) => {
            if (targetElement === button) {
                formReset(loginForm);  -- (назва форми)
                formReset(registerForm); -- (назва форми)
            }
        });
    }
*/

// ========= Your Form and Form Elements ==================


