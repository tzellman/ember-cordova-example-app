import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dialogs');
  this.route('statusbar');
  this.route('camera');
});

export default Router;
