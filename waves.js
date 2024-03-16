const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initial camera position
camera.position.set(0, 30, 100);
camera.lookAt(0, 0, 0);

const waterGeometry = new THREE.PlaneGeometry(200, 200, 128, 128);

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: `
        uniform float time;
        uniform float maxHeight;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec3 pos = position;
            float height = sin(pos.x * 0.05 + time * 1.5) * cos(pos.y * 0.05 + time * 1.5) * maxHeight;
            height += sin(pos.x * 0.1 + time) * cos(pos.y * 0.1 + time) * (maxHeight * 0.5);
            height += sin(pos.x * 0.2 + time * 0.5) * cos(pos.y * 0.2 + time * 0.5) * (maxHeight * 0.25);
            pos.z = height;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
  fragmentShader: `
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv * 0.5 + 0.25, 0.6, 1.0);
        }
    `,
  uniforms: {
    time: { value: 0.0 },
    maxHeight: { value: 5.0 },
  },
  wireframe: true,
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2;
scene.add(water);

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  waterMaterial.uniforms.time.value += delta;
}

animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Camera position change functions
function setCameraPosition(x, y, z) {
  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);
}

document.getElementById("position1").addEventListener("click", function () {
  setCameraPosition(0, 30, 100);
});

document.getElementById("position2").addEventListener("click", function () {
  setCameraPosition(100, 30, 0);
});

document.getElementById("position3").addEventListener("click", function () {
  setCameraPosition(-100, 50, 50);
});
