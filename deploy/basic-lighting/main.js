(function(timrwood){
    // globals and constants
    var radius = 20,
        padding = 5,
        rotation = 0,
        uniforms = {
            lightPosition : {
                type : 'v3',
                value : new THREE.Vector3(100, 100, 100)
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
        timrwood.camera.position.z = 200 * Math.cos(rotation / 4);
        timrwood.camera.position.x = 200 * Math.sin(rotation / 4);
        timrwood.camera.position.y = 100 + 25 * Math.cos(rotation);
        timrwood.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // change uniforms
        uniforms.lightPosition.value.x = 50 * Math.cos(rotation / 3);
        uniforms.lightPosition.value.y = 50 - 25 * Math.cos(rotation);;
        uniforms.lightPosition.value.z = 50 * Math.sin(rotation / 3);

        // render
        timrwood.renderer.render(timrwood.scene, timrwood.camera);
        window.requestAnimationFrame(render);
    }
    render();
})(window.timrwood);