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

// Position the camera
camera.position.set(0, 30, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the origin

const waterGeometry = new THREE.PlaneGeometry(200, 200, 64, 64);

const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: `
        uniform float time;
        void main() {
            vec3 pos = position;
            float height = sin(pos.x * 0.05 + time) * cos(pos.y * 0.05 + time) * 2.5;
            pos.z = height;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
  fragmentShader: `
        void main() {
            gl_FragColor = vec4(0.0, 0.4, 0.8, 1.0); // Water color
        }
    `,
  uniforms: {
    time: { value: 0.0 },
  },
});

const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2; // Rotate the plane to lay flat
scene.add(water);

let clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  const delta = clock.getDelta();
  waterMaterial.uniforms.time.value += delta * 0.5; // Control the speed of the wave animation
}

animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
