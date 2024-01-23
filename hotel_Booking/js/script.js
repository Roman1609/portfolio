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

// BURGER-BUTTON =====================================
const burger = document.querySelector('.burger-button');

// DOCUMENT CLICKS =====================================
document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;
    // console.log(targetElement);
    // BURGER BUTTON & MENU ACTIONS =========================
    if (burger) {
        if (targetElement === burger) {
            bodyLockToggle();
            burger.classList.toggle('burger-active');
            if (burger.classList.contains('burger-active')) {
                bodyElement.classList.add('menu-open');
                bodyLock();
            } else {
                bodyElement.classList.remove('menu-open');
                bodyUnlock();
            }
        }
    }
}

// Блокування вікна при відкриванні меню ===================
/*
ДОДАТИ В SCSS 
body {
	// Скролл заблоковано
	.lock & {
		overflow: hidden;
		touch-action: none;
		overscroll-behavior: none;
	}
	// Сайт завантажений
	.loaded & {
	}
} 
Приклад застосування ======================

*/

let bodyLockStatus = true;
let bodyLockToggle = (delay = 0) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 0) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			document.documentElement.classList.remove("lock");
		}, delay);
		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}
let bodyLock = (delay = 0) => {
	let body = document.querySelector("body");
	if (bodyLockStatus) {
		let lock_padding = document.querySelectorAll("[data-lp]");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		document.documentElement.classList.add("lock");

		bodyLockStatus = false;
		setTimeout(function () {
			bodyLockStatus = true;
		}, delay);
	}
}

const swiper = new Swiper('.testimonials__swiper', {
    // Optional parameters
    direction: 'horizontal',
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-testimonial__next',
      prevEl: '.swiper-testimonial__prev',
    },
});


// Очищення форми ===============================
/*
function formReset(form) {
    if (form instanceof HTMLFormElement) {
      form.reset();
    }
}
*/
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

// INTERSECTION OBSERVER UNIVERSAL =========
// Delegation with change options
/*
let options = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.4
};
let options2 = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.8,
}
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add('show');
        }
    })
}, options);
const observer2 = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add('show');
        }
    })
}, options2);
const paragraphs = document.querySelectorAll('.lesson-1__content>p');
paragraphs.forEach((paragraph) => {
    observer.observe(paragraph);
});
const images = document.querySelectorAll('img');
images.forEach((image) => {
    observer2.observe(image);
})
*/

/* ==================================================
КАСТОМНИЙ СЕЛЕКТ ІЗ РАДІОІНПУТІВ НЕ ПІДТРИМУЄ MULTIPLE ===
До інпута який виконує функцію select додати data-select
До контейнера options додати data-select-cont
В інпути які виступають option-ами написати ім'я name="optionInput"
помістивши їх в контейнер
<div class="sub-form__option option-1">
    <input id="option-1" value="1 room, 1 guest" name="optionInput" type="radio">
    <label for="option-1">1 room, 1 guest</label>
</div>
*/


// FORM FOCUS ===================================
const mainForm = document.forms.mainSearch;
const mainFormInputs = mainForm.querySelectorAll('input');

const optionsContainer = document.querySelector('[data-select-cont]');
const selectInput = document.querySelector('[data-select]');
const optionLabels = optionsContainer.querySelectorAll('label');

selectInput.addEventListener("focus", () => {
    optionsContainer.classList.add('open');
});
selectInput.addEventListener("blur", () => {
    optionsContainer.classList.remove('open');
});

optionLabels.forEach((label) => {
    label.addEventListener('click', () => {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);
        if (input) {
            input.checked = true;
            selectInput.value = label.innerText;
        }
    });
});

const dates = document.querySelectorAll("input[type=date]");
dates.forEach((date) => {

});

// Flatpicr =============

const dateInputs = document.querySelectorAll('input[type="date"]');

dateInputs.forEach((dateInput) => {
    flatpickr(dateInput, {
        altInput: true,
        altFormat: "j F, Y",
        dateFormat: "d-m-Y",
        defaultDate: "2023-01-01",
    });
});

