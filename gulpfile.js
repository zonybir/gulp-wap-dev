var gulp = require('gulp'),
		csso = require('gulp-csso'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		concat = require('gulp-concat'),
		clean = require('gulp-clean'),
		rename = require('gulp-rename'),
		rev = require('gulp-rev'),
		revCollector = require('gulp-rev-collector'),
		//  gulp compile handlebars
		handlebars = require('gulp-compile-handlebars');

gulp.task('clean',function(){
		return gulp.src('dist/app',{read:false})
						.pipe(clean());
})

gulp.task('css',function(){
		return gulp.src('build/public/css/*.css')
						.pipe(csso())
						.pipe(rename(function(path){
								path.basename += '.min';
								path.extname = '.css'
						}))
						.pipe(rev())
						.pipe(gulp.dest('dist/app'))
						.pipe(rev.manifest())
						.pipe(gulp.dest('dist/'));
})

gulp.task('rev',function(){
		return gulp.src(['dist/*.json','build/public/view/*.html'])
						.pipe(revCollector({
								replaceReved:true
						}))
						.pipe(gulp.dest('dist/view/'))
})

/*
  gulp compile handlebars task  
  by:zony
  time:2016-1-13 15:28
*/
gulp.task('handlebars',function(){
		var templateData = {
        //firstName: 'Kaanon'
    };
		var option={
						ignorePartials:true,//ignores th unkonwn {{>}} in the handlebars template,default to false
						/*partials:{
							footer:'the end'
						},*/
						batch:['./dist/h']
						/*helpers:{
								capitals:function(str){
									return str.toUpperCase();
								}
						}*/
				};
		gulp.src('./dist/h/index.handlebars')
						.pipe(handlebars(templateData,option))
						.pipe(rename('index.html'))
						.pipe(gulp.dest('dist'));
})

gulp.task('hbs', function () {
    var templateData = {
        firstName: 'Kaanon'
    },
    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        partials : {
            footer : '<footer>the end</footer>'
        },
        batch : ['./dist/hbs'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

    return gulp.src('./dist/hbs/hello.handlebars')
        .pipe(handlebars(templateData, options))
        .pipe(rename('hello.html'))
        .pipe(gulp.dest('dist'));
});