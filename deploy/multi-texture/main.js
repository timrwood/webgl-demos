(function(timrwood){
    // globals and constants
    var radius = 20,
        padding = 5,
        rotation = 0,
        farTexture = THREE.ImageUtils.loadTexture('wide.jpg'),
        detailTexture = THREE.ImageUtils.loadTexture('close.jpg'),
        uniforms = {
            near : {
                type : 'f',
                value : 0
            },
            far : {
                type : 'f',
                value : 150
            },
            farTexture : {
                type : 't',
                value: 0,
                texture : farTexture
            },
            detailTexture : {
                type : 't',
                value: 1,
                texture : detailTexture
            }
        },
        time = Date.now();
    farTexture.wrapS = THREE.RepeatWrapping;
    farTexture.wrapT = THREE.RepeatWrapping;
    detailTexture.wrapS = THREE.RepeatWrapping;
    detailTexture.wrapT = THREE.RepeatWrapping;

    // sphere
    var sphereMaterial = new THREE.ShaderMaterial({
        uniforms : uniforms,
        vertexShader:   $('#vert').text(),
        fragmentShader: $('#frag').text()
    });

    // plane
    var mesh = new THREE.PlaneGeometry(1000, 200, 20, 20);
    for (var i = 0; i < 20 * 20; i++) {
        mesh.faceVertexUvs[0][i][0].u *= 5;
        mesh.faceVertexUvs[0][i][1].u *= 5;
        mesh.faceVertexUvs[0][i][2].u *= 5;
        mesh.faceVertexUvs[0][i][3].u *= 5;
    }
    var plane = new THREE.Mesh(mesh, sphereMaterial);
    timrwood.scene.add(plane);

    // render
    function render() {
        // time diff
        var diff = Date.now() - time;
        time = Date.now();
        rotation += diff / 1000;

        // change camera position
        timrwood.camera.position.x = 100 * Math.cos(rotation / 2);
        timrwood.camera.position.z = 50 + 40 * Math.sin(rotation / 2);
        timrwood.camera.position.y = 50;
        timrwood.camera.lookAt(new THREE.Vector3(0, 20, -20));

        // render
        timrwood.renderer.render(timrwood.scene, timrwood.camera);
        window.requestAnimationFrame(render);
    }
    render();
})(window.timrwood);