"use strict"
//================= OUR SERVICES TABS==========
const services = document.querySelector('.services-nav');


services.addEventListener('click', (evt) => {
    document.querySelectorAll('.nav-item').forEach(
    item => item.classList.remove('active-tab'));

    document.querySelectorAll('.services-info').forEach(
    item => item.classList.remove('active-text'));

    (evt.target).closest('li').classList.add('active-tab');


    const info = (evt.target).closest('li').getAttribute('data-tab');
    document.querySelector(`[data-info="${info}"]`).classList.add('active-text');

})
//=============== end of OUR SERVICES TABS ==================
//================== Our Amazing Work pistures filtering(tabs)==================
const loadMore = document.getElementById('load');
const work = document.querySelector('.work-nav');

work.addEventListener('click', (evt) => {
    const photos = document.querySelectorAll('.work-photo-block > .cell > img');
    const imgCover = Array.from(document.querySelectorAll('.img-cover'));
    const cells = Array.from(document.querySelectorAll('.cell'));


    let id = (evt.target).closest('li').id;
    switch (id) {
        case "Graphic design":
            viewImg(photos, imgCover, cells, id);
            break;
        case "Web design":
            viewImg(photos, imgCover, cells, id);
            break;
        case "Landing pages":
            viewImg(photos, imgCover, cells, id);
            break;
        case "Wordpress":
            viewImg(photos, imgCover, cells, id);
            break;
        default:
            photos.forEach(el => el.classList.remove('hide'));
            imgCover.forEach(el => el.style.display = 'flex');
            cells.forEach(el => el.style.display = 'flex');
            break;
    }
});

function viewImg(photos, imgCover, cells, id) {
    photos.forEach(el => {
        el.classList.add('hide');
        if (el.getAttribute('data-category') == id) el.classList.remove('hide');
    });
    imgCover.forEach(el => {
        el.style.display = 'none';
        if (el.previousElementSibling.getAttribute('data-category') == id) el.style.display = 'flex';
    });
    cells.forEach(el => {
        el.style.display = 'none';
        if (el.firstElementChild.getAttribute('data-category') == id) el.style.display = 'flex';

    });
}
//====================== end of Our Amazing Work pistures filtering(tabs)==================
//====================== Imitation of Loading by clicking on "Load More"  ====================

let imagesArr = ["img/wordpress/wordpress1.jpg", "img/wordpress/wordpress2.jpg", "img/wordpress/wordpress3.jpg", "img/wordpress/wordpress4.jpg", "img/wordpress/wordpress5.jpg", "img/wordpress/wordpress6.jpg", "img/wordpress/wordpress7.jpg", "img/wordpress/wordpress8.jpg", "img/wordpress/wordpress9.jpg", "img/wordpress/wordpress10.jpg", "img/wordpress/wordpress3.jpg", "img/wordpress/wordpress4.jpg","img/wordpress/wordpress1.jpg", "img/wordpress/wordpress2.jpg", "img/wordpress/wordpress3.jpg", "img/wordpress/wordpress4.jpg", "img/wordpress/wordpress5.jpg", "img/wordpress/wordpress6.jpg", "img/wordpress/wordpress7.jpg", "img/wordpress/wordpress8.jpg", "img/wordpress/wordpress9.jpg", "img/wordpress/wordpress10.jpg", "img/wordpress/wordpress3.jpg", "img/wordpress/wordpress4.jpg"];

let imagesCategoryArr = ["Graphic design", "Web design", "Landing pages", "Wordpress", "Graphic design", "Web design", "Landing pages", "Wordpress", "Graphic design", "Web design", "Landing pages", "Wordpress", "Graphic design", "Web design", "Landing pages", "Wordpress", "Graphic design", "Web design", "Landing pages", "Wordpress", "Graphic design", "Web design", "Landing pages", "Wordpress"];

const div = document.querySelector('.work-photo-block');


