import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class PostProcessing {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    this.composer.addPass(renderPass);

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8, 0.5, 0.75
    );
    this.composer.addPass(this.bloomPass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
  }

  resize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
  }

  update(scrollProgress, phase) {
    if (phase === 0) {
      this.bloomPass.strength = THREE.MathUtils.lerp(0.6, 1.0, scrollProgress);
      this.bloomPass.threshold = 0.75;
    } else if (phase === 1) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.0, 1.5, scrollProgress);
      this.bloomPass.threshold = 0.7;
    } else if (phase === 2) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.5, 1.1, scrollProgress);
    } else if (phase === 3) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.1, 0.9, scrollProgress);
      this.bloomPass.radius = THREE.MathUtils.lerp(0.5, 0.8, scrollProgress);
    } else if (phase >= 4) {
      this.bloomPass.strength = THREE.MathUtils.lerp(0.9, 0.7, scrollProgress);
    }
  }

  render() {
    this.composer.render();
  }
}
