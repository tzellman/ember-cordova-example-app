# ember-cordova-example-app

The goal of this project is to build an example ember-cordova application,
primarily to help other developers get past some of the gotchas of getting
started. Additionally, this will serve as a way to expose some of the
capabilities of ember-cordova, cordova and various plugins.

Clone this repository if you want to just get started. Note that you will
still need to walk through some of the steps below in order to get your
environment in order.

I will outline all of the steps I took in order to create this project,
so you can also use this README as a guide to setting things up for yourself.

## This repository

By default, if you checkout the `master` branch, this will give you the bare-bones essentials of a new ember/cordova application.

I will have various feature branches that highlight different capabilities/plugins, and will describe those here as they become available.


## Prerequisites

As with any Ember application, you will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

As of right now, I am going to target Android, so you'll also need the Android SDK installed.
One of the easiest ways to do this is to download [Android Studio](https://developer.android.com/studio/index.html).

Make sure to expose the base Android SDK path as the `ANDROID_HOME` environment variable.
```bash
export ANDROID_HOME=/data/AndroidStudio/Sdk/
```

## Building this project

First, make sure you have setup Android and started an emulater (see below for more details).

```bash
git clone https://github.com/tzellman/ember-cordova-example-app.git
cd ember-cordova-example-app
npm install
bower install
ember cdv:build
ember cdv:s --reload-url=http://YOUR_IP_ADDRESS:4200
```

In another window/pane, run:

```bash
cd ember-cordova-example-app
ember cordova emulate
```

# Creating your own ember-cordova application

## Approach

When building a hybrid application using Ember and Cordova you'll need
to understand how you should approach the setup.

The gist is:

* Create an Ember application
* Install cordova and ember-cordova
* ember-cordova proxies to cordova and does the grunt work of structuring/generating what cordova needs, among many other useful things
* Build, emulate or deploy your app!


## Project Init / Setup

First off, create an Ember project.

```bash
ember new ember-cordova-example-app
```

Install cordova globally. (If you use [nvm](https://github.com/creationix/nvm) then you won't need sudo privileges)

```bash
npm install -g cordova
```

Install the ember-cordova addon in your project.

```bash
cd ember-cordova-example-app
ember install ember-cordova
```

You could have done this in the previous step, but to demonstrate that you can change this at any time, let's go ahead and set our application id.
Note: You can also just edit the `ember-cordova/cordova/config.xml` file yourself.

```bash
rm -rf ember-cordova
ember g ember-cordova --name="Ember Cordova Example App" --cordovaid=net.forthought.cordova
```

Next, you need to change the locationType to `hash` in `config/environment.js`.

```js
    rootURL: '/',
    locationType: 'hash',
```

You'll also need to update `ember-cordova/cordova/config.xml` to include the following line:

```xml
    <allow-navigation href="*" />
```

Finally, if you are using ember 2.7 or higher (which I am), you'll need to edit your `app/index.html` file to remove references of `{{rootUrl}}`.


## Prepare Android

Let's add the android platform to our project.

Before we do that, make sure you have a version of Android installed.
You can do that by running the Android SDK manager.

```bash
$ANDROID_HOME/tools/android
```

I made sure Android 6.0 (API 23) was installed and up-to-date.

![SDK Manager](http://i.imgur.com/sDwYn8i.png)

Additionally, you'll likely want to create a Virtual Device (emulator).

Click `Tools->Manage AVDs..` from the Android SDK Manager.

Then, create a new virtual device. Here is an example:

![Test AVD](http://i.imgur.com/JzaxaIe.png)

Go ahead and start/launch it, so that we can install our app to it in a later step.

Note: I use Xubuntu and I got an error while launching that looked like: 

![Launch Error](http://i.imgur.com/dHquZV5.png)

I was able to resolve the issue by launching the emulator from the commandline like so:

```bash
LD_PRELOAD='/usr/lib/x86_64-linux-gnu/libstdc++.so.6' $ANDROID_HOME/tools/emulator -netdelay none -netspeed full -avd test2
```

You may need to find where `libstdc++.so.6` exists on your system and adjust the command accordingly.

More information on this error is available [here](https://code.google.com/p/android/issues/detail?id=197254).

For additional debugging information, you can view the logcat:

```bash
$ANDROID_HOME/platform-tools/adb logcat
```

## Add Android to the project

Now, let's add the platform to our project.

Again, make sure you have exposed the base Android SDK path as the `ANDROID_HOME` environment variable. For me this was:

```bash
export ANDROID_HOME=/data/AndroidStudio/Sdk/
```

Add the platform.

```bash
ember cdv platform add android
```

If you had errors here, it likely could be that your application ID was not formatted correctly.
Make sure it is in the format `some.package.name`, with no camelCase or dashes. See my notes on Project Setup above.

Since we are going to use android throughout, let's go ahead and tell
ember-cordova that this will be our default platform. To do that, just edit your .ember-cli file and add the following line.

```js
    "platform": "android"
```

## Build and Run the project

There are a few options. One option is to build then install the app on an emulator.

```bash
ember cdv:build
ember cordova emulate
```

The way I would suggest you build the project is in live-reload mode.
To do this, we tell ember-cordova to serve the app for us.

Before we do this, you'll need to know the IP Address of your computer; localhost will not work, as the emulator needs to connect to the host IP.

```bash
ember cdv:s --reload-url=http://192.168.0.110:4200
```

After doing so, in another window/pane (I use tmux) let's install the app to the emulator:

```bash
ember cordova emulate
```

Now, look at your emulator and you should see the lovely ember welcome page!

![Success](http://i.imgur.com/zTf7ats.png)


## Next Steps for Development

Now that you are running in live-reload mode, you can make changes to your app and it will automatically get reloaded in the emulator!

## Concept 1: Adding a splash screen and app icon

### Splashscreen

1. Install the splashscreen plugin

```bash
ember cdv:plugin add cordova-plugin-splashscreen
```

2. Add your splashscreen image to `ember-cordova/cordova/res/splash.png`

Note: the name of the image can be whatever you want, but you'll need to update the next step.

3. Update `ember-cordova/cordova/config.xml` and add the following:

```xml
<splash src="res/splash.png" />
```

### App icon

1. Create your icon as an SVG file and copy to `ember-cordova/icon.svg`

2. Generate the icons

```bash
ember cdv:make-icons --platform=android
```

## TODO

I plan on adding more steps for the overall development and deployment process, so this will be a WIP.

Thanks, and I hope this helped you get started using Ember for your next mobile effort!