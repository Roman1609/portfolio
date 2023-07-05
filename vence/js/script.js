"use strict"


// ============== MENU ================

// Отримати всі пункти головного меню
const menuPoints = document.querySelectorAll('.main-menu__point');


// Додати обробник події для кожного пункту меню
menuPoints.forEach(function(point) {
    point.addEventListener('click', function(e) {
        // Заборонити перехід посиланням
        // e.preventDefault();
        
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
        // e.preventDefault();

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

// === MAIN MENU ===

// Отримати всі пункти меню на другій сторінці
const menuMainPoints = document.querySelectorAll('.menu-main__point');

// Додати обробник події для кожного пункту меню на другій сторінці
menuMainPoints.forEach(function(point) {
    point.addEventListener('click', function(e) {
        // Заборонити перехід посиланням

        // Знайти підменю, яке відповідає натиснутому пункту меню
        const subMainMenu = point.querySelector('.sub-main');

        // Закрити всі інші підменю на другій сторінці
        closeOtherSubMainMenus(subMainMenu);

        // Змінити видимість підменю
        subMainMenu.classList.toggle('sub-main_open');
    });
});
document.addEventListener('click', function(e) {
    if (!e.target.closest('.sub-main')) {
        closeOtherSubMainMenus(null);
    }
});

// Функція для закриття всіх інших підменю на другій сторінці, крім поточного
function closeOtherSubMainMenus(currentSubMainMenu) {
    const allSubMainMenu = document.querySelectorAll('.sub-main');

    allSubMainMenu.forEach(function(subMainMenu) {
        if (subMainMenu !== currentSubMainMenu && subMainMenu.classList.contains('sub-main_open')) {
            subMainMenu.classList.remove('sub-main_open');
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

const homeBurger = document.querySelector('.home-burger');
const mainMenu = document.querySelector('.header-main-menu__menu');

const socialBurger = document.querySelector('.social-burger');
const mainSocial = document.querySelector('.header-main-menu__social');

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
    else if (targetElement.closest('.home-burger')) {
        homeBurger.classList.toggle('home-burger_open');
        mainMenu.classList.toggle('header-main-menu__menu_open');
        e.preventDefault();
    }
    else if (targetElement.closest('.social-burger')) {
        socialBurger.classList.toggle('social-burger_open');
        mainSocial.classList.toggle('header-main-menu__social_open');
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

new Swiper('.slider-article', {
    pagination: {
        el: '.slider-article__pagination',
        clickable: true,
    },

    slidesPerView: 0.5,
    centeredSlides: false,
    freeMode: true,
    
    initialSlide: 1,
    spaceBetween: 30,
    speed: 1000,
    loop: true,
    breakpoints: {
        698: {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            centeredSlides: true,
            freeMode: false,
            loop: false,
        },
    },
});

new Swiper('.slider-inst', {
    pagination: {
        el: '.slider-inst__pagination',
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

new Swiper('.art-slider', {
    pagination: {
        el: '.art-slider__pagination',
        dymamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + '0' + (index + 1) + '</span>';
        }
    },
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
    speed: 800,
    direction: 'vertical',
    
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

const designsPoints = document.querySelectorAll('.selector-designs__point');

designsPoints.forEach(function(desPoint) {
    desPoint.addEventListener('click', function() {
    // Видаляємо клас .selector-designs__point_active у всіх пунктів меню
    designsPoints.forEach(function(item) {
      item.classList.remove('selector-designs__point_active');
    });

    // Додаємо клас .selector-designs__point_active до натиснутого пункту меню
    desPoint.classList.add('selector-designs__point_active');
  });
});
