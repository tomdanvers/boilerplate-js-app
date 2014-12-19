var $ = require('jquery');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var EventBus = require('../event-bus');

var AppStates = require('../constants/app-states');
var StateModel = require('../model/state-model');

var LoadingView = require('./loading-view');
var MainView = require('./main-view');

module.exports = Marionette.LayoutView.extend({
	el: '[data-region=container]',
	regions: {
		regionApp: '[data-region=app]'
	},
	initialize: function() {
		EventBus.on('state:enter', this.enterState, this);
		EventBus.on('state:exit', this.exitState, this);
	},

	exitState: function(state){
	},

	enterState: function(state, options){
			
		var ViewConstructor = null;
		
		switch(state.id){
			case AppStates.LOADING.id:
				ViewConstructor = LoadingView;
				break;
			case AppStates.MAIN.id:
			case AppStates.SEQUENTIAL_1.id:
			case AppStates.SEQUENTIAL_2.id:
				ViewConstructor = MainView;
				break;
		}

		if (typeof(options) === 'undefined') {
			options = {}
		}
		
		options.model = new Backbone.Model({foo:'bar',state:state});
		
		if (ViewConstructor){
			
			this.regionApp.show(new ViewConstructor(options));
		}
		
	}
});