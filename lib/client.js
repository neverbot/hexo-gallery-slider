// // current position
// let pos = 0;
// // number of slides
// const totalSlides = $('#slider-wrap ul li').length;
// // get the slide width
// const sliderWidth = $('#slider-wrap').width();

function galleries() {
  $('.slider-wrap').each(function (index, value) {
    const $this = $(value);
    const width = $this.width();

    // current position
    $this.data('pos', 0);
    // number of slides
    $this.data('totalSlides', $this.find('ul li').length);
    // get the slide width
    $this.data('sliderWidth', width);

    // set width of all img children of $this
    $this.find('img').css({
      width: width + 'px',
    });

    // get the height of the first image, and use it
    // as the slider height
    const height = $this.find('img:first').height();
    $this.height(height);

    $this.find('.slider li').height(height);
    $this.find('.slider li').width(width);

    /*****************
     BUILD THE SLIDER
    *****************/
    // set width to be 'x' times the number of slides
    $this.find('ul.slider').width($this.data('sliderWidth') * $this.data('totalSlides'));

    // next slide
    $this.find('.next').click(function () {
      slideRight($this);
    });

    // previous slide
    $this.find('.previous').click(function () {
      slideLeft($this);
    });

    /*************************
     //*> OPTIONAL SETTINGS
    ************************/
    // automatic slider
    // let autoSlider = setInterval(slideRight, 3000, $this);

    // for each slide
    $.each($this.find('ul li'), () => {
      // create a pagination
      $this.find('.pagination-wrap ul').append(document.createElement('li'));
    });

    // counter
    countSlides($this);

    // pagination
    pagination($this);

    // hide/show controls/btns when hover
    // pause automatic slide when hover
    $this.hover(
      () => {
        $(this).addClass('active');
        // clearInterval(autoSlider);
      },
      () => {
        $(this).removeClass('active');
        // autoSlider = setInterval(slideRight, 3000, $this);
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
