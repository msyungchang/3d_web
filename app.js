let container;
let camera;
let renderer;
let scene;
let house;

function init(){
    
    container = document.querySelector(".scene");

    //Create scene
    scene = new THREE.Scene();

    //Experiment for camera fov
    const fov = 80;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1; //meter
    const far = 1000;

    //Camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 25);

    //Add light
    //Second parameter indicates how strong the light source is.
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);  

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 10, 30);
    scene.add(light);

    //Renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //Load Model
    let loader = new THREE.GLTFLoader();
    loader.load("./3d/scene.gltf", function(gltf){
        scene.add(gltf.scene);
        // to animate house
        house = gltf.scene.children[0]; 
        animate();
    });
}

function animate(){
    requestAnimationFrame(animate);  
  //   house.rotation.x += 0.005;
  //   house.rotation.y += 0.005;
    house.rotation.z += 0.005;
    renderer.render(scene,camera);

}

function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

init();

window.addEventListener("resize", onWindowResize);