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
- Alt text for every photo, built from the post title.
- Keyboard and screen reader friendly controls.
- Click a photo to see it enlarged, up to the size of the viewport.

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

## Alt Text

The tag has no syntax for alt texts, so the plugin builds one for every photo from the post title. Photos in a slider also get their position, e.g. `My post title (photo 2 of 5)`.

## Enlarged View

Clicking a photo (or pressing Enter on it) opens it in a modal dialog over a dark backdrop, at its own size but never larger than the viewport. It closes with the close button, the Escape key or a click outside the photo. Videos are not enlarged.

## Labels

The texts of the controls, the screen reader announcements and the alt texts are in English by default. Translate them from your site's `_config.yml`; `{n}` and `{total}` are replaced with the photo number and the number of photos:

```yaml
gallery_slider:
  labels:
    previous: Foto anterior
    next: Foto siguiente
    goTo: Ir a la foto {n}
    position: foto {n} de {total}
    enlarge: Ampliar foto
    close: Cerrar
```

## Rounded Corners

Each photo is laid out at its own proportions inside the slider, so a theme that rounds images (`border-radius` on `img`) rounds the photo itself, also while the slider moves.

## License

MIT
