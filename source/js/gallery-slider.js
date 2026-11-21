const format = (template, values) =>
  (template || '').replace(/\{(\w+)\}/g, (match, key) =>
    values[key] !== undefined ? values[key] : match,
  );

/************************
 //*> LIGHTBOX
************************/
// One shared modal <dialog> shows any gallery photo at its own size, capped
// to the viewport. The browser handles Escape, focus and returning focus.
let lightbox = null;

const getLightbox = (closeLabel) => {
  if (lightbox) return lightbox;

  lightbox = document.createElement('dialog');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('closedby', 'any');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'gallery-lightbox-close';
  close.setAttribute('aria-label', closeLabel || 'Close');
  // drawn as an SVG: the × character sits on the text baseline and does not
  // centre in the circle the same way in every font
  close.innerHTML =
    '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">' +
    '<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';
  close.addEventListener('click', () => lightbox.close());

  const img = document.createElement('img');
  img.alt = '';

  lightbox.append(close, img);
  document.body.appendChild(lightbox);

  // Safari has no closedby yet: close when a press starts and ends outside
  // the photo, so a drag that ends on the backdrop does not dismiss it
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e) => {
      const r = lightbox.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    let pressedOutside = false;
    lightbox.addEventListener('pointerdown', (e) => {
      pressedOutside = outside(e);
    });
    lightbox.addEventListener('pointerup', (e) => {
      if (pressedOutside && outside(e)) lightbox.close();
    });
  }

  // drop the photo once closed, so a big one does not stay in memory
  lightbox.addEventListener('close', () => {
    img.removeAttribute('src');
  });

  return lightbox;
};

const openLightbox = (source, gallery) => {
  const dialog = getLightbox(gallery.dataset.labelClose);
  const img = dialog.querySelector('img');
  img.src = source.currentSrc || source.src;
  dialog.setAttribute('aria-label', source.alt || gallery.dataset.labelEnlarge || '');
  dialog.showModal();
};

// Wrap each photo in a button, so the enlarged view also opens from the
// keyboard. Without JavaScript the photos stay plain images.
const makeZoomable = (img, gallery) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'gallery-zoom';
  const label = gallery.dataset.labelEnlarge || 'Enlarge photo';
  button.setAttribute('aria-label', img.alt ? `${label}: ${img.alt}` : label);

  // A lone photo's vertical margins (set by the theme) move to the button,
  // where they keep collapsing with the paragraphs around it as before
  if (!img.closest('ul.slider')) {
    const style = getComputedStyle(img);
    button.style.marginTop = style.marginTop;
    button.style.marginBottom = style.marginBottom;
    img.style.marginTop = '0';
    img.style.marginBottom = '0';
  }

  img.replaceWith(button);
  button.appendChild(img);
  button.addEventListener('click', () => openLightbox(img, gallery));
};

