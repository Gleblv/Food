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

  module: {
    rules: [ // правила
      {
        test: /\.m?js$/, // находим js файлы
        exclude: /(node_modules|bower_components)/, // что мы должны исключить
        use: { // как и что используем
          loader: 'babel-loader', // loader связывет webpack  с babel
          options: { // опции
            presets: [['@babel/preset-env', { // пресеты
                debug: true, // позволяет во время компиляции увидеть какие могут быть проблемы и т.п.
                corejs: 3, // библиотека которая вулючает полифилы для всего что только можно
                useBuiltIns: "usage" // позволяет интелектуально выбрать только те полифилы которые нужны
            }]]
          }
        }
      }
    ]
  }
};
