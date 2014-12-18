var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var EventBus = require('./event-bus');

var AppStates = require('./constants/app-states');
var StateModel = require('./model/state-model');

var AppView = require('./view/app-view');


module.exports = Marionette.Application.extend({
  initialize: function(options) {

    // App View

    var appView = new AppView();
    
    // State Model

    var stateModel = new StateModel('app', AppStates);

    // Router

    var router = new Backbone.Router({
        routes: {
            '': 'index',
            'main': AppStates.MAIN.id
        }
    });

    router.on('route:index', function(){

        stateModel.changeState(AppStates.LOAD);

    });

    router.on('route:main', function(){

        if(this.loaded){
            stateModel.changeState(AppStates.MAIN);    
        } else {
            stateModel.changeState(AppStates.LOAD);    
        }
        
    });

    // Event Bus

    EventBus.on('state:enter', function(state){
        var route = '';
        switch(state){
            case AppStates.LOAD.id:
                stateModel.changeState(AppStates.LOADING);
                break;
            case AppStates.LOADING.id:
                this.loaded = true;
                setTimeout(function() {
                    stateModel.changeState(AppStates.MAIN);
                }, 1000);
                break;
            case AppStates.MAIN.id:
                route = state;
                break;
        }
        
        router.navigate(route);

    });

    // History

    Backbone.history.start({pushState: true});    

  }
});