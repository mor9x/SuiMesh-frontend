import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

export class PostProcessing {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.composer = new EffectComposer(renderer);

    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);

    // Bloom pass
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.8, // strength
      0.5, // radius
      0.75 // threshold
    );
    this.composer.addPass(this.bloomPass);

    // Bokeh DOF pass
    this.bokehPass = new BokehPass(scene, camera, {
      focus: 10.0,
      aperture: 0.0005,
      maxblur: 0.015,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.bokehPass.enabled = true;
    this.composer.addPass(this.bokehPass);

    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);

    this._pixelRatio = renderer.getPixelRatio();
  }

  resize(width, height) {
    this.composer.setSize(width, height);
    this.bloomPass.resolution.set(width, height);
    this.bokehPass.uniforms['aspect'].value = width / height;
  }

  update(scrollProgress, phase) {
    // Dynamic bloom based on scene phase
    if (phase === 0) {
      this.bloomPass.strength = THREE.MathUtils.lerp(0.6, 1.0, scrollProgress);
      this.bloomPass.threshold = 0.75;
    } else if (phase === 1) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.0, 1.4, scrollProgress);
      this.bloomPass.threshold = 0.7;
    } else if (phase === 2) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.4, 1.1, scrollProgress);
      this.bloomPass.threshold = 0.72;
    } else if (phase === 3) {
      this.bloomPass.strength = THREE.MathUtils.lerp(1.1, 0.9, scrollProgress);
      this.bloomPass.radius = THREE.MathUtils.lerp(0.5, 0.8, scrollProgress);
    } else {
      this.bloomPass.strength = THREE.MathUtils.lerp(0.9, 0.7, scrollProgress);
    }

    // Dynamic DOF based on camera distance
    const focusDist = 5 + scrollProgress * 15;
    this.bokehPass.uniforms['focus'].value = focusDist;
    this.bokehPass.uniforms['aperture'].value = 0.0003 + scrollProgress * 0.0003;
    this.bokehPass.uniforms['maxblur'].value = 0.01 + scrollProgress * 0.015;
  }

  render() {
    this.composer.render();
  }
}
