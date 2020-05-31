thank mr skeltal
================

![](https://i.imgur.com/hoDrij8.gif)

Mr. Skeltal is a skeleton for ~ES6~ modern Javascript applications using `webpack`.

It doesn't include configurations for html templates or live server, because is meant to be used with any backend platform (express, django, wordpress), so it only handles the compilation for javascript and css files.

Mr. Skeltal lives in your assets folder, that's where he belongs.


### Install:

```bash
git clone git@github.com:HersonHN/mr-skeltal.git assets
cd assets
npm install
```


### Usage:

- `npm run webpack` compiles everything ~and keeps looking for changes.~


### Live Reload:

Place the following code in your html to enable the livereload:
```html
<script src="http://localhost:4011/livereload.js"></script>
```

You can change the livereload port on the `conf.json` file.


### Reminder:

Please note that only the files inside `src/js` and `src/css` will be taken as main entries to be compiled. Any other file inside their subfolders will not be compiled, but the watch task will always listen for changes in them.


- - -

May good bones and calcium come to you. 🎺💀
