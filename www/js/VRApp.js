(function (global) {
  'use strict';
  
  var catMesh;
  var cupcakeMesh;
  var bowlMesh; 
  var donaMesh;
  var cameraHelper;

  function onSetup() {
    //var gridHelper = new THREE.GridHelper(500, 500);
    //VRWorld.scene.add(gridHelper);

    //cameraHelper = new THREE.CameraHelper(VRWorld.vrCamera);
    //VRWorld.scene.add(cameraHelper);

    createMeshes();
    loadCubeMap('cubemap/dark/dark-s_', '.jpg');
  }

  function createMeshes(){
    var loader = new THREE.OBJLoader();

    loader.load('models/bowl.obj', onLoadBowl, onProgressOBJ, onError);
    loader.load('models/cat.obj', onLoadCat, onProgressOBJ, onError);
    loader.load('models/donas.obj', onLoadDona, onProgressOBJ, onError);
  }

  function onLoadBowl(objectLoaded){
    var mesh = objectLoaded.children[0];

    var material = new THREE.MeshNormalMaterial({
    });

    bowlMesh = new THREE.Mesh(mesh.geometry, material);
    bowlMesh.scale.set(.5,.5,.5);
    VRWorld.scene.add(bowlMesh);
  }

  function onLoadCat(objectLoaded){
    var mesh = objectLoaded.children[0];

    var material = new THREE.MeshLambertMaterial({
      color : 0xf97f7f,
      emissive : 0xf97f7f,
      emissiveIntensity : 10,
      envMap : VRWorld.scene.background
    });

    catMesh = new THREE.Mesh(mesh.geometry, material);
    catMesh.scale.set(1,1,1);
    VRWorld.scene.add(catMesh);
    
  }

  function onLoadDona(objectLoaded){
    var mesh = objectLoaded.children[0];

    var material = new THREE.MeshLambertMaterial({
      color : 0xff6100,
      emissive : 0xff6100,
      emissiveIntensity : 10,
      envMap : VRWorld.scene.background
    });

    donaMesh = new THREE.Mesh(mesh.geometry, material);
    donaMesh.scale.set(.2,.2,.2);
    donaMesh.position.y = 100;
    VRWorld.scene.add(donaMesh);
  }

function onProgressOBJ (xhr){
  console.log('Descargandoooo tu codo');
  console.log((xhr.loaded / xhr.total * 100) + '%');
}

function onError(error){
  console.log('Ups! I did it again, i played with your code');
  console.log(error);
}


function lightSetup() {
  var ambient = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambient);

  // Key fill rim
  var keyLight = new THREE.DirectionalLight(0xffffff, 0.7);
  keyLight.position.set( -35, 30, 35 );

  var fillLight = new THREE.DirectionalLight(0xffffff, 0.1);
  fillLight.position.set(30, 20, 20);

  var rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set( -10, 30, -30 );

  scene.add(keyLight);
  scene.add(fillLight);
  scene.add(rimLight);
}

  function loadCubeMap (prefix, format) {
  var urls = [
    prefix + 'px' + format,
    prefix + 'nx' + format,
    prefix + 'py' + format,
    prefix + 'ny' + format,
    prefix + 'pz' + format,
    prefix + 'nz' + format
  ];

  var envCube = new THREE.CubeTextureLoader().load( urls );
  envCube.format = THREE.RGBFormat;
  VRWorld.scene.background = envCube;
}

  

  function onUpdate() {
    if (donaMesh !== undefined) {
      donaMesh.rotation.y += Math.PI / 32.0;
      donaMesh.position.y -= 0.3;
      if (donaMesh.position.y <= 0) {
        donaMesh.position.y = 100;
      }
    }
    
    //angle +=0.1;

    //cameraHelper.update();

  }

  var VRApp = {
    onSetup  : onSetup,
    onUpdate : onUpdate
  };

  global.VRApp = VRApp;
})(this);