// Libraries
var $ = require('jquery');
var _ = require('underscore');
var jsyaml = require('js-yaml');
var Backbone = require('backbone');
var marked = require('marked');
var Liquid = require('./../lib/liquid.js');
require('./../lib/liquid.patch')();

module.exports = Backbone.View.extend({

  initialize: function() {
    this.el.setAttribute('contentEditable', true);
    this.el.setAttribute('spellcheck', true);
    this.field = this.el.getAttribute('data-field');
  },

  events: {
    'blur': 'blur',
    'focus': 'focus',
    'keyup': 'update',
    'paste': 'update',
    'keydown': 'keydown'
  },

  focus: function(e) {
    this.$el.toggleClass('eno-editor-content', true);
    this.$el.html(this.model.get(this.field));
  },

  blur: function(e) {
    this.$el.toggleClass('eno-editor-content', false);
    this.update();
    this.mdConvert();
  },

  keydown: function(e) {
    // Handle line breaks
    if (e.keyCode === 13) {
      document.execCommand('insertHTML', false, '\n');
      return false;
    }
  },

  update: function(e) {
    this.model.set(this.field, this.$el.text());
  },

  mdConvert: function() {
    var meta = this.model.toJSON();
    var template = marked(Liquid.parse(this.$el.text())
      .render({ page: meta, post: meta }));
    this.$el.html(template);
  },

  mdConvertGH: function() {
    $.ajax({
      type: 'POST',
      url: 'https://api.github.com/markdown/raw' + config.access_token,
      data: this.$el.text(),
      contentType: 'text/plain',
      complete: _(function(res) {
        this.$el.html(res.responseText);
      }).bind(this)
    });
  }

});
