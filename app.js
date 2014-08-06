var $ = require('jquery');
var _ = require('underscore');
var jsyaml = require('js-yaml');
var Backbone = require('backbone');
Backbone.$ = $;

// Models
var Post = require('./models/Post');
var posts = [];

// Format date to match Jekyll's default style
Date.prototype.toFormattedString = function() {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[this.getMonth()] + ' ' + 
    this.getDate() + ', ' + 
    this.getFullYear();
};

// Initialize application
var els = document.querySelectorAll('[data-path]');
for (var i = 0; i < els.length; i++) {
  posts.push(new Post({
    _container: els[i],
    id: els[i].getAttribute('data-path') + config.access_token
  }));
}

// Add save button (should move to view)
var a = document.createElement('a');
a.onclick = function() {
  posts[0].save();
};
a.innerHTML = 'save';
a.href = '#';
a.style.position = 'fixed'; 
a.style.top = '20px'; 
a.style.left = '20px';
document.body.appendChild(a);
