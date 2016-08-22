import Ember from "ember";

export default Ember.Component.extend({

    tagName: 'div',
    classNames: ["dialog-example", "layout-column", "layout-align-center-stretch"],

    actions: {
        doAlert(){
            navigator.notification.alert("This is purely a test...", null, "Alert Test", "OK!");
        },
        doConfirm(){
            const options = ["Yes", "No", "Maybe"];
            navigator.notification.confirm(
                "Cordova is awesome.", (idx) => navigator.notification.alert(`You clicked ${idx > 0 ? options[idx - 1] : 'nothing..'}`, null),
                "Confirm This", options);
        },
        doPrompt(){
            navigator.notification.prompt(
                "What is your favorite Pokémon?", (answer) => navigator.notification.alert(`You said: ${answer.input1}`, null),
                "Question", ["Ok"], null);
        },
        doBeep(){
            navigator.notification.beep(1);
        }
    }
});
