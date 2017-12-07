# Final project - VR

Repository with the base code for the final projects making VR in ThreeJS.

### Folder structure

* `www/` - All of the files of the web project. This folder should serve through a server like MAMP.
* `www/css` - App styles.
* `www/js` - Javascript files. This is the most important folder (your code goes here :D).
* `www/js/lib` - Libraries: jQuery and ThreeJS dependencies. You can add all the libs that you need.
* `www/index.html` - The VR app page.
* `www/preview.html` - A preview page, useful in the development.

### VRWorld.js

This script contains the logic of setup and configuration of ThreeJS World. Init a 3D scene, a WebGL renderer and two
cameras: one for the preview and the camera for the point of view.

When is includead a global variable called `VRWorld` is defined. This variable is a JavaScript object with the following properties and methods:

* `VRWorld.setup(options)` - Method to reate and config the world with the options. Don't worry for this method, you will not use it.
* `VRWorld.init()` - Method to init the animate loop. Don't worry too.
* `VRWorld.scene` - The scene of the world.
* `VRWorld.vrCamera` - The camera from which the user view when the VR is rendering.
* `VRWorld.camera` - The camera for the preview.

### VRApp.js

This script is the most important because here goes your code. The structure of the code is:

```javascript

function onSetup() {
  // Your setup code goes here!
}

function onUpdate() {
  // Your loop code goes here!
}

```

Notice that only exist two functions: `onSetup` and `onUpdate`. The first is executed once the world has been created, and the second is created every animate loop time. You can think you're coding in Processing!

### Preview and VR

Exist two HTML files.

The `index.html` file is the home, and is that the user open in the Cardboard, so automatically is put in VR mode.

The `preview.html` file is useful to develop your app, begin in Preview mode with a controls that allows you view all the scene. And pressing Intro key you can toggle to the VR mode.

### Server

Remember that is necessary serve your project from a server.
MAMP is a simple and good choice.

Happy Hacking! :D
