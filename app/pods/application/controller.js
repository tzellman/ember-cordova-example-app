import Ember from "ember";

const {Controller, inject, computed} = Ember;

export default Controller.extend({

    platformService: inject.service('device/platform'),

    platform: computed(function () {
        return this.get('platformService').get('platform');
    })
});
