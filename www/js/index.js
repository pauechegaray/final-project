
// Main method
$(document).ready(function () {

  VRWorld.setup({
    onSetup  : VRApp.onSetup,
    onUpdate : VRApp.onUpdate,
    renderVR : false
  });

  VRWorld.init();
});
