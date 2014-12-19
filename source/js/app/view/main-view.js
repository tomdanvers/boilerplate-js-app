var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var EventBus = require('../event-bus');

var template = require('../../../templates/main');

module.exports = Marionette.LayoutView.extend({
	regions: {
	},
	className: 'main',
	events: {
		'click [data-button]' : 'onButtonClick'
	},
	onButtonClick: function(event) {
		var id = event.target.getAttribute('data-button');
		switch(id) {
			case 'previous':
			case 'next':
				EventBus.trigger('state:request:' + id);
				break;
		}
	},
	template: template
});