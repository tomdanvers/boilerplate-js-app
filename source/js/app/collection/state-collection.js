var _ = require('underscore');
var Backbone = require('backbone');
var EventBus = require('../event-bus');

var StateModel = require('../model/state-model');

module.exports = Backbone.Collection.extend({
	model: StateModel,
	state: null,
	sequentialStates: null,
	comparator: 'index',
	initialize: function(states, id) {

		this.id = id;

		console.log('StateCollection.initialize(',this.id, this.models,')');

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
	previousState: function() {

		this.sequentialState(-1);

	},
	nextState: function() {
		
		this.sequentialState(1);
		
	},
	sequentialState: function(diff) {
		var sequentialStates = this.getSequentialStates();
		var count = sequentialStates.length;
		var index = this.state.get('index') || 0;
		var newIndex = index + diff;

		if (newIndex < 0) {
			newIndex = count - 1;	
		} else if (newIndex > count - 1) {
			newIndex = 0;
		}
		
		console.log('StateCollection.sequentialState(',diff > 0 ? 'next':'previous', index, newIndex,')');

		this.changeState(sequentialStates[newIndex]);
	},
	getSequentialStates: function() {

		if (!this.sequentialStates) {
			var states = [];
			var count = 0;
			this.each(function(state, index) {
				if(typeof(state.get('index')) === 'number'){
					state.set('index', count)
					console.log('index', state.id, state.get('index'));
					states.push(state);	
					count ++;
				}
			});
			this.sequentialStates = states;
		}
		return this.sequentialStates;
	}
	
});