import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class PostProcessing {
  constructor(renderer, scene, camera) {
    this.composer = new EffectComposer(renderer);
    this.composer.addPass(new RenderPass(scene, camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.5, 0.82);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }
  resize(w, h) {
    this.composer.setSize(w, h);
    this.bloom.resolution.set(w, h);
  }
  update(progress, phase) {
    const p = phase;
    if (p === 0) { this.bloom.strength = THREE.MathUtils.lerp(0.4, 0.7, progress); this.bloom.threshold = 0.82; }
    else if (p === 1) { this.bloom.strength = THREE.MathUtils.lerp(0.7, 1.1, progress); this.bloom.threshold = 0.78; }
    else if (p === 2) { this.bloom.strength = THREE.MathUtils.lerp(1.1, 0.8, progress); this.bloom.threshold = 0.8; }
    else if (p === 3) { this.bloom.strength = THREE.MathUtils.lerp(0.8, 0.6, progress); this.bloom.radius = THREE.MathUtils.lerp(0.5, 0.75, progress); }
    else { this.bloom.strength = THREE.MathUtils.lerp(0.6, 0.45, progress); }
  }
  render() { this.composer.render(); }
}
