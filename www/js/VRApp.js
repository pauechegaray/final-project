(function (global) {
  'use strict';

  function onSetup() {
    /**
     * YOUR SETUP CODE GOES HERE!
     * 
     * This function will be executed once the 3D world has been created.
     * 
     * The most important variables are available in:
     * VRWorld.scene    - Is the scene of the world.
     * VRWorld.camera   - Is the camera for the preview.
     * VRWorld.vrCamera - The camera for VR view.
     */
  }

  function onUpdate() {
    /**
     * YOUR SETUP CODE GOES HERE!
     * 
     * This function will be executed every time the world was rendered.
     */
  }

  var VRApp = {
    onSetup  : onSetup,
    onUpdate : onUpdate
  };

  global.VRApp = VRApp;
})(this);