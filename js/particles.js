import * as THREE from 'three';

export class Starfield {
  constructor(scene) {
    this.layers = [];
    const mk = (cnt, size, color, range, spd, depth) => {
      const g = new THREE.BufferGeometry();
      const p = new Float32Array(cnt * 3);
      const ph = new Float32Array(cnt);
      for (let i = 0; i < cnt; i++) {
        p[i * 3] = (Math.random() - 0.5) * range.x;
        p[i * 3 + 1] = (Math.random() - 0.5) * range.y;
        p[i * 3 + 2] = (Math.random() - 0.5) * range.z;
        ph[i] = Math.random() * 6.28;
      }
      g.setAttribute('position', new THREE.BufferAttribute(p, 3));
      g.setAttribute('phase', new THREE.BufferAttribute(ph, 1));
      const m = new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
      const pts = new THREE.Points(g, m);
      pts.userData = { spd, depth, orig: p.slice() };
      return pts;
    };

    const L = [
      mk(2500, 0.025, new THREE.Color(0.5, 0.55, 0.62), { x: 60, y: 60, z: 60 }, 0.015, 0.08),
      mk(1200, 0.04, new THREE.Color(0.4, 0.45, 0.52), { x: 40, y: 40, z: 40 }, 0.04, 0.2),
      mk(600, 0.06, new THREE.Color(0.32, 0.38, 0.46), { x: 25, y: 25, z: 25 }, 0.07, 0.45),
      mk(300, 0.09, new THREE.Color(0.28, 0.34, 0.42), { x: 15, y: 15, z: 15 }, 0.1, 0.7),
      mk(150, 0.14, new THREE.Color(0.4, 0.45, 0.52), { x: 10, y: 10, z: 10 }, 0.15, 1.0),
    ];
    L.forEach(l => { scene.add(l); this.layers.push(l); });
  }

  update(time, progress) {
    const t = time * 0.001;
    this.layers.forEach((l, i) => {
      const p = l.geometry.attributes.position.array;
      const ph = l.geometry.attributes.phase.array;
      const o = l.userData.orig;
      const drift = progress * l.userData.depth * 4;
      for (let j = 0; j < p.length / 3; j++) {
        const k = j * 3; const sp = l.userData.spd;
        p[k] = o[k] + Math.sin(t * sp + ph[j]) * 0.25 + drift * (i + 1) * 0.015;
        p[k + 1] = o[k + 1] + Math.cos(t * sp * 0.7 + ph[j]) * 0.18;
        p[k + 2] = o[k + 2] + Math.sin(t * sp * 0.5 + ph[j] + 1) * 0.25;
      }
      l.geometry.attributes.position.needsUpdate = true;
      if (progress > 0.3) {
        const fs = 0.3 + i * 0.08; const fe = fs + 0.12;
        l.material.opacity = Math.max(0.04, THREE.MathUtils.lerp(0.45, 0.12, (progress - fs) / (fe - fs)));
      } else { l.material.opacity = 0.45; }
    });
  }
}

export class Haze {
  constructor(scene) {
    this.meshes = [];
    const g = new THREE.IcosahedronGeometry(3, 4);
    for (let i = 0; i < 5; i++) {
      const m = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0.03, 0.05, 0.08).lerp(new THREE.Color(0.05, 0.08, 0.12), i / 5),
        transparent: true, opacity: 0.025 + i * 0.008, depthWrite: false,
        blending: THREE.AdditiveBlending, side: THREE.BackSide,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 9, (Math.random() - 0.5) * 14);
      mesh.scale.setScalar(2 + Math.random() * 3);
      mesh.userData = { ds: 0.08 + Math.random() * 0.15, ax: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize() };
      scene.add(mesh); this.meshes.push(mesh);
    }
  }
  update(time) {
    const t = time * 0.001;
    this.meshes.forEach(m => {
      m.position.x += Math.sin(t * m.userData.ds) * 0.0015;
      m.position.y += Math.cos(t * m.userData.ds * 0.7) * 0.0015;
      m.rotation.x += 0.00025; m.rotation.y += 0.0004;
    });
  }
}
