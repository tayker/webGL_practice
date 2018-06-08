document.addEventListener('DOMContentLoaded', function(){
    var GLEl = document.getElementById('webGL');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    
    renderer.setClearColor(0xeeeeee, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.width = 1024;
    renderer.shadowMap.height = 1024;
    
    var controls = new THREE.OrbitControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    
    var axes = new THREE.AxisHelper(20);
    scene.add(axes);
    
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(80, 100, 110);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    var flowerTexture = new THREE.TextureLoader().load('../images/flower2.png');
    var flowerTexture2 = new THREE.TextureLoader().load('../images/flower3.png');
    
    var newPlaneGeametry = new THREE.PlaneGeometry(20, 20, 1, 1);
    var newPlaneMaterial = new THREE.MeshLambertMaterial({
        map: flowerTexture,
        transparent: true
    });
    var newPlane = new THREE.Mesh(newPlaneGeametry, newPlaneMaterial);
    
    var mx = 0;
    
    var planes = [];
    var planes2 = [];
    
    var newPlaneGeametry2 = new THREE.PlaneGeometry(16, 16, 1, 1);
    var newPlaneMaterial2 = new THREE.MeshLambertMaterial({
        map: flowerTexture2,
        transparent: true
    });
    var newPlane2 = new THREE.Mesh(newPlaneGeametry2, newPlaneMaterial2);
    
    function getRandomArbitrary(min, max) {
//        return Math.random() * (max - min) + min;
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    for(i=0;i<10;i++){
        planes[i] = newPlane.clone();
        planes[i].position.x = mx;
        planes[i].position.y = getRandomArbitrary(130, 1400);
        scene.add(planes[i]);
        mx += getRandomArbitrary(10, 50);
    }
    
    for(i=0;i<10;i++){
        planes2[i] = newPlane2.clone();
        planes2[i].position.x = -mx;
        planes2[i].position.y = getRandomArbitrary(130, 1400);
        scene.add(planes2[i]);
        mx -= getRandomArbitrary(10, 50);
    }
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 360;
    camera.lookAt(scene.position);
    
    GLEl.append(renderer.domElement);
    
    var stats = initStats();
    var step = 0;
    
    function render() {
        stats.update();
        
        for(i=0;i<planes.length;i++){
            planes[i].position.y -= 2.6;
            planes[i].position.x -= 0.9;
            
            if(planes[i].position.y <= -100){
                planes[i].position.y = getRandomArbitrary(130, 1400);
                planes[i].position.x = getRandomArbitrary(0, 1000);
            }
        }
        
        for(i=0;i<planes2.length;i++){
            planes2[i].position.y -= 2.6;
            planes2[i].position.x += 0.9;
            
            if(planes2[i].position.y <= -100){
                planes2[i].position.y = getRandomArbitrary(130, 1400);
                planes2[i].position.x = getRandomArbitrary(0, -1200);
            }
        }
        
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
    
    function initStats() {
        var stats = new Stats();
        var out = document.getElementById('Stats-output');
        
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        out.append(stats.domElement );
        
        return stats;
    }
});