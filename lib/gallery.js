'use strict';

function renderMediaItem(path, filename) {
  return filename.includes('.mp4')
    ? `<video controls><source src="/${path}${filename}" type="video/mp4"></video>`
    : `<img src="/${path}${filename}">`;
}

function renderSingleMedia(path, filename) {
  return `
    <div class="hexo-gallery-slider">
      ${renderMediaItem(path, filename)}
    </div>
  `;
}

function renderGallery(hexo, files, path) {
  const items = files
    .map(function (file) {
      return `
      <li>
        ${renderMediaItem(path, file)}
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
      nextIcon = '<i class="fas fa-chevron-right"></i>';
      prevIcon = '<i class="fas fa-chevron-left"></i>';
    }
  } catch {
    // Fallback to Font Awesome CSS classes if helper not available
    nextIcon = '<i class="fas fa-chevron-right"></i>';
    prevIcon = '<i class="fas fa-chevron-left"></i>';
  }

  return `
    <div class="hexo-gallery-slider">
      <div class="slider-wrap">
        <ul class="slider">
          ${items}
        </ul>
        <div class="btns next">${nextIcon}</div>
        <div class="btns previous">${prevIcon}</div>
        <div class="counter"></div>
        <div class="pagination-wrap">
          <ul></ul>
        </div>
      </div>
    </div>
  `;
}

module.exports = {
  register: function (hexo) {
    // Create tag function with access to hexo instance
    function galleryTag(args) {
      if (args.length === 0) return '';

      // Single file handler
      if (args.length === 1) {
        return renderSingleMedia(this.path, args[0]);
      }

      // Multiple files gallery
      return renderGallery(hexo, args, this.path);
    }

    hexo.extend.tag.register('gallery', galleryTag, {
      ends: false,
      async: false,
    });
  },
};
