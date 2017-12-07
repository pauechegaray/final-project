(function (global) {
  'use strict';

  var mesh;
  var helper;

  function onSetup() {
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial({
      color : 0xff0000
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = 0;
    mesh.position.y = 7;
    VRWorld.scene.add(mesh);

    var light = new THREE.HemisphereLight(0x777777, 0x000000, 2.0);
    VRWorld.scene.add(light);
  
    helper = new THREE.CameraHelper(VRWorld.vrCamera);
    VRWorld.scene.add(helper);
  
    setupCheckboard();
  }

  function setupCheckboard() {
    var loader = new THREE.TextureLoader();
    loader.load(
      'textures/patterns/checker.png',
      function (texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat = new THREE.Vector2(50, 50);
        texture.anisotropy = VRWorld.renderer.getMaxAnisotropy();
  
        var material = new THREE.MeshPhongMaterial({
          color     : 0xffffff,
          specular  : 0xffffff,
          shininess : 60,
          shading   : THREE.FlatShading,
          map       : texture
        });
  
        var geometry = new THREE.PlaneGeometry(1000, 1000);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        VRWorld.scene.add(mesh);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function () {
        console.log('Error loading checkboard');
      }
    );
  }  

  function onUpdate() {
    mesh.position.x += 0.1;
    helper.update();
  }

  var VRApp = {
    onSetup  : onSetup,
    onUpdate : onUpdate
  };

  global.VRApp = VRApp;
})(this);