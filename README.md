## How to prepare styles

Styles should be edited only in the ```scss``` folder after editing the styles should be compiled to css and prefixed with autoprefixer for browsers compatibility.

### Using SASS
* Installing SASS ```npm install -g sass```
* Watching changes in scss files and updating ```style.css``` files ```sass --watch scss:css```

### Using autoprefixer
* Installing postcss and autoprefixer ```npm install -g postcss-cli autoprefixer```
* Executing autoprefixer on **css** file ```style.scs``` with the command ```postcss style.css --replace --use autoprefixer```. It will update the existing css file with necessary prefixes.


### Minify js
* Installing SASS ```npm install -g minify```
* Minify the js file ```minify js/script.js > js/script.min.js```



