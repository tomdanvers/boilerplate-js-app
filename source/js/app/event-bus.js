var _ = require('underscore');
var Backbone = require('backbone');

var EventBus = _.extend({}, Backbone.Events);
module.exports = EventBus;