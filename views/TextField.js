// Libraries
var $ = require('jquery');
var _ = require('underscore');
var jsyaml = require('js-yaml');
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  initialize: function() {
    this.el.setAttribute('contentEditable', true);
    this.el.setAttribute('spellcheck', true);
    this.field = this.el.getAttribute('data-field');
    this.$el.text(this.model.get(this.field));
  },

  events: {
    'blur': 'update',
    'keyup': 'update',
    'paste': 'update'
  },

  update: function(e) {
    this.model.set(this.field, this.$el.text());
  }

});
