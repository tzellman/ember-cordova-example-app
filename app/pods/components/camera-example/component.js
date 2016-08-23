import Ember from "ember";

export default Ember.Component.extend({

    tagName: 'div',
    classNames: ["camera-example", "layout-column", "layout-align-center-stretch"],
    classNameBindings: ["sepia:sepia"],

    actions: {
        takePicture(){
            navigator.camera.getPicture(imageData => {
                this.set('image', imageData);
            }, message => {
                navigator.notification.alert(
                    message, null, "Camera Failure");
            }, {
                quality: 50,
                sourceType: Camera.PictureSourceType.CAMERA,
                destinationType: Camera.DestinationType.DATA_URL
            });
        },
        selectPicture(){
            navigator.camera.getPicture(imageData => {
                this.set('image', imageData);
            }, message => {
                navigator.notification.alert(
                    message, null, "Selection Failure");
            }, {
                quality: 50,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.DATA_URL
            });
        },
        toggleSepia(){
            this.toggleProperty("sepia");
        }
    }
});
