# hexo-gallery-slider

[![npm](https://img.shields.io/npm/dt/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)
[![npm](https://img.shields.io/npm/dw/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)
[![GitHub license](https://img.shields.io/github/license/neverbot/hexo-gallery-slider)](https://github.com/neverbot/hexo-gallery-slider/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/hexo-gallery-slider)](https://www.npmjs.com/package/hexo-gallery-slider)

A responsive gallery slider plugin for Hexo that creates image and video galleries in your posts.

## Features

- Touch-friendly navigation.
- Smooth transitions.
- Pagination dots.
- Image counter display.
- Previous/Next navigation buttons.
- Support for both single images and multiple image galleries.
- Automatic FontAwesome integration.

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

Use relative paths from your post's location.

## License

MIT
