const path = require('path');

// Register the tag
hexo.extend.tag.register('gallery', require('./lib/gallery'));

// Inject the client-side assets
hexo.extend.filter.register('after_generate', function() {
  // Inject CSS
  hexo.extend.injector.register('head_end', function() {
    return `<link rel="stylesheet" href="${hexo.config.root}gallery/style.css">`;
  });

  // Inject JS
  hexo.extend.injector.register('body_end', function() {
    return `<script src="${hexo.config.root}gallery/client.js"></script>`;
  });

  // Copy assets to public folder
  const publicDir = hexo.public_dir;
  
  hexo.route.set('gallery/style.css', function() {
    return require('fs').createReadStream(path.join(__dirname, 'lib/style.css'));
  });
  
  hexo.route.set('gallery/client.js', function() {
    return require('fs').createReadStream(path.join(__dirname, 'lib/client.js'));
  });
});
