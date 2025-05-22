function galleries() {
  // Handle single images
  $('.hexo-gallery-slider > img').each(function (index, img) {
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
  $('.slider-wrap').each(function (index, value) {
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
    const setDimensions = function () {
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

    const completeInitialization = function () {
      // Set dimensions and slider width all at once
      setDimensions();
      $this.find('ul.slider').width($this.data('sliderWidth') * $this.data('totalSlides'));

      // next slide
      $this.find('.next').click(function () {
        slideRight($this);
      });

      // previous slide
      $this.find('.previous').click(function () {
        slideLeft($this);
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
        $(this).on('load', function () {
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
    $this.hover(
      () => {
        $(this).addClass('active');
      },
      () => {
        $(this).removeClass('active');
      },
    );
  });

  /***********
   SLIDE LEFT
  ************/
  function slideLeft(elem) {
    elem.data('pos', elem.data('pos') - 1);
    if (elem.data('pos') < 0) {
      elem.data('pos', elem.data('totalSlides') - 1);
    }

    elem.find('ul.slider').css('left', -(elem.data('sliderWidth') * elem.data('pos')));

    //* > optional
    countSlides(elem);
    pagination(elem);
  }

  /************
   SLIDE RIGHT
  *************/
  function slideRight(elem) {
    elem.data('pos', elem.data('pos') + 1);
    if (elem.data('pos') >= elem.data('totalSlides')) {
      elem.data('pos', 0);
    }

    elem.find('ul.slider').css('left', -(elem.data('sliderWidth') * elem.data('pos')));

    //* > optional
    countSlides(elem);
    pagination(elem);
  }
}

/************************
 //*> OPTIONAL SETTINGS
************************/
function countSlides(elem) {
  elem.children('.counter').html(elem.data('pos') + 1 + ' / ' + elem.data('totalSlides'));
}

function pagination(elem) {
  elem.find('.pagination-wrap ul li').removeClass('active');
  elem.find('.pagination-wrap ul li:eq(' + elem.data('pos') + ')').addClass('active');
}

// hack to wait until the DOM is really loaded

// Helper function
// const domReady = (cb) => {
//   document.readyState === 'interactive' || document.readyState === 'complete'
//     ? cb()
//     : document.addEventListener('DOMContentLoaded', cb);
// };

$(window).on('load', function () {
  // domReady(galleries);
  galleries();
});
