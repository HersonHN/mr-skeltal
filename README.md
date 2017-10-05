thank mr skeltal
================

![](https://i.imgur.com/hoDrij8.gif)

Mr. Skeltal is a skeleton for ES2015 applications using `gulp` and `webpack`, it also bundles `sass` for the stylesheets and `livereload` for, you know, live reload.

It doesn't include configurations for html templates or live server, because is meant to be used with any backend platform (express, django, wordpress), so it only handles the compilation for scripts assets.

### Usage:

- `gulp` compiles everything and keeps looking for changes.
- `gulp css` compiles just the css.
- `gulp js` compiles just the javascript.
- `gulp watch` doesn't compile at the start, but keeps looking for changes.
- `gulp prod` compiles and minify the css and javascript.

### Reminder:

Place the following code in your html to enable the livereload:
```html
<script src="http://localhost:4011/livereload.js"></script>
```

You can change the livereload port on the `conf.json` file.


- - -

May good bones and calcium come to you. 🎺💀