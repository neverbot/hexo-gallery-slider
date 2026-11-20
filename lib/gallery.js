'use strict';

// Texts used in the markup and by the client script. Each site can translate
// them from its _config.yml, under gallery_slider.labels.
const DEFAULT_LABELS = {
  previous: 'Previous photo',
  next: 'Next photo',
  goTo: 'Go to photo {n}',
  position: 'photo {n} of {total}',
  enlarge: 'Enlarge photo',
  close: 'Close',
};

function escapeAttribute(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function format(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    values[key] !== undefined ? values[key] : match,
  );
}

function getLabels(hexo) {
  const config = (hexo.config && hexo.config.gallery_slider) || {};
  return Object.assign({}, DEFAULT_LABELS, config.labels || {});
}

// The tag has no syntax for alt texts, so every photo gets one built from the
// post title, plus its position when it belongs to a slider.
function altText(title, labels, position, total) {
  const base = title ? String(title).trim() : '';
  if (!position) return base;
  const where = format(labels.position, { n: position, total });
  return base ? `${base} (${where})` : where;
}

function renderMediaItem(path, filename, alt, lazy) {
  if (filename.includes('.mp4')) {
    return `<video controls><source src="/${path}${filename}" type="video/mp4"></video>`;
  }
  const loading = lazy ? ' loading="lazy"' : '';
  return `<img src="/${path}${filename}" alt="${escapeAttribute(alt)}"${loading}>`;
}

function renderSingleMedia(path, filename, title, labels) {
  return `
    <div class="hexo-gallery-slider" data-label-enlarge="${escapeAttribute(labels.enlarge)}" data-label-close="${escapeAttribute(labels.close)}">
      ${renderMediaItem(path, filename, altText(title, labels), false)}
    </div>
  `;
}

function renderGallery(hexo, files, path, title, labels) {
  const total = files.length;
  const items = files
    .map(function (file, index) {
      const alt = altText(title, labels, index + 1, total);
      return `
      <li>
        ${renderMediaItem(path, file, alt, index > 0)}
      </li>`;
    })
    .join('');

  let nextIcon, prevIcon;

  try {
    // Try to get fa_inline helper through hexo's view helpers
    const helpers = hexo.extend.helper.list();
    if (helpers.fa_inline) {
      nextIcon = helpers.fa_inline('chevron-right', { prefix: 'fas' });
      prevIcon = helpers.fa_inline('chevron-left', { prefix: 'fas' });
    } else {
      nextIcon = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
      prevIcon = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
    }
  } catch {
    // Fallback to Font Awesome CSS classes if helper not available
    nextIcon = '<i class="fas fa-chevron-right" aria-hidden="true"></i>';
    prevIcon = '<i class="fas fa-chevron-left" aria-hidden="true"></i>';
  }

  const data = [
    ['go-to', labels.goTo],
    ['position', labels.position],
    ['enlarge', labels.enlarge],
    ['close', labels.close],
  ]
    .map(([key, value]) => `data-label-${key}="${escapeAttribute(value)}"`)
    .join(' ');

  return `
    <div class="hexo-gallery-slider" ${data}>
      <div class="slider-wrap">
        <ul class="slider">
          ${items}
        </ul>
        <button type="button" class="btns next" aria-label="${escapeAttribute(labels.next)}">${nextIcon}</button>
        <button type="button" class="btns previous" aria-label="${escapeAttribute(labels.previous)}">${prevIcon}</button>
        <div class="counter" aria-hidden="true"></div>
        <div class="pagination-wrap">
          <ul></ul>
        </div>
        <p class="gallery-status" role="status"></p>
      </div>
    </div>
  `;
}

module.exports = {
  register: function (hexo) {
    // Create tag function with access to hexo instance
    function galleryTag(args) {
      if (args.length === 0) return '';

      const labels = getLabels(hexo);

      // Single file handler
      if (args.length === 1) {
        return renderSingleMedia(this.path, args[0], this.title, labels);
      }

      // Multiple files gallery
      return renderGallery(hexo, args, this.path, this.title, labels);
    }

    hexo.extend.tag.register('gallery', galleryTag, {
      ends: false,
      async: false,
    });
  },
};
