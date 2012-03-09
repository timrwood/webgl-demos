(function(timrwood){
    // globals and constants
    var radius = 20,
        padding = 5,
        rotation = 0,
        uniforms = {
            near : {
                type : 'f',
                value : 0
            },
            far : {
                type : 'f',
                value : 500
            }
        },
        time = Date.now();

    // sphere
    var sphereMaterial = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader:   $('#vert').text(),
        fragmentShader: $('#frag').text()
    });

    // plane
    var mesh = new THREE.PlaneGeometry(1000, 1000, 20, 20);
    var plane = new THREE.Mesh(mesh, sphereMaterial);
    plane.rotation.x = -Math.PI / 2;
    timrwood.scene.add(plane);

    for (var i = -10; i < 11; i++) {
        for (var j = -10; j < 11; j++) {
            var height = radius + (radius * Math.random());
            var mesh = new THREE.CubeGeometry(radius, height, radius);
            var cube = new THREE.Mesh(mesh, sphereMaterial);
            cube.position = new THREE.Vector3(i * (radius + padding), height / 2, j * (radius + padding));
            timrwood.scene.add(cube);
        }
    }

    // render
    function render() {
        // time diff
        var diff = Date.now() - time;
        time = Date.now();
        rotation += diff / 1000;

        // change camera position
        timrwood.camera.position.z = 200 * Math.cos(rotation / 2);
        timrwood.camera.position.x = 200 * Math.sin(rotation / 2);
        timrwood.camera.position.y = 100 + 25 * Math.cos(rotation);
        timrwood.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // render
        timrwood.renderer.render(timrwood.scene, timrwood.camera);
        window.requestAnimationFrame(render);
    }
    render();
})(window.timrwood);