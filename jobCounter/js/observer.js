"use strict";


// INTERSECTION OBSERVER UNIVERSAL =========
// Delegation with change options
/*
data-intersect40 / 80 - до блоку за яким стежимо
data-intersect40="else" - Додати else для того щоб виконувалася 
умова прибирання класу 'show'.
*/
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

*/