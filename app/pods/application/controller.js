import Ember from "ember";

const {Controller, inject, computed} = Ember;

export default Controller.extend({

    platformService: inject.service('device/platform'),

    paperSidenav: inject.service(),

    platform: computed(function () {
        return this.get('platformService').get('platform');
    }),

    actions: {
        transitionTo(){
            this.get('paperSidenav').close();
            this.transitionToRoute(...Array.prototype.slice.call(arguments, 0, -1).filter(x => x));
        }
    }
});
