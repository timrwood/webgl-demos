(function(timrwood){
    // globals and constants
    var radius = 20,
        padding = 2,
        street = 15,
        rotation = 0,
        uniforms = {
            lightPosition : {
                type : 'v3',
                value : new THREE.Vector3(100, 75, 50)
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
    var mesh = new THREE.PlaneGeometry(2000, 2000, 20, 20);
    var plane = new THREE.Mesh(mesh, sphereMaterial);
    plane.rotation.x = -Math.PI / 2;
    timrwood.scene.add(plane);

    var x = -250,
        z = -250;

    for (var i = -10; i < 11; i++) {
        var posx = (i % 3 === 0) ? (radius + street) : (radius + padding);
        z = -250;
        x += posx;
        for (var j = -10; j < 11; j++) {
            var height = radius + (radius * Math.random());
            var mesh = new THREE.CubeGeometry(radius, height, radius);
            var cube = new THREE.Mesh(mesh, sphereMaterial);
            var posz = (j % 3 === 0) ? (radius + street) : (radius + padding);
            cube.position = new THREE.Vector3(x, height / 2, z + posz);
            z += posz;
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

        // render
        timrwood.renderer.render(timrwood.scene, timrwood.camera);
        window.requestAnimationFrame(render);
    }
    render();
})(window.timrwood);