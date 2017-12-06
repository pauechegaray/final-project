(function (global) {

  var scene, renderer;
  var element, $container;

  var renderVR = false;
  var stereoEffect;
  var camera, vrCamera;
  var controls, vrControls;

  var clock = new THREE.Clock();

  var onUpdate;

  function setup() {
    setupScene();
    setupListeners();
  }

  function setupScene() {

    $container = $('#main-container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, 1, 0.001, 10000);
    camera.target = new THREE.Vector3(0, 0, 0);
    camera.position.set(0, 10, 20);
    scene.add(camera);

    vrCamera = new THREE.PerspectiveCamera(75, 1, 0.001, 300);
    vrCamera.target = new THREE.Vector3(0, 0, 0);
    vrCamera.position.set(0, 10, 0);
    scene.add(vrCamera);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    element = renderer.domElement;

    $container.append(element);

    stereoEffect = new THREE.StereoEffect(renderer);

    controls = new THREE.TrackballControls(camera, element);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.target.set(0, 0, 0);

    vrControls = new THREE.OrbitControls(vrCamera, element);
    vrControls.target.set(
      vrCamera.position.x + 0.1,
      vrCamera.position.y,
      vrCamera.position.z
    );
  }

  function setupListeners() {
    var setOrientationControls = function (event) {
      if (!event.alpha) {
        return;
      }

      vrControls = new THREE.DeviceOrientationControls(vrCamera, true);
      vrControls.connect();
      vrControls.update();

      $(element).on('click', fullscreen);
      window.removeEventListener('deviceorientation', setOrientationControls, true);
    };
    window.addEventListener('deviceorientation', setOrientationControls, true);

    $(window).on('keypress', onKeypress);

    $(window).on('resize', resize);
    setTimeout(resize, 1);
  }

  function resize() {
    var width  = $container.width();
    var height = $container.height();

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    vrCamera.aspect = width / height;
    vrCamera.updateProjectionMatrix();

    renderer.setSize(width, height);
    stereoEffect.setSize(width, height);
  }

  function fullscreen() {
    var container = $container[0];
    
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    }
  }

  function onKeypress(event) {
    if (event.key === 'Enter') {
      renderVR = !renderVR;
    }
  }

  function update (dt) {
    if (onUpdate !== undefined) {
      onUpdate(dt);
    }

    if (renderVR) {
      vrCamera.updateProjectionMatrix();
      vrControls.update(dt);
    } else {
      camera.updateProjectionMatrix();
      controls.update(dt);
    }
  }

  function animate () {
    update(clock.getDelta());
    
    if (renderVR) {
      renderer.render(scene, vrCamera);
    } else {
      renderer.render(scene, camera);
    }

    requestAnimationFrame(animate);
  }

  var CardboardApp = {
    setup: function (options) {
      options = options || {};

      this.onSetup  = options.onSetup;
      this.onUpdate = options.onUpdate;
      onVR = options.onVR;

      setup();

      this.scene = scene;
      this.renderer = renderer;

      this.camera = camera;
      this.vrCamera = vrCamera;

      if (this.onSetup !== undefined) {
        this.onSetup(scene);
      }
    },

    init: function () {
      onUpdate = this.onUpdate;
      animate();
    },

    toggleVR: function () {
      renderVR = !renderVR;
    }
  };

  global.CardboardApp = CardboardApp;
})(this);