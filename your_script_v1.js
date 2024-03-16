const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 50;

const waterGeometry = new THREE.PlaneGeometry(100, 100, 64, 64);

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec3 pos = position;
            float height = sin(pos.x * 0.05 + time) * cos(pos.y * 0.05 + time) * 2.0;
            pos.z = height;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
  fragmentShader: `
        varying vec2 vUv;
        void main() {
            gl_FragColor = vec4(vUv, 0.5, 1.0); // Simple water color
        }
    `,
  uniforms: {
    time: { value: 0.0 },
  },
  wireframe: true, // Set to false for a solid surface
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
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
