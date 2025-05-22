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

function renderGallery(files, path) {
  const items = files
    .map(function (file) {
      return `
      <li>
        <div>${renderMediaItem(path, file)}</div>
      </li>`;
    })
    .join('');

  return `
    <div class="hexo-gallery-slider">
      <div class="slider-wrap">
        <ul class="slider">
          ${items}
        </ul>
        <div class="btns next"><i class="fa fa-arrow-right"></i></div>
        <div class="btns previous"><i class="fa fa-arrow-left"></i></div>
        <div class="counter"></div>
        <div class="pagination-wrap">
          <ul></ul>
        </div>
      </div>
    </div>
  `;
}

function galleryTag(args) {
  if (args.length === 0) return '';

  // Single file handler
  if (args.length === 1) {
    return renderSingleMedia(this.path, args[0]);
  }

  // Multiple files gallery
  return renderGallery(args, this.path);
}

module.exports = {
  register: function (hexo) {
    hexo.extend.tag.register('gallery', galleryTag, {
      ends: false,
      async: false,
    });
  },
};
