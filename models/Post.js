// Libraries
var $ = require('jquery');
var _ = require('underscore');
var jsyaml = require('js-yaml');
var Backbone = require('backbone');

// Views
var TextField = require('../views/TextField');
var ContentField = require('../views/ContentField');

module.exports = Backbone.Model.extend({

  url: function() {
    return this.urlRoot + this.id;
  },

  urlRoot: config.api_host,

  initialize: function() {

    this.fetch({
      success: this.loadViews,
      error: this.fetchError
    })
  },

  parse: function(data) {

    if (data.content && data.commit) {
      return {
        _github: {
          sha: data.content.sha,
          path: data.content.path,
          name: data.content.name
        }
      };
    } else {
      var content = new Buffer(data.content, 'base64').toString('utf8');
      var parts = content.match(/---\n((?:.|\n)*)---\n((?:.|\n)*)/m);
      var post = jsyaml.safeLoad(parts[1].trim());
  
      post.content = parts[2].trim();
      post._github = {
        sha: data.sha,
        path: data.path,
        name: data.name
      }
      if (post.date) post.date.toString = Date.prototype.toFormattedString;

      return post;
    }

  },

  save: function(attrs, options) {

    options = options || {};

    var content = this.get('content');
    var header = this.toJSON();
    delete header._github;
    delete header._container;
    delete header.id;
    delete header.content;
    if (header.date) {
      header.date = new Date(header.date);
      header.date.toString = Date.prototype.toString;
    }
    console.log(header.date);
    content = '---\n' +
      jsyaml.safeDump(header) +
      '---\n\n' + content.trim() +
      '\n';

    options.attrs = {
      path: this.get('_github').path,
      sha: this.get('_github').sha,
      message: 'Saving a commit',
      content: new Buffer(content).toString('base64')
    }
    // Proxy the call to the original save function
    Backbone.Model.prototype.save.call(this, attrs, options);

  },

  loadViews: function(model, res) {

    var els = model.get('_container').querySelectorAll('[data-field]');
    for (var i = 0; i < els.length; i++) {
      var field = els[i].getAttribute('data-field');
      if (field == 'content') {
        new ContentField({
          model: model,
          el: els[i],
          field: field
        });
      } else {
        new TextField({
          model: model,
          el: els[i],
          field: field
        });
      }
    }

  },

  fetchError: function(model, res) {
    console.warn('Failed to load post: ' + model.url(), res);
  }

});
