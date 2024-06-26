"use strict";
/*
data-thgallery-main - додати до контейнера великого зображення
data-thgallery-main="записати кількість секунд 
переключення між картинками"
data-thgallery-thumb - додати до маленьких зображень галереї (thumbnails)

Приклад структури для галереї
<section class="gallery">
        <!-- BIG IMAGE CONTAINER -->
        <div class="gallery-active-container">
            <img class="gallery-active" src="--!path to first image!--" alt="first image">
        </div>
        <!-- SMALL IMAGES THUMBNAILS -->
        <div class="gallery-thumbs">
            <div class="thumnail active">
                <img class="thumbnail-image" src="--!path to first image!--" alt="first image">
            </div>
            <div class="thumnail">
                <img class="thumbnail-image" src="--!path to second image!--" alt="second image">
            </div>
            <div class="thumnail">
                <img class="thumbnail-image" src="--!path to second image!--" alt="second image">
            </div>
            <div class="thumnail">
                <img class="thumbnail-image" src="--!path to second image!--" alt="second image">
            </div>
        </div>
    </section>
*/

const galleryActiveCont = document.querySelector('[data-thgallery-main]');
const galleryActive = galleryActiveCont.querySelector('img');
const thumbnails = document.querySelectorAll('[data-thgallery-thumb]');
const thumbnailArray = Array.from(thumbnails);
let activeImage;
let timer;
const timingInterval = galleryActiveCont.dataset.thgalleryMain * 1000;

/* Ф-цію autoRotateImage можна закоментувати так само як і activeImage, 
timer, timingInterval тоді галерея працюватиме лише на клік.
 */
autoRotateImage();
function autoRotateImage() {
    timer = setInterval(function () {
        activeImage = document.querySelector('.thumbnail.active');
        if (activeImage === thumbnailArray[thumbnailArray.length -1]) {
            const newImg = thumbnailArray[0];
            updateActiveImage(newImg);
        } else {
            const newImg = activeImage.nextElementSibling;
            updateActiveImage(newImg);
        }
    }, timingInterval)
}
function updateActiveImage(img) {
    thumbnails.forEach(img => {
        img.classList.remove('active');
    })
    img.classList.add('active');
    galleryActive.src = img.querySelector('img').src;
}
thumbnails.forEach(img => {
    img.addEventListener("click", function () {
        updateActiveImage(img);
        clearInterval(timer);
        autoRotateImage();
    })
})