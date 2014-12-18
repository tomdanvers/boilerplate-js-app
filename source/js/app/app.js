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
    stateCollection.add([AppStates.LOAD, AppStates.LOADING, AppStates.MAIN]);

    // Router

    var router = new Backbone.Router({
        routes: {
            '': 'index',
            'main': AppStates.MAIN.route
        }
    });

    router.on('route:index', function(){

        stateCollection.changeState(AppStates.LOAD);

    });

    router.on('route:main', function(){

        if(this.loaded){
            stateCollection.changeState(AppStates.MAIN);    
        } else {
            stateCollection.changeState(AppStates.LOAD);    
        }
        
    });

    // Event Bus

    EventBus.on('state:enter', function(state){
        switch(state.id){
            case AppStates.LOAD.id:
                stateCollection.changeState(AppStates.LOADING);
                break;
            case AppStates.LOADING.id:
                this.loaded = true;
                setTimeout(function() {
                    stateCollection.changeState(AppStates.MAIN);
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