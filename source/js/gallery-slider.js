const galleries = () => {
  // Handle single images
  $('.hexo-gallery-slider > img').each((index, img) => {
    const $img = $(img);
    const $gallery = $img.parent();

    if ($img[0].complete) {
      $gallery.addClass('initialized');
    } else {
      $img.on('load', function () {
        $gallery.addClass('initialized');
      });
    }
  });

  // Handle slider galleries
  $('.slider-wrap').each((index, value) => {
    const $this = $(value);
    const width = $this.width();
    const $gallery = $this.closest('.hexo-gallery-slider');

    // current position
    $this.data('pos', 0);
    // number of slides
    const totalSlides = $this.find('ul li').length;
    $this.data('totalSlides', totalSlides);
    // get the slide width
    $this.data('sliderWidth', width);

    // Track loading of all images
    let loadedImages = 0;

    // Function to set dimensions once image is available
    const setDimensions = () => {
      // Calculate height based on the natural aspect ratio of the first image
      const naturalWidth = $firstImage[0].naturalWidth;
      const naturalHeight = $firstImage[0].naturalHeight;
      const aspectRatio = naturalHeight / naturalWidth;
      const height = width * aspectRatio;

      if (height > 0 && !isNaN(height)) {
        // Set dimensions maintaining aspect ratio
        $this.find('img').css({
          width: width + 'px',
          height: height + 'px',
        });

        $this.height(height);
        $this.find('.slider li').height(height);
        $this.find('.slider li').width(width);
      }
    };

    const completeInitialization = () => {
      // Set dimensions and slider width all at once
      setDimensions();
      $this.find('ul.slider').width($this.data('sliderWidth') * $this.data('totalSlides'));

      // next slide
      $this
        .find('.next')
        .off('click')
        .on('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          // const scrollPos = window.scrollY;
          slideRight($this);
          // window.scrollTo(0, scrollPos);
        });

      // previous slide
      $this
        .find('.previous')
        .off('click')
        .on('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          // const scrollPos = window.scrollY;
          slideLeft($this);
          // window.scrollTo(0, scrollPos);
        });

      // for each slide
      $.each($this.find('ul li'), () => {
        // create a pagination
        $this.find('.pagination-wrap ul').append(document.createElement('li'));
      });

      // Set up counter and pagination
      countSlides($this);
      pagination($this);

      // Make gallery visible once everything is ready
      $gallery.addClass('initialized');
    };

    // Get first image and handle all images loading
    const $firstImage = $this.find('img:first');
    const $allImages = $this.find('img');

    let allLoaded = true;
    $allImages.each(function () {
      if (!this.complete) {
        allLoaded = false;
        $(this).on('load', () => {
          loadedImages++;
          if (loadedImages === totalSlides) {
            completeInitialization();
          }
        });
      } else {
        loadedImages++;
      }
    });

    if (allLoaded) {
      completeInitialization();
    }

    // hide/show controls/btns when hover
    $this
      .on('mouseenter', function () {
        $(this).addClass('active');
      })
      .on('mouseleave', function () {
        $(this).removeClass('active');
      });
  });
};

/************************
 //*> SLIDER FUNCTIONS
************************/
const slideLeft = (elem) => {
  elem.data('pos', elem.data('pos') - 1);
  if (elem.data('pos') < 0) {
    elem.data('pos', elem.data('totalSlides') - 1);
  }

  elem.find('ul.slider').css('left', -(elem.data('sliderWidth') * elem.data('pos')));

  countSlides(elem);
  pagination(elem);
};

const slideRight = (elem) => {
  elem.data('pos', elem.data('pos') + 1);
  if (elem.data('pos') >= elem.data('totalSlides')) {
    elem.data('pos', 0);
  }

  elem.find('ul.slider').css('left', -(elem.data('sliderWidth') * elem.data('pos')));

  countSlides(elem);
  pagination(elem);
};

/************************
 //*> UI UPDATE FUNCTIONS
************************/
const countSlides = (elem) => {
  // Convert jQuery element to vanilla DOM element if needed
  const domElem = elem[0] || elem;
  const counter = domElem.querySelector('.counter');
  const pos = parseInt(elem.data('pos'));
  const total = parseInt(elem.data('totalSlides'));
  if (counter) {
    counter.textContent = `${pos + 1} / ${total}`;
  }
};

const pagination = (elem) => {
  // Convert jQuery element to vanilla DOM element if needed
  const domElem = elem[0] || elem;
  const dots = domElem.querySelectorAll('.pagination-wrap ul li');
  const pos = parseInt(elem.data('pos'));

  dots.forEach((dot, index) => {
    if (index === pos) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
};

// Function to initialize galleries
const initGalleries = () => {
  // Wait for window load to ensure images are loaded
  window.addEventListener('load', () => {
    galleries();
  });
};

// Start the initialization process
initGalleries();
