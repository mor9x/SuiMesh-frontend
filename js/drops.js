import * as THREE from 'three';
import { DropVertexShader, DropFragmentShader, FlowVertexShader, FlowFragmentShader, OceanVertexShader, OceanFragmentShader } from './shaders.js';

export class DropSystem {
  constructor(scene) {
    this.scene = scene;
    this.drops = [];
    this.instancedDrops = null;
    this.flowParticles = null;
    this.oceanMesh = null;
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.config = {
      dropColor: new THREE.Color(0.15, 0.35, 0.85),
      dropRadius: 1.2,
      dropSegments: 128,
    };

    this.initHeroDrops();
    this.initInstancedDrops();
    this.initFlowParticles();
    this.initOcean();
  }

  createDropMaterial(opts = {}) {
    return new THREE.ShaderMaterial({
      vertexShader: DropVertexShader,
      fragmentShader: DropFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: opts.color || this.config.dropColor },
        uOpacity: { value: opts.opacity ?? 0.9 },
        uBlobbiness: { value: opts.blobbiness ?? 1.0 },
        uFresnelPower: { value: opts.fresnelPower ?? 2.5 },
        uGlowIntensity: { value: opts.glowIntensity ?? 1.2 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
  }

  initHeroDrops() {
    const geometry = new THREE.SphereGeometry(this.config.dropRadius, this.config.dropSegments, this.config.dropSegments);
    const positions = [
      { x: 3.5, y: 0, z: 0, scale: 1.0 },
      { x: 1.1, y: 3.3, z: 0, scale: 0.95 },
      { x: -2.9, y: 2.1, z: 0.5, scale: 0.9 },
      { x: -2.9, y: -2.1, z: -0.3, scale: 0.92 },
      { x: 1.1, y: -3.3, z: 0.2, scale: 0.88 },
    ];

    positions.forEach((pos, i) => {
      const material = this.createDropMaterial({
        opacity: 0.85,
        blobbiness: 0.8 + i * 0.1,
        fresnelPower: 2.2 + i * 0.15,
        glowIntensity: 1.0 + i * 0.1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.scale.setScalar(pos.scale);
      mesh.userData = {
        originalPos: new THREE.Vector3(pos.x, pos.y, pos.z),
        originalScale: pos.scale,
        index: i,
        orbitAngle: (i / 5) * Math.PI * 2,
        orbitSpeed: 0.15 + i * 0.03,
      };
      this.group.add(mesh);
      this.drops.push(mesh);
    });
  }

  initInstancedDrops() {
    const count = 2500;
    const geometry = new THREE.SphereGeometry(0.15, 32, 32);
    const material = this.createDropMaterial({
      opacity: 0.6,
      blobbiness: 0.5,
      fresnelPower: 2.0,
      glowIntensity: 0.8,
    });

    this.instancedDrops = new THREE.InstancedMesh(geometry, material, count);
    this.instancedDrops.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.instancedDrops.visible = false;

    const dummy = new THREE.Object3D();
    this.instanceData = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 15;
      const height = (Math.random() - 0.5) * 8;

      dummy.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      dummy.scale.setScalar(0.3 + Math.random() * 0.7);
      dummy.updateMatrix();
      this.instancedDrops.setMatrixAt(i, dummy.matrix);

      this.instanceData.push({
        angle,
        radius,
        height,
        speed: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        basePos: dummy.position.clone(),
      });
    }

    this.group.add(this.instancedDrops);
  }

  initFlowParticles() {
    const count = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      offsets[i] = Math.random() * 100;
      sizes[i] = 1.0 + Math.random() * 3.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: FlowVertexShader,
      fragmentShader: FlowFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0.2, 0.5, 1.0) },
        uFlowSpeed: { value: 0.3 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.flowParticles = new THREE.Points(geometry, material);
    this.flowParticles.visible = false;
    this.group.add(this.flowParticles);
  }

  initOcean() {
    const geometry = new THREE.PlaneGeometry(80, 80, 200, 200);
    geometry.rotateX(-Math.PI / 2);

    const material = new THREE.ShaderMaterial({
      vertexShader: OceanVertexShader,
      fragmentShader: OceanFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorDeep: { value: new THREE.Color(0.02, 0.08, 0.25) },
        uColorSurface: { value: new THREE.Color(0.08, 0.25, 0.6) },
        uOpacity: { value: 0.7 },
      },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    this.oceanMesh = new THREE.Mesh(geometry, material);
    this.oceanMesh.position.y = -5;
    this.oceanMesh.visible = false;
    this.group.add(this.oceanMesh);
  }

  update(time, scrollProgress) {
    const t = time * 0.001;

    // Update hero drops uniforms
    this.drops.forEach((drop, i) => {
      drop.material.uniforms.uTime.value = t;
      drop.material.uniforms.uBlobbiness.value = 0.8 + Math.sin(t * 0.5 + i) * 0.3;

      // Gentle orbit rotation around center
      const angle = drop.userData.orbitAngle + t * drop.userData.orbitSpeed * 0.3;
      const radius = drop.userData.originalPos.length();
      drop.position.x = Math.cos(angle) * radius * 0.3;
      drop.position.z = Math.sin(angle) * radius * 0.3;
      drop.position.y = drop.userData.originalPos.y + Math.sin(t * 0.4 + i) * 0.15;

      // Breathing scale
      const breathe = 1.0 + Math.sin(t * 0.6 + i * 0.8) * 0.03;
      drop.scale.setScalar(drop.userData.originalScale * breathe);
    });

    // Update instanced drops
    if (this.instancedDrops.visible) {
      this.instancedDrops.material.uniforms.uTime.value = t;
      const dummy = new THREE.Object3D();

      for (let i = 0; i < this.instanceData.length; i++) {
        const data = this.instanceData[i];
        const a = data.angle + t * data.speed * 0.2;
        dummy.position.set(
          Math.cos(a) * data.radius,
          data.height + Math.sin(t + data.phase) * 0.5,
          Math.sin(a) * data.radius
        );
        const s = 0.3 + Math.sin(t * 2 + data.phase) * 0.1;
        dummy.scale.setScalar(s);
        dummy.updateMatrix();
        this.instancedDrops.setMatrixAt(i, dummy.matrix);
      }
      this.instancedDrops.instanceMatrix.needsUpdate = true;
    }

    // Update flow particles
    if (this.flowParticles.visible) {
      this.flowParticles.material.uniforms.uTime.value = t;
    }

    // Update ocean
    if (this.oceanMesh.visible) {
      this.oceanMesh.material.uniforms.uTime.value = t;
    }
  }

  setScenePhase(phase, progress) {
    // Phase 0: Hero - 5 drops visible
    // Phase 1: Convergence - drops pulling together
    // Phase 2: Universe - instanced drops visible
    // Phase 3: Flow - flow particles visible
    // Phase 4: Ocean - ocean visible
    // Phase 5: Protocol - all visible, final composition

    this.drops.forEach((drop, i) => {
      if (phase < 1) {
        drop.visible = true;
        const targetOpacity = phase === 0 ? 0.85 : THREE.MathUtils.lerp(0.85, 0.3, progress);
        drop.material.uniforms.uOpacity.value = targetOpacity;
      } else if (phase === 1) {
        drop.visible = true;
        const convergeFactor = progress;
        drop.position.lerp(new THREE.Vector3(0, 0, 0), convergeFactor * 0.3);
        drop.scale.setScalar(THREE.MathUtils.lerp(drop.userData.originalScale, 0.3, convergeFactor));
        drop.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.85, 0.4, convergeFactor);
      } else {
        drop.visible = progress < 0.3;
        if (drop.visible) {
          drop.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.4, 0, progress / 0.3);
        }
      }
    });

    // Instanced drops
    if (phase === 1) {
      this.instancedDrops.visible = true;
      const fadeIn = Math.max(0, (progress - 0.5) * 2);
      this.instancedDrops.material.uniforms.uOpacity.value = fadeIn * 0.7;
    } else if (phase === 2) {
      this.instancedDrops.visible = true;
      this.instancedDrops.material.uniforms.uOpacity.value = 0.7;
    } else if (phase === 3) {
      this.instancedDrops.visible = true;
      this.instancedDrops.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.7, 0.3, progress);
    } else if (phase >= 4) {
      this.instancedDrops.visible = false;
    } else {
      this.instancedDrops.visible = false;
    }

    // Flow particles
    if (phase === 3) {
      this.flowParticles.visible = true;
      this.flowParticles.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0, 0.8, progress);
    } else if (phase === 4) {
      this.flowParticles.visible = true;
      this.flowParticles.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.8, 0.4, progress);
    } else if (phase === 5) {
      this.flowParticles.visible = true;
      this.flowParticles.material.uniforms.uOpacity.value = 0.5;
    } else {
      this.flowParticles.visible = false;
    }

    // Ocean
    if (phase === 4) {
      this.oceanMesh.visible = true;
      this.oceanMesh.material.uniforms.uOpacity.value = progress * 0.7;
    } else if (phase === 5) {
      this.oceanMesh.visible = true;
      this.oceanMesh.material.uniforms.uOpacity.value = 0.7;
    } else {
      this.oceanMesh.visible = false;
    }

    // Phase 5 composition
    if (phase === 5) {
      if (progress < 0.3) {
        this.drops.forEach(drop => {
          drop.visible = progress > 0.15;
          if (drop.visible) {
            drop.material.uniforms.uOpacity.value = (progress - 0.15) / 0.15 * 0.9;
            drop.scale.setScalar(drop.userData.originalScale * 0.5);
          }
        });
      }
    }
  }
}
