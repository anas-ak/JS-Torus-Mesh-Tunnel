var $container = $('#container');
var renderer = new THREE.WebGLRenderer({antialias: true});

//This projection mode is designed to mimic the way the human eye sees
var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.3, 10000);
var scene = new THREE.Scene();
var mouseX = 0, mouseY = 0;

// Uncomment code below for tunnel steering
// You'll fly through the walls like in Mario Kart.

// var windowHalfX = window.innerWidth / 2;
// var windowHalfY = window.innerHeight / 2;
// document.addEventListener( 'mousemove', onDocumentMouseMove, false );

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);
$container.append(renderer.domElement);

window.addEventListener( 'resize', onWindowResize, false );

// Console
var Controls = function() {
    this.speed = 2;
    this.rotation = 0;
};

var text = new Controls(),
    gui = new dat.GUI();
    gui.add(text, 'speed', 0, 10);
    gui.add(text, 'rotation', 0, 15);

// Normalmaterial
// material that maps the normal vectors to RGB colors
var normalMaterial = new THREE.MeshNormalMaterial({color: 0x009900});

// Torus
function Torus(f){
    // Class representing triangular polygon mesh based objects(class for generating torus geometries)
    this.b = new THREE.Mesh(new THREE.TorusGeometry( 180, 95, 2, 12), normalMaterial);
    this.b.position.x = 50*Math.cos(f);
    this.b.position.y = 50*Math.sin(f);
    this.b.position.z = f*1.20;
    this.b.rotation.z = f*0.03;
}

var numTorus = 80;
var tabTorus = [];
for(var i=0; i<numTorus; i++){
    tabTorus.push(new Torus(-i * 12));
    scene.add(tabTorus[i].b);
}

// Update
function update(){
    for(var i=0; i<numTorus; i++){
        tabTorus[i].b.position.z += text.speed;
        tabTorus[i].b.rotation.z += i*text.rotation / 10000;
        
        if(tabTorus[i].b.position.z > 0)
        {
            tabTorus[i].b.position.z = -1000;
        }
    }
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX );
    mouseY = ( event.clientY - windowHalfY );
}

// Render
function render() {
    requestAnimationFrame( render);

    camera.position.x += ( mouseX - camera.position.x ) * .05;
    camera.position.y += ( - mouseY - camera.position.y ) * .05;

    renderer.render(scene, camera);
    update();
}

render();