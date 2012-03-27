(function(){
    // set the scene size
    var WIDTH = $(window).width(),
        HEIGHT = $(window).height();

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 1000;

    // get the DOM element to attach to
    // - assume we've got jQuery to hand
    var $container = $('#screen');

    // create a WebGL renderer, camera
    // and a scene
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    var scene = new THREE.Scene();

    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    window.timrwood = {
        renderer : renderer,
        camera : camera,
        scene : scene
    }
})();