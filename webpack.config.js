'use strict';

let path = require('path'); // техническая переменая

module.exports = { // объект настроек
  mode: 'development', // режим в котором будет работать наш 
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true,

  devtool: "source-map",

  module: {}
};
