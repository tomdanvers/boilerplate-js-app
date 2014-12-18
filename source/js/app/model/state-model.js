var Backbone = require('backbone');
var EventBus = require('../event-bus');

module.exports = Backbone.Model.extend({
	defaults: {
		id: null,
		route: null,
		index: null
	}
});