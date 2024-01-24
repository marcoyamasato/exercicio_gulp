const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); /* npm install gulp-sass DEPOIS + npm install sass */
const sourcemaps = require('gulp-sourcemaps') /* npm install gulp-sourcemaps */

function compileSass(){
    return gulp.src('./source/styles/main.scss') /*Se quiser tudo que for .scss, basta colocar o "*" ao invés do "main"*/ 
        .pipe(sourcemaps.init()) 
        .pipe(sass({
            outputStyle: 'compressed' /*Essa opção "compresse" reduz o tamanho do main.css. Se reparar, vai ver que os códigos ficam em uma linha*/
        }))
        .pipe(sourcemaps.write('./maps')) /* Estamos criando uma pasta .maps (reconhece automatico onde estão os arquivos css) */
        .pipe(gulp.dest('./build/styles'))
}

exports.sass = compileSass;


//Imagens

const imagemin = require('gulp-imagemin')

function comprimeImagem(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

exports.images = comprimeImagem;


//JS

const uglify = require('gulp-uglify')

const obfuscate = require('gulp-obfuscate')

function comprimeJavaScript(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify()) /*comprimindo JS*/
        .pipe(obfuscate()) 
        .pipe(gulp.dest('./build/scripts'))
} 



//Watch

exports.default = function(){
    gulp.watch('./source/styles/main.scss', {ignoreInitial: false}, gulp.series(compileSass))
    gulp.watch('./source/styles/variaveis.scss', {ignoreInitial: false}, gulp.series(compileSass))
    gulp.watch('./source/images/*', {ignoreInitial:false}, gulp.series(comprimeImagem))
    gulp.watch('./source/scripts/*.js', {ignoreInitial:false}, gulp.series(comprimeJavaScript))
}