/************************
 //*> GALLERIES
************************/
const galleries = () => {
  // Handle single images
  document.querySelectorAll('.hexo-gallery-slider > img').forEach((img) => {
    const gallery = img.parentElement;

    if (img.complete) {
      gallery.classList.add('initialized');
    } else {
      img.addEventListener('load', () => {
        gallery.classList.add('initialized');
      });
    }

    makeZoomable(img, gallery);
  });

  // Handle slider galleries
  document.querySelectorAll('.slider-wrap').forEach((sliderWrap) => {
    const gallery = sliderWrap.closest('.hexo-gallery-slider');
    const slides = sliderWrap.querySelectorAll('ul.slider > li');
    const totalSlides = slides.length;

    sliderWrap.dataset.pos = '0';
    sliderWrap.dataset.totalSlides = totalSlides.toString();

    sliderWrap.querySelectorAll('ul.slider img').forEach((img) => makeZoomable(img, gallery));

    // next and previous slide
    sliderWrap.querySelector('.next')?.addEventListener('click', () => {
      select(sliderWrap, (parseInt(sliderWrap.dataset.pos) + 1) % totalSlides, true);
    });
    sliderWrap.querySelector('.previous')?.addEventListener('click', () => {
      select(sliderWrap, (parseInt(sliderWrap.dataset.pos) - 1 + totalSlides) % totalSlides, true);
    });

    // create pagination dots
    const paginationUl = sliderWrap.querySelector('.pagination-wrap ul');
    if (paginationUl) {
      for (let i = 0; i < totalSlides; i++) {
        const li = document.createElement('li');
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute(
          'aria-label',
          format(gallery.dataset.labelGoTo || 'Go to photo {n}', { n: i + 1 }),
        );
        dot.addEventListener('click', () => select(sliderWrap, i, true));
        li.appendChild(dot);
        paginationUl.appendChild(li);
      }
    }

    // Setup all possible counter values
    const counter = sliderWrap.querySelector('.counter');
    if (counter) {
      counter.innerHTML = Array.from(
        { length: totalSlides },
        (_, i) =>
          `<span class="counter-value${i === 0 ? ' active' : ' hidden'}">${i + 1} / ${totalSlides}</span>`,
      ).join('');
    }

    select(sliderWrap, 0, false);

    // The slider takes the proportions of its first photo. Read them from the
    // width and height attributes when the page has them, so it shows at once;
    // otherwise wait for the first photo only, not for every slide.
    const first = sliderWrap.querySelector('ul.slider img, ul.slider video');
    const show = (width, height) => {
      if (width > 0 && height > 0) sliderWrap.style.aspectRatio = `${width} / ${height}`;
      gallery.classList.add('initialized');
    };
    const attrWidth = first && parseInt(first.getAttribute('width'));
    const attrHeight = first && parseInt(first.getAttribute('height'));

    if (attrWidth && attrHeight) {
      show(attrWidth, attrHeight);
    } else if (first && first.tagName === 'IMG') {
      if (first.complete && first.naturalWidth) {
        show(first.naturalWidth, first.naturalHeight);
      } else {
        first.addEventListener('load', () => show(first.naturalWidth, first.naturalHeight), {
          once: true,
        });
        first.addEventListener('error', () => show(), { once: true });
      }
    } else if (first) {
      const ready = () => show(first.videoWidth, first.videoHeight);
      if (first.readyState >= 1) ready();
      else first.addEventListener('loadedmetadata', ready, { once: true });
    } else {
      show();
    }

    // hide/show controls/btns when hover
    sliderWrap.addEventListener('mouseenter', () => {
      sliderWrap.classList.add('active');
    });
    sliderWrap.addEventListener('mouseleave', () => {
      sliderWrap.classList.remove('active');
    });
  });
};

/************************
 //*> SLIDER FUNCTIONS
************************/
const select = (elem, index, announce) => {
  elem.dataset.pos = index.toString();

  const slider = elem.querySelector('ul.slider');
  slider.style.transform = `translateX(${-100 * index}%)`;

  countSlides(elem);
  pagination(elem);

  if (announce) {
    const status = elem.querySelector('.gallery-status');
    const gallery = elem.closest('.hexo-gallery-slider');
    if (status) {
      status.textContent = format(gallery.dataset.labelPosition || 'photo {n} of {total}', {
        n: index + 1,
        total: elem.dataset.totalSlides,
      });
    }
  }
};

/************************
 //*> UI UPDATE FUNCTIONS
************************/
const countSlides = (elem) => {
  const counter = elem.querySelector('.counter');
  if (counter) {
    const pos = parseInt(elem.dataset.pos);
    const counters = counter.querySelectorAll('.counter-value');
    counters.forEach((c, i) => {
      c.classList.toggle('active', i === pos);
      c.classList.toggle('hidden', i !== pos);
    });
  }
};

const pagination = (elem) => {
  const dots = elem.querySelectorAll('.pagination-wrap ul li');
  const pos = parseInt(elem.dataset.pos);

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === pos);
    const button = dot.querySelector('button');
    if (index === pos) button?.setAttribute('aria-current', 'true');
    else button?.removeAttribute('aria-current');
  });
};

// Start gallery initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', galleries);
} else {
  galleries();
}
