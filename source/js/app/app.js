var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var EventBus = require('./event-bus');

var AppStates = require('./constants/app-states');
var StateCollection = require('./collection/state-collection');

var AppView = require('./view/app-view');


module.exports = Marionette.Application.extend({
  initialize: function(options) {

    // App View

    var appView = new AppView();
    
    // State Collection

    var stateCollection = new StateCollection('app');
    stateCollection.add([AppStates.LOAD, AppStates.LOADING, AppStates.MAIN, AppStates.SEQUENTIAL_1, AppStates.SEQUENTIAL_2]);

    // Router

    var router = new Backbone.Router({
        routes: {
            '': 'index',
            'main': AppStates.MAIN.route,
            'sequential-1': AppStates.SEQUENTIAL_1.route,
            'sequential-2': AppStates.SEQUENTIAL_2.route
        }
    });

    router.on('route:index', function(){

        stateCollection.changeState(AppStates.LOAD);

    });

    router.on('route:main', function(){

        if(this.loaded){
            stateCollection.changeState(AppStates.MAIN);    
        } else {
            stateCollection.changeState(AppStates.LOAD, 'main');    
        }
        
    });

    router.on('route:sequential-1', function(){

        if(this.loaded){
            stateCollection.changeState(AppStates.SEQUENTIAL_1);    
        } else {
            stateCollection.changeState(AppStates.LOAD, 'sequential-1');    
        }
        
    });

    router.on('route:sequential-2', function(){

        if(this.loaded){
            stateCollection.changeState(AppStates.SEQUENTIAL_2);    
        } else {
            stateCollection.changeState(AppStates.LOAD, 'sequential-2');    
        }
        
    });

    // Event Bus

    EventBus.on('state:request', function(state){
    });

    EventBus.on('state:request:previous', function(state){

        stateCollection.previousState();

    });

    EventBus.on('state:request:next', function(state){

        stateCollection.nextState();

    });

    EventBus.on('state:enter', function(state, options){
        switch(state.id){
            case AppStates.LOAD.id:
                stateCollection.changeState(AppStates.LOADING, options);
                break;
            case AppStates.LOADING.id:
                this.loaded = true;
                setTimeout(function() {
                    stateCollection.changeState(options || 'main');
                }, 1000);
                break;
            case AppStates.MAIN.id:
                break;
        }
        if (state.get('route')) {
            router.navigate(state.get('route'));    
        }
    });

    // History

    Backbone.history.start({pushState: true});    

  }
});