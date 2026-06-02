import * as THREE from 'three';
import { DropVertex, DropFragment } from './shaders.js';

function makeDropMat(opts={}) {
  return new THREE.ShaderMaterial({
    vertexShader: DropVertex,
    fragmentShader: DropFragment,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: opts.color || new THREE.Color(0.22, 0.32, 0.42) },
      uOpacity: { value: opts.opacity ?? 0.85 },
      uBlob: { value: opts.blob ?? 0.9 },
      uRimPow: { value: opts.rimPow ?? 2.8 },
      uGlow: { value: opts.glow ?? 0.9 },
    },
    transparent: true, depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
}

export class DropSystem {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);

    this.drops = [];
    this.instanced = null;
    this.flow = null;
    this.ocean = null;

    const geo = new THREE.SphereGeometry(1.1, 120, 120);
    const poses = [
      { x: 3.4, y: 0, z: 0, s: 1.0 },
      { x: 1.0, y: 3.2, z: 0, s: 0.94 },
      { x: -2.8, y: 2.0, z: 0.5, s: 0.88 },
      { x: -2.8, y: -2.0, z: -0.3, s: 0.9 },
      { x: 1.0, y: -3.2, z: 0.2, s: 0.86 },
    ];

    poses.forEach((p, i) => {
      const m = new THREE.Mesh(geo, makeDropMat({
        opacity: 0.82, blob: 0.75 + i * 0.08,
        rimPow: 2.5 + i * 0.12, glow: 0.8 + i * 0.06,
      }));
      m.position.set(p.x, p.y, p.z);
      m.scale.setScalar(p.s);
      m.userData = {
        orig: new THREE.Vector3(p.x, p.y, p.z),
        origS: p.s, idx: i,
        angle: (i / 5) * Math.PI * 2,
        spd: 0.12 + i * 0.025,
      };
      this.group.add(m);
      this.drops.push(m);
    });

    // Instanced universe (lighter count for perf)
    const n = 1800;
    const igeo = new THREE.SphereGeometry(0.12, 24, 24);
    this.instanced = new THREE.InstancedMesh(igeo, makeDropMat({
      opacity: 0.5, blob: 0.4, rimPow: 2.2, glow: 0.6,
    }), n);
    this.instanced.visible = false;
    const dummy = new THREE.Object3D();
    this.idata = [];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2 + Math.random() * 14;
      const h = (Math.random() - 0.5) * 7;
      dummy.position.set(Math.cos(a) * r, h, Math.sin(a) * r);
      dummy.scale.setScalar(0.25 + Math.random() * 0.6);
      dummy.updateMatrix();
      this.instanced.setMatrixAt(i, dummy.matrix);
      this.idata.push({ a, r, h, spd: 0.08 + Math.random() * 0.25, ph: Math.random() * 6.28, bp: dummy.position.clone() });
    }
    this.group.add(this.instanced);

    // Flow particles
    const fc = 3000;
    const fgeo = new THREE.BufferGeometry();
    const fp = new Float32Array(fc * 3);
    const fo = new Float32Array(fc);
    const fs = new Float32Array(fc);
    for (let i = 0; i < fc; i++) {
      fp[i * 3] = (Math.random() - 0.5) * 36;
      fp[i * 3 + 1] = (Math.random() - 0.5) * 18;
      fp[i * 3 + 2] = (Math.random() - 0.5) * 36;
      fo[i] = Math.random() * 100; fs[i] = 1 + Math.random() * 2.5;
    }
    fgeo.setAttribute('position', new THREE.BufferAttribute(fp, 3));
    fgeo.setAttribute('aOff', new THREE.BufferAttribute(fo, 1));
    fgeo.setAttribute('aSize', new THREE.BufferAttribute(fs, 1));
    this.flow = new THREE.Points(fgeo, new THREE.PointsMaterial({
      color: 0x4a6078, size: 0.06, transparent: true, opacity: 0, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    }));
    this.flow.visible = false;
    this.group.add(this.flow);

    // Ocean plane
    const ogeo = new THREE.PlaneGeometry(70, 70, 160, 160);
    ogeo.rotateX(-Math.PI / 2);
    this.ocean = new THREE.Mesh(ogeo, new THREE.MeshBasicMaterial({
      color: 0x1a2535, transparent: true, opacity: 0,
      depthWrite: false, side: THREE.DoubleSide,
    }));
    this.ocean.position.y = -4;
    this.ocean.visible = false;
    this.group.add(this.ocean);
  }

  update(time, progress) {
    const t = time * 0.001;
    // hero drops
    this.drops.forEach((d, i) => {
      d.material.uniforms.uTime.value = t;
      d.material.uniforms.uBlob.value = 0.75 + Math.sin(t * 0.4 + i) * 0.25;
      const a = d.userData.angle + t * d.userData.spd * 0.25;
      const R = d.userData.orig.length();
      d.position.x = Math.cos(a) * R * 0.25;
      d.position.z = Math.sin(a) * R * 0.25;
      d.position.y = d.userData.orig.y + Math.sin(t * 0.35 + i) * 0.12;
      const B = 1 + Math.sin(t * 0.5 + i * 0.7) * 0.025;
      d.scale.setScalar(d.userData.origS * B);
    });

    // instanced
    if (this.instanced.visible) {
      this.instanced.material.uniforms.uTime.value = t;
      const dummy = new THREE.Object3D();
      for (let i = 0; i < this.idata.length; i++) {
        const d = this.idata[i];
        const a = d.a + t * d.spd * 0.18;
        dummy.position.set(Math.cos(a) * d.r, d.h + Math.sin(t + d.ph) * 0.4, Math.sin(a) * d.r);
        const s = 0.25 + Math.sin(t * 1.8 + d.ph) * 0.08;
        dummy.scale.setScalar(s); dummy.updateMatrix();
        this.instanced.setMatrixAt(i, dummy.matrix);
      }
      this.instanced.instanceMatrix.needsUpdate = true;
    }

    // flow
    if (this.flow.visible) {
      const pos = this.flow.geometry.attributes.position.array;
      const off = this.flow.geometry.attributes.aOff.array;
      for (let i = 0; i < off.length; i++) {
        const ph = off[i] + t * 0.25;
        pos[i * 3] += Math.sin(ph * 2) * 0.003;
        pos[i * 3 + 1] += Math.cos(ph * 1.5) * 0.002;
      }
      this.flow.geometry.attributes.position.needsUpdate = true;
    }
  }

  phase(p, sub) {
    // 0 hero, 1 converge, 2 universe, 3 flow, 4 ocean, 5 protocol
    this.drops.forEach((d, i) => {
      if (p < 1) {
        d.visible = true; d.material.uniforms.uOpacity.value = p === 0 ? 0.82 : THREE.MathUtils.lerp(0.82, 0.25, sub);
      } else if (p === 1) {
        d.visible = true;
        d.position.lerp(new THREE.Vector3(0, 0, 0), sub * 0.35);
        d.scale.setScalar(THREE.MathUtils.lerp(d.userData.origS, 0.25, sub));
        d.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.82, 0.3, sub);
      } else {
        d.visible = sub < 0.25;
        if (d.visible) d.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.3, 0, sub / 0.25);
      }
    });

    if (p === 1) { this.instanced.visible = true; this.instanced.material.uniforms.uOpacity.value = Math.max(0, (sub - 0.5) * 2) * 0.6; }
    else if (p === 2) { this.instanced.visible = true; this.instanced.material.uniforms.uOpacity.value = 0.6; }
    else if (p === 3) { this.instanced.visible = true; this.instanced.material.uniforms.uOpacity.value = THREE.MathUtils.lerp(0.6, 0.2, sub); }
    else { this.instanced.visible = false; }

    if (p === 3) { this.flow.visible = true; this.flow.material.opacity = THREE.MathUtils.lerp(0, 0.6, sub); }
    else if (p === 4) { this.flow.visible = true; this.flow.material.opacity = THREE.MathUtils.lerp(0.6, 0.3, sub); }
    else if (p === 5) { this.flow.visible = true; this.flow.material.opacity = 0.35; }
    else { this.flow.visible = false; }

    if (p === 4) { this.ocean.visible = true; this.ocean.material.opacity = sub * 0.55; }
    else if (p === 5) { this.ocean.visible = true; this.ocean.material.opacity = 0.55; }
    else { this.ocean.visible = false; }

    if (p === 5 && sub < 0.3) {
      this.drops.forEach(d => { d.visible = sub > 0.15; if (d.visible) { d.material.uniforms.uOpacity.value = (sub - 0.15) / 0.15 * 0.8; d.scale.setScalar(d.userData.origS * 0.45); } });
    }
  }
}
