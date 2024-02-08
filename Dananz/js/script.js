"use strict";

const bodyElement = document.body;

window.addEventListener("load", domLoaded);
function domLoaded() {
    bodyElement.classList.add('loaded');
}

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


const burgerButton = document.querySelector('.burger-button');
document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;
    if (burgerButton) {
        if (targetElement === burgerButton) {
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
    // CUSTOM SELECT ===========================
    if (selectCountry) {
        if (targetElement === selectMainField) {
            selectCountry.classList.toggle('open');
        }
    }
}

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

// Form Focus ==================
const homeFormInput = document.querySelector('.form-email__field input');
homeFormInput.addEventListener("focus", () => {
    homeFormInput.parentElement.classList.add('in-focus');
});
homeFormInput.addEventListener("blur", () => {
    homeFormInput.parentElement.classList.remove('in-focus');
});

// SELECT MENU =========================
const selectCountry = document.querySelector('.country-select');
const selectMainField = document.querySelector('.country-select__main-field');
const selectMenu = document.querySelector('.country-select__menu');
const selectOptions = document.querySelectorAll('.country-select__option');

selectOptions.forEach((option) => {
    option.addEventListener("click", () => {
        selectOptions.forEach((option) => {
            option.classList.remove('selected');
        });
        option.classList.add('selected');
        selectMainField.innerHTML = option.innerHTML;
        selectCountry.classList.remove('open');
    });
});



// INTERSECTION OBSERVER UNIVERSAL =========
// Delegation with change options
/*
data-intersect40="else" - Додати else для того щоб виконувалася 
умова прибирання класу 'show'.
*/

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
        } else if (targetElement.dataset.intersect40 === 'else') {
            targetElement.classList.remove('show');
        }
    })
}, options);
const observer2 = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add('show');
        } else if (targetElement.dataset.itersect80 === 'else') {
            targetElement.classList.remove('show');
        }
    })
}, options2);

const intersectedItems40 = document.querySelectorAll('[data-intersect40]');
intersectedItems40.forEach((item) => {
    observer.observe(item);
});
const intersectedItems80 = document.querySelectorAll('[data-intersect80]');
intersectedItems80.forEach((item) => {
    observer2.observe(item);
});


// Виберіть елемент, до якого ви хочете додати/видалити клас
/*
Поява і зникнення хедеру на сторінці.
*/
const header = document.querySelector('.header');
let prevScrollPos = window.scrollY;
const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY;
    if (currentScrollPos >= 2 * headerHeight) {
        header.classList.add('_hide');
    } else {
        header.classList.remove('_hide');
    }
    if (prevScrollPos > currentScrollPos) {
        header.classList.add('_in');
    } else {
        header.classList.remove('_in');
    }
    prevScrollPos = currentScrollPos;
});