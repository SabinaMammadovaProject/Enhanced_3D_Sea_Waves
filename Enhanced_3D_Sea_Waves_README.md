# Enhanced 3D Sea Waves Simulation

This project demonstrates an enhanced 3D sea waves simulation using Three.js, where a plane geometry is manipulated to create dynamic wave patterns, achieving a realistic sea surface effect.

## Overview

The script sets up a 3D scene with a plane geometry representing the sea surface. The geometry's vertices are animated using a custom shader to simulate wave motion, while the fragment shader assigns colors to create a visually appealing water effect. The camera is strategically positioned to provide a broad, immersive view of the sea.

## Dependencies

- [Three.js](https://threejs.org/): A lightweight, 3D library with a default WebGL renderer. Ensure to include the Three.js library in your HTML file.

## Features

- Realistic wave simulation using vertex shaders.
- Customizable wave parameters for unique visual effects.
- Responsive design that adjusts to window resizing.

## Setup

1. **Include Three.js**: Make sure to link the Three.js library in your HTML file, either by downloading the library or linking to a CDN.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

2. **Add the Script**: Include `waves.js` in your HTML file to incorporate the sea waves simulation.

```html
<script src="waves.js"></script>
```

## Components

### Scene, Camera, and Renderer

- A Three.js scene is created as a container for 3D objects.
- A perspective camera is set up and positioned to overlook the sea surface.
- A WebGL renderer is initialized to render the scene from the camera's perspective.

### Water Surface Simulation

- A plane geometry is created to represent the sea surface, with detailed segmentation for dynamic wave simulation.
- A ShaderMaterial is applied to the geometry, using custom vertex and fragment shaders for wave animation and coloring.
- The water surface mesh is added to the scene and rotated to lay flat.

### Animation and Responsiveness

- An animation loop is implemented to continuously render the scene, updating the wave patterns over time.
- The script includes a window resize handler to ensure the 3D scene adjusts appropriately, maintaining the simulation's visual integrity.

## Customization

Modify the script to adjust the camera's perspective or to alter the wave simulation's parameters for different visual effects:

- **Camera Position**: Change the camera's position and orientation to alter the viewer's perspective.
- **Wave Patterns**: Adjust the vertex shader's wave calculations to modify the wave complexity and appearance.
- **Surface Appearance**: Update the fragment shader for different water colors and effects.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Three.js Community
- Shader Programming Enthusiasts

Enjoy creating your own 3D sea waves simulation!
