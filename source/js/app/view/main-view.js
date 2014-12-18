var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var EventBus = require('../event-bus');

var template = require('../../../templates/main');

module.exports = Marionette.LayoutView.extend({
	regions: {
	},
	className: 'main',
	template: template
});