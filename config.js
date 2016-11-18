var src = './src';
var dest = './build';
module.exports = {
    paths: {
        src: src,
        static: src+'/public',
        dest: dest,
        destStatic: dest + '/public',
        rev: dest + '/staticRev',
        views: src + '/views/**/*.jade'
    }
};