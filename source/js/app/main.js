var $ = require('jquery');

var Backbone = require('backbone');
Backbone.$ = $;

var App = require('./app');
var app = new App({container: '[data-region=container]'});