# hexo-gallery-slider

[![npm](https://img.shields.io/npm/dt/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)
[![npm](https://img.shields.io/npm/dw/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)
[![GitHub license](https://img.shields.io/github/license/neverbot/hexo-gallery-slider)](https://github.com/neverbot/hexo-gallery-slider/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)

A responsive gallery slider plugin for Hexo that creates beautiful image and video galleries in your posts.

## Features

- Responsive image and video galleries
- Touch-friendly navigation
- Smooth transitions
- Pagination dots
- Counter display
- Previous/Next navigation buttons
- Support for both single images and multiple image galleries
- Automatic FontAwesome integration
- Mobile-optimized interface

## Installation

```bash
npm install hexo-gallery-slider --save
```

## Dependencies

This plugin requires `hexo-fontawesome` for navigation icons. It will be automatically installed as a dependency.

## Usage

### Basic Gallery

To create a gallery with multiple images:

```
{% gallery image1.jpg image2.jpg image3.jpg %}
```

### Single Image

For a single image with the gallery styling:

```
{% gallery image.jpg %}
```

### Video Support

The plugin also supports MP4 videos:

```
{% gallery video.mp4 %}
```

Or mix videos and images in a gallery:

```
{% gallery image1.jpg video.mp4 image2.jpg %}
```

## File Paths

Images and videos should be placed in your Hexo source folder, typically in:
- `source/images/`
- `source/assets/`
- Or any other folder within your post's directory

Use relative paths from your post's location.

## Styling

The plugin comes with a default responsive style that works well on both desktop and mobile devices. The gallery includes:

- Smooth sliding transitions
- Navigation arrows (appear on hover)
- Pagination dots
- Image counter
- Touch support for mobile devices

## Browser Support

Tested and working in:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
