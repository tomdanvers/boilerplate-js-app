var Backbone = require('backbone');
var EventBus = require('../event-bus');

module.exports = Backbone.Model.extend({
	defaults: {
		state: null
	},
	initialize: function(id, states) {
		this.set('id', id);
		this.set('states', states);

		console.log('StateModel.initialize(',id,')');
	},
	changeState: function(state, options) {
		
		var stateId;
		if (typeof(state) === 'string') {
			stateId = state;
		} else {
			stateId = state.id;
		}

		if (stateId === this.get('state')) {
			return;
		}

		console.log('StateModel.changeState', this.get('state'), '>', stateId);
		
		if(stateId !== this.get('state')){
			EventBus.trigger('state:exit', this.get('state'));
		}

		this.set('state', stateId);

		EventBus.trigger('state:enter', this.get('state'), options);
	}
});