import * as THREE from 'three';

export class ParallaxSystem {
  constructor(scene) {
    this.scene = scene;
    this.layers = [];
    this.initLayers();
  }

  createParticleLayer(count, size, color, range, speed, depth) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * range.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * range.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * range.z;
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    const material = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.userData = { speed, depth, originalPositions: positions.slice() };
    return points;
  }

  initLayers() {
    // Layer 1: Deep space stars (slowest, smallest)
    const layer0 = this.createParticleLayer(
      3000, 0.03, new THREE.Color(0.6, 0.7, 1.0),
      { x: 60, y: 60, z: 60 }, 0.02, 0.1
    );
    layer0.userData.far = true;
    this.scene.add(layer0);
    this.layers.push(layer0);

    // Layer 2: Ambient dust
    const layer1 = this.createParticleLayer(
      1500, 0.05, new THREE.Color(0.4, 0.55, 0.9),
      { x: 40, y: 40, z: 40 }, 0.05, 0.25
    );
    this.scene.add(layer1);
    this.layers.push(layer1);

    // Layer 3: Medium particles
    const layer2 = this.createParticleLayer(
      800, 0.08, new THREE.Color(0.3, 0.5, 1.0),
      { x: 25, y: 25, z: 25 }, 0.08, 0.5
    );
    this.scene.add(layer2);
    this.layers.push(layer2);

    // Layer 4: Near context particles
    const layer3 = this.createParticleLayer(
      400, 0.12, new THREE.Color(0.25, 0.45, 0.95),
      { x: 15, y: 15, z: 15 }, 0.12, 0.75
    );
    this.scene.add(layer3);
    this.layers.push(layer3);

    // Layer 5: Foreground sparkles
    const layer4 = this.createParticleLayer(
      200, 0.18, new THREE.Color(0.5, 0.7, 1.0),
      { x: 10, y: 10, z: 10 }, 0.18, 1.0
    );
    this.scene.add(layer4);
    this.layers.push(layer4);
  }

  update(time, scrollProgress, camera) {
    const t = time * 0.001;

    this.layers.forEach((layer, i) => {
      const positions = layer.geometry.attributes.position.array;
      const phases = layer.geometry.attributes.phase.array;
      const orig = layer.userData.originalPositions;
      const depth = layer.userData.depth;

      // Parallax movement based on scroll
      const parallaxOffset = scrollProgress * depth * 5;

      for (let j = 0; j < positions.length / 3; j++) {
        const idx = j * 3;
        const phase = phases[j];
        const speed = layer.userData.speed;

        positions[idx] = orig[idx] + Math.sin(t * speed + phase) * 0.3;
        positions[idx + 1] = orig[idx + 1] + Math.cos(t * speed * 0.7 + phase) * 0.2;
        positions[idx + 2] = orig[idx + 2] + Math.sin(t * speed * 0.5 + phase + 1) * 0.3;

        // Apply parallax drift
        positions[idx] += parallaxOffset * (i + 1) * 0.02;
      }

      layer.geometry.attributes.position.needsUpdate = true;

      // Fade out far layers as we zoom in
      if (scrollProgress > 0.3) {
        const fadeStart = 0.3 + i * 0.1;
        const fadeEnd = fadeStart + 0.15;
        layer.material.opacity = Math.max(0.05, THREE.MathUtils.lerp(0.6, 0.15, (scrollProgress - fadeStart) / (fadeEnd - fadeStart)));
      } else {
        layer.material.opacity = 0.6;
      }
    });
  }
}

export class VolumetricFog {
  constructor(scene) {
    this.scene = scene;
    this.fogMeshes = [];
    this.initFog();
  }

  initFog() {
    const geometry = new THREE.IcosahedronGeometry(3, 4);

    for (let i = 0; i < 5; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.02, 0.08, 0.25).lerp(new THREE.Color(0.05, 0.15, 0.4), i / 5),
        transparent: true,
        opacity: 0.03 + i * 0.01,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 15
      );
      mesh.scale.setScalar(2 + Math.random() * 3);
      mesh.userData = {
        driftSpeed: 0.1 + Math.random() * 0.2,
        driftAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      };
      this.scene.add(mesh);
      this.fogMeshes.push(mesh);
    }
  }

  update(time) {
    const t = time * 0.001;
    this.fogMeshes.forEach(mesh => {
      mesh.position.x += Math.sin(t * mesh.userData.driftSpeed) * 0.002;
      mesh.position.y += Math.cos(t * mesh.userData.driftSpeed * 0.7) * 0.002;
      mesh.rotation.x += 0.0003;
      mesh.rotation.y += 0.0005;
    });
  }
}
