function galleries() {
  document.querySelectorAll('.slider-wrap').forEach((sliderWrap) => {
    const width = sliderWrap.offsetWidth;

    // Store data in element's dataset
    sliderWrap.dataset.pos = 0;
    sliderWrap.dataset.totalSlides = sliderWrap.querySelectorAll('ul li').length;
    sliderWrap.dataset.sliderWidth = width;

    // Set width of all images
    sliderWrap.querySelectorAll('img').forEach((img) => {
      img.style.width = `${width}px`;
    });

    // Set height based on first image
    const firstImage = sliderWrap.querySelector('img');
    const height = firstImage.offsetHeight || firstImage.naturalHeight;
    sliderWrap.style.height = `${height}px`;

    // Set dimensions for slider items
    sliderWrap.querySelectorAll('.slider li').forEach((li) => {
      li.style.height = `${height}px`;
      li.style.width = `${width}px`;
    });

    // Set total slider width
    const slider = sliderWrap.querySelector('ul.slider');
    slider.style.width = `${width * Number(sliderWrap.dataset.totalSlides)}px`;

    // Event listeners
    sliderWrap.querySelector('.next').addEventListener('click', () => slideRight(sliderWrap));
    sliderWrap.querySelector('.previous').addEventListener('click', () => slideLeft(sliderWrap));

    // Create pagination
    const paginationList = sliderWrap.querySelector('.pagination-wrap ul');
    for (let i = 0; i < sliderWrap.dataset.totalSlides; i++) {
      const li = document.createElement('li');
      paginationList.appendChild(li);
    }

    // Initial setup
    countSlides(sliderWrap);
    pagination(sliderWrap);

    // Hover effects
    sliderWrap.addEventListener('mouseenter', () => {
      sliderWrap.classList.add('active');
    });

    sliderWrap.addEventListener('mouseleave', () => {
      sliderWrap.classList.remove('active');
    });
  });

  /***********
   SLIDE LEFT
  ************/
  function slideLeft(elem) {
    let pos = Number(elem.dataset.pos) - 1;
    if (pos < 0) {
      pos = Number(elem.dataset.totalSlides) - 1;
    }
    elem.dataset.pos = pos;

    const slider = elem.querySelector('ul.slider');
    slider.style.left = `${-(elem.dataset.sliderWidth * pos)}px`;

    countSlides(elem);
    pagination(elem);
  }

  /************
   SLIDE RIGHT
  *************/
  function slideRight(elem) {
    let pos = Number(elem.dataset.pos) + 1;
    if (pos >= elem.dataset.totalSlides) {
      pos = 0;
    }
    elem.dataset.pos = pos;

    const slider = elem.querySelector('ul.slider');
    slider.style.left = `${-(elem.dataset.sliderWidth * pos)}px`;

    countSlides(elem);
    pagination(elem);
  }
}

/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(elem) {
  const counter = elem.querySelector('.counter');
  counter.textContent = `${Number(elem.dataset.pos) + 1} / ${elem.dataset.totalSlides}`;
}

function pagination(elem) {
  const paginationItems = elem.querySelectorAll('.pagination-wrap ul li');
  paginationItems.forEach((item) => item.classList.remove('active'));
  paginationItems[elem.dataset.pos].classList.add('active');
}

// hack to wait until the DOM is really loaded

// Helper function
// const domReady = (cb) => {
//   document.readyState === 'interactive' || document.readyState === 'complete'
//     ? cb()
//     : document.addEventListener('DOMContentLoaded', cb);
// };

// Wait for DOM content to be fully loaded
window.addEventListener('load', galleries);
