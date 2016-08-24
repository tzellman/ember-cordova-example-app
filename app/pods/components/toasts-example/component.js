import Ember from "ember";

const {Component, computed} = Ember;

export default Component.extend({

    tagName: 'div',
    classNames: ["toasts-example", "layout-column", "layout-align-center-stretch"],

    actions: {
        showToast(duration, position, message, customStyling){
            const options = {
                duration: duration,
                position: position,
                message: message
            };

            if (customStyling === true) {
                options.styling = {
                    opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
                    backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
                    textColor: '#FFFF00', // Ditto. Default #FFFFFF
                    textSize: 20.5, // Default is approx. 13.
                    cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
                    horizontalPadding: 20, // iOS default 16, Android default 50
                    verticalPadding: 16 // iOS default 12, Android default 30
                };
            }

            window.plugins.toast.showWithOptions(options);
        }
    }
});
