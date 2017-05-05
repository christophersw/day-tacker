var gulp = require('gulp');
var yargs = require('yargs');
var nodemon = require('gulp-nodemon');
var ts = require('gulp-typescript');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var $ = require('gulp-load-plugins')({lazy:true});
var replace = require('gulp-replace');
var merge = require('merge2');

// Command line option:
//  --fatal=[warning|error|off]
var ERROR_LEVELS = ['error', 'warning'];
var fatalLevel = yargs.argv.fatal;

 /**
 * Locations
 */
var sourceFiles = './src/**/*';
var distLoc = './dist';
var distFiles = 'dist/**/*';

 /**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

// Run the server
gulp.task('server', function(){
    nodemon({
        script: distLoc + '/server.js',
        ext: 'js',
        watch: [distFiles]
    }).on('restart', function () {
      console.log('Server restarted.');
    });
});

// Rerun the task when a file changes
gulp.task('watch', ['typescript'], function() {
  gulp.watch(sourceFiles, ['typescript']);
});


// Typescript
gulp.task('typescript', function() {
	var tsProject = ts.createProject('./tsconfig.json');
	var tsResult = gulp.src([sourceFiles])
//				    .pipe(replace('[CDN_HREF]', cdn))
					.pipe(tsProject())
                    .on('error', onWarning);
 
	return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
		tsResult.dts.pipe(gulp.dest(distLoc)),
		tsResult.js.pipe(gulp.dest(distLoc))
	]);
});


/**
 * ERROR 
 */

// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
   return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel || 'error');
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
   gutil.log(error.message);
   if (isFatal(level)) {
      process.exit(1);
   }
}


// Convenience handler for error-level errors.
function onError(error) { handleError.call(this, 'error', error);}
// Convenience handler for warning-level errors.
function onWarning(error) { handleError.call(this, 'warning', error);}
