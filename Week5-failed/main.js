import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene = new THREE.Scene();
let angle=0;
let hours, minutes;

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.z = 30;
camera.position.y = 40;
camera.lookAt( 0, 0, 0 );

//renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
//scene.background= new THREE.Color("rgb(200, 150, 50)");

//controler
const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

//light
const pointlLight = new THREE.PointLight( 0xffffff, 400,200 );
pointlLight.castShadow = true; 
// let lightHelper = new THREE.PointLightHelper( pointlLight );
// scene.add( lightHelper );// default false
pointlLight.shadow.mapSize.width = 1024; // default
pointlLight.shadow.mapSize.height = 1024; // default
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 0.2);
//light.castShadow = true; 
scene.add( light );
scene.add( pointlLight );

//ground objects
const geometry = new THREE.PlaneGeometry( 200, 200 );
const material = new THREE.MeshLambertMaterial( { color: 0xbcbcbc } );
const ground = new THREE.Mesh( geometry, material );
ground.position.set( 0, -2, 0 )
ground.rotation.x = - Math.PI / 2;;
ground.receiveShadow = true;
//scene.add( ground );

//loader(model of sundial)
const loader = new GLTFLoader();
loader.load( './models/scene.gltf', function ( gltf ) {
    gltf.scene.traverse( function( node ) {
        if ( node.isMesh ) { 
            node.receiveShadow = true; 
            node.castShadow = true;
        }
    } );
	//gltf.scene.rotation.y = Math.PI; 
    scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function updateLightPosition() {
    const now = new Date();
    //hours = now.getHours();
    hours = 12;
    minutes = now.getMinutes();
    //console.log(minutes);
    // calculate the minutes
    const totalMinutes = hours * 60 + minutes;

    // calculate angle
    const degreesPerMinute = 360 / (24 * 60);
    angle = -90+ (totalMinutes * degreesPerMinute);

    const radius = 30; // 圆周轨迹的半径 radius of the point light
    const x = Math.cos(angle * (Math.PI / 180)) * radius;
    const y = Math.sin(angle * (Math.PI / 180)) * radius;

    pointlLight.position.set(x, y, 0);

    renderer.render(scene, camera);
}

function testPosition(){
    angle+=0.001;
    pointlLight.position.x = Math.cos(angle)*30;
    pointlLight.position.y = Math.sin(angle)*30;

	renderer.render( scene, camera );
}

function animate() {
	requestAnimationFrame( animate );
    controls.update();
    //testPosition();
    updateLightPosition();
}

animate();