loadMore.addEventListener('click', (evt) => {
    evt.preventDefault();

    let loader = document.createElement('div');
    loader.setAttribute('class','loader');
    loadMore.before(loader);
    loadMore.style.display = 'none';


    let cloned = 0;
    setTimeout(() => {
        let cells = Array.from(document.querySelectorAll('.cell'));
        let original = cells.length;
        if( cells.length == 24) {
            cells = cells.slice(0, 12);
        }
        let cellsClone = cells.map(cell => cell.cloneNode(true));

           cellsClone.forEach(cell => {

            cell.firstElementChild.setAttribute('src', imagesArr[cloned]);
            cell.firstElementChild.setAttribute('data-category', imagesCategoryArr[cloned]);
            cell.querySelector('.cover-subtitle').innerHTML = cell.firstElementChild.getAttribute('data-category');
            div.appendChild(cell);
            cloned++;

          });

        loadMore.style.display = 'inline-block';
        if ((original + cloned) > 24) {
                loadMore.style.display = 'none';
                div.style.paddingBottom = '50px';
        }

        loader.remove();


    }, 2000);

});

//========================= end of Imitation of Loading by clicking on "Load More"  ====================


//======================= PEOPLE SAY SLIDER ANIMATION =======================//

const track = document.querySelector('.carousel_track');
const slides = Array.from(document.querySelectorAll('.carousel_slide'));
const nextBtn = document.querySelector('.carousel_button--right');
const prevBtn = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(document.querySelectorAll('.carousel_indicator'));


const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, ind) => {
    slide.style.left = slideWidth * ind + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track, activeSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    activeSlide.classList.remove('active-slide');
    targetSlide.classList.add('active-slide');
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

prevBtn.addEventListener('click', () => {
    //move the slide to the left
    let activeSlide = track.querySelector('.active-slide')
    let activeIndex = slides.findIndex(el => el === activeSlide);
    if (activeIndex == 0){
        activeIndex = slides.length-1;
        activeSlide = track.querySelectorAll('.carousel_slide')[0];
        let prevSlide = track.querySelectorAll('.carousel_slide')[slides.length-1]
        let currentDot = dotsNav.querySelectorAll('.carousel_indicator')[slides.length-1];
        let prevDot = dotsNav.querySelectorAll('.carousel_indicator')[0];
        moveToSlide(track, activeSlide, prevSlide);
        updateDots(prevDot, currentDot);
        return;
    }
    let prevSlide = activeSlide.previousElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let prevDot = currentDot.previousElementSibling;
    //move to the prev slide
    moveToSlide(track, activeSlide, prevSlide);
    updateDots(currentDot, prevDot);

})

nextBtn.addEventListener('click', () => {
    //move the slide to the right
    let activeSlide = track.querySelector('.active-slide');
    let activeIndex = slides.findIndex(el => el === activeSlide);
    if (activeIndex==slides.length-1){
        activeIndex=0;
        activeSlide=track.querySelectorAll('.carousel_slide')[0];
        let nextSlide = activeSlide.nextElementSibling;
        let currentDot = dotsNav.querySelectorAll('.carousel_indicator')[0];
        let nextDot = dotsNav.querySelectorAll('.carousel_indicator')[slides.length-1]
        moveToSlide(track, nextSlide, activeSlide);
        updateDots(nextDot, currentDot);
        return;
    }
        let nextSlide = activeSlide.nextElementSibling;
        let currentDot = dotsNav.querySelector('.current-slide');
        let nextDot = currentDot.nextElementSibling;
    //move to the next slide
    moveToSlide(track, activeSlide, nextSlide);
    updateDots(currentDot, nextDot);
})

dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = (e.target).closest('img');
    if (!targetDot) return;

    const activeSlide = track.querySelector('.active-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(el => el === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, activeSlide, targetSlide);
    updateDots(currentDot,targetDot);

})

//=================== END OF SLIDER ========================//


$('#load2').on( 'click', function() {

    // create new item elements
    let elems = $(['<div class="gallery-photo-item"><img> src="img/gallery/img26.jpg" alt="photo"></div>'], ['<div class="gallery-photo-item"><img> src="img/gallery/img27.jpg" alt="photo"></div>'], ['<div class="gallery-photo-item"><img> src="img/gallery/img28.jpg" alt="photo"></div>'], ['<div class="gallery-photo-item"><img> src="img/gallery/img29.jpg" alt="photo"></div>'], ['<div class="gallery-photo-item"><img> src="img/gallery/img30.jpg" alt="photo"></div>']);
    let $elems = $(elems);
    $grid.masonry('appended', $elems);

});
