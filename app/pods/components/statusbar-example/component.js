import Ember from "ember";

const {Component} = Ember;

export default Component.extend({
    tagName: 'div',
    classNames: ["statusbar-example", "layout-column", "layout-align-center-stretch"],

    // TODO figure out a better way to know when the StatusBar is available (supposedly after deviceready)
    isStatusBarVisible: true,

    actions: {
        show(){
            StatusBar.show();
            this.set('isStatusBarVisible', StatusBar.isVisible);
        },
        hide(){
            StatusBar.hide();
            this.set('isStatusBarVisible', StatusBar.isVisible);
        },
        toggle(){
            if (StatusBar.isVisible) {
                StatusBar.hide();
            } else {
                StatusBar.show();
            }
            this.set('isStatusBarVisible', StatusBar.isVisible);
        },
        changeColor(){
            const colors = "black darkGray lightGray white gray red green blue cyan yellow magenta orange purple brown".split(" ");
            StatusBar.backgroundColorByName(colors[Math.floor(Math.random() * (colors.length))]);
        },
        defaultColor(){
            StatusBar.backgroundColorByName("black");
        }
    }
});
