"use strict"


// ============== MENU ================

// Отримати всі пункти головного меню
const menuPoints = document.querySelectorAll('.main-menu__point');


// Додати обробник події для кожного пункту меню
menuPoints.forEach(function(point) {
    point.addEventListener('click', function(e) {
        // Заборонити перехід посиланням
        e.preventDefault();
        
        // Знайти підменю, яке відповідає натиснутому пункту меню
        const subMenu = point.querySelector('.sub-menu');

        // Закрити всі інші підменю
        closeOtherSubMenus(subMenu);
        
        // Змінити видимість підменю
        subMenu.classList.toggle('sub-menu_open');
    });
});

// Функція для закриття всіх інших підменю, крім поточного
function closeOtherSubMenus(currentSubMenu) {
    const allSubMenus = document.querySelectorAll('.sub-menu');
    
    allSubMenus.forEach(function(subMenu) {
      if (subMenu !== currentSubMenu && subMenu.classList.contains('sub-menu_open')) {
        subMenu.classList.remove('sub-menu_open');
        };
    });
};

//  SINGLE PAGE MENU

// Отримати всі пункти меню на другій сторінці
const menuPointsSp = document.querySelectorAll('.menu-list__point');

// Додати обробник події для кожного пункту меню на другій сторінці
menuPointsSp.forEach(function(point) {
    point.addEventListener('click', function(e) {
        // Заборонити перехід посиланням
        e.preventDefault();

        // Знайти підменю, яке відповідає натиснутому пункту меню
        const subMenuSp = point.querySelector('.sub-menu-sp');

        // Закрити всі інші підменю на другій сторінці
        closeOtherSubMenusSp(subMenuSp);

        // Змінити видимість підменю
        subMenuSp.classList.toggle('sub-menu-sp_open');
    });
});

// Функція для закриття всіх інших підменю на другій сторінці, крім поточного
function closeOtherSubMenusSp(currentSubMenuSp) {
    const allSubMenusSp = document.querySelectorAll('.sub-menu-sp');

    allSubMenusSp.forEach(function(subMenuSp) {
        if (subMenuSp !== currentSubMenuSp && subMenuSp.classList.contains('sub-menu-sp_open')) {
            subMenuSp.classList.remove('sub-menu-sp_open');
        }
    });
}


// ============== MENU ================



document.addEventListener("click", documentClicks);

const menuBurger = document.querySelector('.menu-burger');
const mainMenuWrapper = document.querySelector('.main-menu');
const categoriesMenu = document.querySelector('.categories__menu');

const colOptions3 = document.querySelector('.col-options__3-column');
const colOptions4 = document.querySelector('.col-options__4-column');
const categoriesItems = document.querySelector('.items');

const menuBurgerSp = document.querySelector('.menu-block__burger');
const menuSp = document.querySelector('.menu-block__menu');

function documentClicks(e) {
    const targetElement = e.target;

    if (targetElement.closest('.menu-burger')) {
        menuBurger.classList.toggle('burger-open');
        mainMenuWrapper.classList.toggle('menu-open');
        e.preventDefault();
    }
    else if (targetElement.closest('.menu-block__burger')) {
        menuBurgerSp.classList.toggle('menu-block__burger_open');
        menuSp.classList.toggle('menu-block__menu_open');
        e.preventDefault();
    }
    else if (targetElement.closest('.categories__selector')) {
        categoriesMenu.classList.toggle('categories__menu_in-view');
        e.preventDefault();
    } 
    else if (targetElement.closest('.col-options__3-column')) {
        colOptions4.classList.remove('chosen');
        colOptions3.classList.add('chosen');
        categoriesItems.classList.remove('columns-4');
        e.preventDefault();
    }
    else if (targetElement.closest('.col-options__4-column')) {
        colOptions3.classList.remove('chosen');
        colOptions4.classList.add('chosen');
        categoriesItems.classList.add('columns-4');
        e.preventDefault();
    }
        // Запуск ф-ції закривання меню якщо клік на інший об'єкт
    else if (!e.target.closest('.main-menu__point') && !e.target.closest('.sub-menu') && !targetElement.closest('.categories')) {
        closeOtherSubMenus(null);
    }
    else {
        // Видалення класу для інших об'єктів
        menuBurger.classList.remove('burger-open');
        mainMenuWrapper.classList.remove('menu-open');
        categoriesMenu.classList.remove('categories__menu_in-view');
    }
};

// ========= Sliders =============

new Swiper('.home-slider', {
    pagination: {
        el: '.slider-pagination',
        type: 'fraction',
    },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 1000,
    loop: true,
});

new Swiper('.topics-slider', {
    pagination: {
        el: '.topics-slider__pagination',
        type: 'fraction',
    },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 1000,
    loop: true,
});

new Swiper('.slider-sp', {
    pagination: {
        el: '.slider-sp__pagination',
        clickable: true,
        dynamicBullets: true,
    },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 1000,
    loop: true,
});

// === MENU BG SHOW =====

const headerBg = document.querySelector('.header_bg');
const categories = document.querySelector('.categories');
const articles = document.querySelector('.articles');

function changeHeaderClass() {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    
    if ((categories && scrollPosition >= categories.offsetTop - 70) || (articles && scrollPosition >= articles.offsetTop - 150)) {
        headerBg.classList.add('background');
    } else {
        headerBg.classList.remove('background');
    }
}
  
window.addEventListener('scroll', changeHeaderClass);

// === MENU BG SHOW =====