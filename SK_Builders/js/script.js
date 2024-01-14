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

// MENU LINK HOVER STYLE FROM SUB MENU ==========================
const subMenusWrappers = document.querySelectorAll('.wrapper-spoller');

subMenusWrappers.forEach((wrapper) => {
    if (!bodyElement.classList.contains('touch')) {
        const subMenuLink = wrapper.previousElementSibling;
        wrapper.addEventListener("mouseenter", () => {
            subMenuLink.classList.add('_mouse-in');
        });
        wrapper.addEventListener("mouseleave", () => {
            subMenuLink.classList.remove('_mouse-in');
        });
    }
});

// BURGER BUTTON & MENU ===================================
const burgerButton = document.querySelector('.button-burger');

document.addEventListener("click", documentActions);

function documentActions(e) {
    const targetElement = e.target;
    // BURGER BUTTON & MENU ========================
    if (burgerButton) {
        if (targetElement === burgerButton) {
            bodyLockToggle();
            burgerButton.classList.toggle('burger-active');
            if (burgerButton.classList.contains('burger-active')) {
                bodyElement.classList.add('menu-open');
                bodyLock();
            } else {
                bodyElement.classList.remove('menu-open');
                bodyUnlock();
            }
        }
    }
    // FORMS RESET ==================================
    if (resetButtons) {
        resetButtons.forEach((button) => {
            if (targetElement === button) {
                formReset(loginForm);
                formReset(registerForm);
            }
        });
    }
    // SUB-MENU ON TOUCHSCREEN =====================
    if (bodyElement.classList.contains('touch') && !burgerButton) {
        console.log(targetElement);
        const menuLinks = document.querySelectorAll('.menu-header__link');
        const subMenus = document.querySelectorAll('.sub-menu');
        menuLinks.forEach((link) => {
            subMenus.forEach((subMenu) => {
                if (targetElement === link) {
                    link.parentElement.classList.toggle('sub-open');
                    link.preventDefault();
                } else if (targetElement !== link && targetElement !== subMenu) {
                    link.parentElement.classList.remove('sub-open');
                }
            })
        })
    }
}


// SWIPER =================================================
// SLIDER PROJECT ================
const swiper = new Swiper('.slider-project', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    // autoplay: {
    //     delay: 3000,
    // },
    speed: 500,
    
    // Navigation arrows
    navigation: {
      nextEl: '.slider-project__next',
      prevEl: '.slider-project__prev',
    },
  
});
  
// SLIDER QUALITY ================
const swiper2 = new Swiper('.slider-quality', {
    // Optional parameters
    direction: 'horizontal',
    // loop: true,
    speed: 500,
    slidesPerView: 1,
    spaceBetween: -250,
    breakpoints: {
        593: {
            spaceBetween: -400,
        },
    },
    // effect: "cards",
    // grabCursor: true,
});

// MODAL-FORMS =============================================
const buttonsLogin = document.querySelectorAll('.button-form_login');
const buttonsRegister = document.querySelectorAll('.button-form_register');
const modalLogin = document.querySelector('.modal-main_login');
const modalRegister = document.querySelector('.modal-main_register');


function handleModalChange(modal, activeButtons, inactiveButtons) {
    const observer = new MutationObserver(() => {
      if (modal.classList.contains('popup-open')) {
        activeButtons.forEach((button) => {
          button.classList.add('button-active');
        });
        inactiveButtons.forEach((button) => {
          button.classList.remove('button-active');
        });
      } else {
        activeButtons.forEach((button) => {
          button.classList.remove('button-active');
        });
      }
    });
  
    observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
}
  
handleModalChange(modalLogin, buttonsLogin, buttonsRegister);
handleModalChange(modalRegister, buttonsRegister, buttonsLogin);


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
*/

let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
	if (document.documentElement.classList.contains('lock')) {
		bodyUnlock(delay);
	} else {
		bodyLock(delay);
	}
}
let bodyUnlock = (delay = 500) => {
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
let bodyLock = (delay = 500) => {
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

// INTERSECTION OBSERVER =======================

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

const elementsObserve = document.querySelectorAll('[data-observe]');
elementsObserve.forEach((element) => {
    observer.observe(element);
});
const elementsObserveUp = document.querySelectorAll('[data-show-down]');
elementsObserveUp.forEach((element) => {
    observer.observe(element);
});

// FORMS ===================================
const forms = document.forms;

const loginForm = forms.login;
const registerForm = forms.register;

const loginFormName = loginForm.name;
const loginFormEmail = loginForm.email;
const loginFormInputs = loginForm.querySelectorAll('input');

const registerFormName = registerForm.name;
const registerFormEmail = registerForm.email;
const registerFormCompany = registerForm.company;
const registerFormCountry = registerForm.country;
const registerFormInputs = registerForm.querySelectorAll('input');

const resetButtons = document.querySelectorAll('.button_reset');

function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
};


loginForm.addEventListener("submit", (e) => {
    if (emailTest(loginFormEmail) && !loginFormEmail.classList.contains('_error') && !loginFormEmail.nextElementSibling) {
        loginFormEmail.classList.add('_error');
        loginFormEmail.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form-error">
            Enter email
            </div>`
        );
        e.preventDefault();
    }
    if (loginFormEmail.classList.contains('_error')) {
        e.preventDefault();
    }
    if (loginFormName.value.length <= 0 && !loginFormName.classList.contains('_error') && !loginFormName.nextElementSibling) {
        loginFormName.classList.add('_error');
        loginFormName.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form-error">
            Enter name
            </div>`
        );
        e.preventDefault();
    }
    if (loginFormName.classList.contains('_error')) {
        e.preventDefault();
    }
});

loginForm.addEventListener("focusin", () => {
    loginFormName.classList.remove('_error');
    if (loginFormName.nextElementSibling) {
        loginFormName.nextElementSibling.remove();
    }
    loginFormEmail.classList.remove('_error');
    if (loginFormEmail.nextElementSibling) {
        loginFormEmail.nextElementSibling.remove();
    }
});

registerForm.addEventListener("submit", (e) => {
    registerFormInputs.forEach((input) => {
        if (input.value.length <= 0 && input !== registerFormEmail && !input.classList.contains('_error')) {
            input.classList.add('_error');
            input.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form-error">
                Enter info
                </div>`
            );
            e.preventDefault();
        };
        if (input.classList.contains('_error')) {
            e.preventDefault();
        }
    })
    if (emailTest(registerFormEmail) && !registerFormEmail.classList.contains("_error")) {
        registerFormEmail.classList.add("_error");
        registerFormEmail.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form-error">
            Enter email
            </div>`
        );
        e.preventDefault();
    }
    
});
registerForm.addEventListener("focusin", () => {
    registerFormInputs.forEach((input) => {
        input.classList.remove('_error');
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        }
    })
    if (registerFormEmail.nextElementSibling) {
        registerFormEmail.nextElementSibling.remove();
    };
});
function formReset(form) {
    if (form instanceof HTMLFormElement) {
      form.reset();
    }
}