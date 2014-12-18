var Handlebars = require('handlebars');
var Marionette = require('backbone.marionette');
var EventBus = require('../event-bus');
var template = require('../../../templates/loading');

module.exports = Marionette.LayoutView.extend({
	regions: {
	},
	className: 'loading',
	template: template
});