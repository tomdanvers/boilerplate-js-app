var _ = require('underscore');
var Backbone = require('backbone');
var EventBus = require('../event-bus');

var StateModel = require('../model/state-model');

module.exports = Backbone.Collection.extend({
	model: StateModel,
	state: null,
	initialize: function(states, id) {

		this.id = id;

		console.log('StateCollection.initialize(',this.id, this.models,')');

		this.on('add', this.onAdd, this);
	},
	changeState: function(state, options) {

		if (typeof(state) === 'string') {
			state = this.get(state);
		} else {
			state = this.get(state.id);
		}

		if (state === this.state) {
			return;
		}

		if (this.state) {
			console.log('StateCollection.changeState(', this.state.id, '>', state.id, ')');
		} else {
			console.log('StateCollection.changeState(', state.id, ')');
		}
		
		
		EventBus.trigger('state:exit', this.state);

		this.state = state;

		EventBus.trigger('state:enter', this.state, options);
	},
	onAdd: function() {
		//this.sequentialStates = this.
	}
	
});