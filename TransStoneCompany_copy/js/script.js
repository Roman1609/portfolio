"use strict";

const bodyElement = document.body;
const burgerButton = document.querySelector('.burger-button');

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

document.addEventListener("click", documentActions);
function documentActions(e) {
	const targetElement = e.target;
	// =============== BURGER MENU ====================
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
}
// Блокування вікна при відкриванні меню ===================

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


const swiper = new Swiper('.slider-services__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
        delay: 3500,
    },
    speed: 1000,
    
	pagination: {
		el: ".slider-services__pagination",
	},
});

/*
data-intersect40 / 80 - до блоку за яким стежимо
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
let optionsLandscape = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.2,
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
const observerLandscape = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add('show');
        } else if (targetElement.dataset.itersect80 === 'else') {
            targetElement.classList.remove('show');
        }
    })
}, optionsLandscape);

const aspectRatio = window.innerWidth / window.innerHeight;
const isLandscape = aspectRatio > 1; 
console.log(isLandscape);
const intersectedItems40 = document.querySelectorAll('[data-intersect40]');
intersectedItems40.forEach((item) => {
    if (isLandscape) {
        observerLandscape.observe(item);
        console.log('ladscape');
    } else {
        observer.observe(item);
        console.log('simple');
    }
});
const intersectedItems80 = document.querySelectorAll('[data-intersect80]');
intersectedItems80.forEach((item) => {
    if (isLandscape) {
        observerLandscape.observe(item);
        console.log('ladscape');
    } else {
        observer2.observe(item);
        console.log('simple');
    }
});


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

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    const formFields = form.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
        formRemoveError(this); // Викликати formRemoveError при фокусі
        });
    });

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        
        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Помилка');
                form.classList.remove('_sending');
            }
        } else {
            alert("Заповніть обов'язкові поля");
        }
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            const textarea = formReq[index];
            formRemoveError(input);
            formRemoveError(textarea);
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            } 
            if (textarea && textarea.value === '') { // Перевірка textarea
                formAddError(textarea);
                error++;
            }
        }        
        return error;
    }
    
    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
        console.log('class add');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
        console.log('class remove');
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});
