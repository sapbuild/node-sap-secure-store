var pkg = require('../package.json');
var config = {
    clean: [ '.sonar', 'coverage', 'tmp' ],
    mocha: [ 'test/**/*.spec.js'],
    src: ['lib/**/*.js', 'bin/**/*.js', 'index.js']
};

config.eslint = config.src.concat([ 'test/**/*.js ']);

module.exports = config;
