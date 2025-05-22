'use strict';

const { join } = require('path');
const { createReadStream } = require('fs');
const gallery = require('./lib/gallery');

// Register the tag
gallery.register(hexo);

// Inject the client-side assets
hexo.extend.filter.register('after_generate', () => {
  // Inject CSS
  hexo.extend.injector.register(
    'head_end',
    () => `<link rel="stylesheet" href="${hexo.config.root}gallery/style.css">`,
  );

  // Inject JS
  hexo.extend.injector.register(
    'body_end',
    () => `<script src="${hexo.config.root}gallery/script.js"></script>`,
  );

  // Copy assets to public folder
  hexo.route.set('gallery/style.css', () =>
    createReadStream(join(__dirname, 'source/css/gallery-slider.css')),
  );

  hexo.route.set('gallery/script.js', () =>
    createReadStream(join(__dirname, 'source/js/gallery-slider.js')),
  );
});
