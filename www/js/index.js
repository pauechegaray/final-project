
// Main method
$(document).ready(function () {
  
  var onPreview = window.location.pathname.indexOf('preview.html') !== -1;

  VRWorld.setup({
    onSetup  : VRApp.onSetup,
    onUpdate : VRApp.onUpdate,
    renderVR : !onPreview
  });

  VRWorld.init();
});
