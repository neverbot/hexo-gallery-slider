function renderVideo(path, filename) {
  return `
    <video controls>
      <source src="/${path}${filename}" type="video/mp4">
    </video>
  `;
}

function renderImage(path, filename) {
  return `<img src="/${path}${filename}">`;
}

function renderMediaItem(path, filename) {
  return filename.includes('.mp4') ? renderVideo(path, filename) : renderImage(path, filename);
}

function renderGalleryItems(files, path) {
  return files
    .map(function (file) {
      return `
      <li>
        <div>${renderMediaItem(path, file)}</div>
      </li>
    `;
    })
    .join('');
}

function renderGallery(files, path) {
  return `
    <div class="post-gallery">
      <div class="slider-wrap">
        <ul class="slider">
          ${renderGalleryItems(files, path)}
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

hexo.extend.tag.register(
  'gallery',
  function (args) {
    if (args.length === 0) return '';

    // Single file handler
    if (args.length === 1) {
      return renderMediaItem(this.path, args[0]);
    }

    // Multiple files gallery
    return renderGallery(args, this.path);
  },
  {
    ends: false,
    async: false,
  },
);
