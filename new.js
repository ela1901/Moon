// new.js
let activated = false;
"use strict";
/* globals THREE, console */

let camera, scene, renderer;
let planeMesh;
let stars = [];
let colors = [
    "#0952BD",
    "#A5BFF0",
    "#118CD6",
    "#1AAEE8",
    "#ffffff"
];

function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 0.015, 72);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, alpha: true });
    renderer.sortObjects = false;
    renderer.autoClearColor = false;

    camera.position.z = 55;

    renderer.setClearColor("#000", 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(renderer.domElement);

    let planeGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 1 });

    planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    for (let i = 0; i < 3000; i++) {
        let geometry = new THREE.SphereBufferGeometry(0.12 * Math.random(), 10, 10);
        let material = new THREE.MeshBasicMaterial({
            color: colors[Math.floor(Math.random() * colors.length)],
            shading: THREE.FlatShading
        });

        let star = new THREE.Mesh(geometry, material);

        star.position.x = Math.random() * 100 - 50;
        star.position.y = Math.random() * 100 - 50;
        star.position.z = Math.random() * 50 - 25;

        scene.add(star);
        stars.push(star);
    }

}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);

    for (let i = 0; i < stars.length; i++) {
        stars[i].position.z += 0.09;

        if (stars[i].position.z >= 60) {
            stars[i].position.x = Math.random() * 100 - 50;
            stars[i].position.y = Math.random() * 100 - 50;
            stars[i].position.z = 5;
        }
    }

    if (activated == true) {
        planeMesh.material.opacity = 0.01;
    } else {
        if (planeMesh.material.opacity < 1) {
            planeMesh.material.opacity += 0.01;
        }
    }
}

init();
render();

window.addEventListener("mousedown", function (event) {
    activated = true;
});

window.addEventListener("mouseup", function (event) {
    activated = false;
});

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("touchstart", function () {
    activated = true;
});

window.addEventListener("touchend", function () {
    activated = false;
});

var h2 = document.querySelector('h2');
h2.style.position = 'absolute';
h2.style.top = '50%';
h2.style.left = '50%';
h2.style.transform = 'translate(-50%, -50%)';
h2.style.zIndex = '1000';
h2.style.color = 'white';
TweenLite.fromTo(h2, 1.5, { opacity: 0 }, { opacity: 1, transform: 'translate(-50%, -50%)' });
TweenLite.to(h2, 1.75, { opacity: 0, delay: 3 });


onload = () => {
    document.body.classList.remove("container");
  };