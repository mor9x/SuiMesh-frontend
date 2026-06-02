import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DropSystem } from './drops.js';
import { Starfield, Haze } from './particles.js';
import { PostProcessing } from './post.js';

gsap.registerPlugin(ScrollTrigger);

class SuiMeshApp {
  constructor() {
    this.elCanvas = document.getElementById('webgl');
    this.elLoader = document.getElementById('loader');
    this.elNav = document.getElementById('navbar');
    this.elHint = document.getElementById('scroll-hint');
    this.elProgress = document.getElementById('progress');
    this.elBar = document.getElementById('progress-bar');
    this.slides = document.querySelectorAll('#ui-layer .slide');
    this.scrollTrack = document.getElementById('scroll-track');

    this.progress = 0;
    this.phase = 0;
    this.sub = 0;
    this.loaded = false;

    this._init();
  }

  _init() {
    this._renderer();
    this._scene();
    this._camera();
    this._lights();
    this._bgQuad();
    this._world();
    this._post();
    this._scroll();
    this._events();
    requestAnimationFrame(() => this._tick());
    this._loaded();
  }

  _renderer() {
    this.r = new THREE.WebGLRenderer({ canvas: this.elCanvas, antialias: true, powerPreference: 'high-performance' });
    this.r.setSize(window.innerWidth, window.innerHeight);
    this.r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.r.setClearColor(0x0a0a0f, 1);
    this.r.toneMapping = THREE.ACESFilmicToneMapping;
    this.r.toneMappingExposure = 1.0;
  }

  _scene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x0a0a0f, 0.025);
  }

  _camera() {
    this.cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.cam.position.set(0, 0, 11);

    this._kf = [
      { p: new THREE.Vector3(0, 0, 11), l: new THREE.Vector3(0, 0, 0), f: 45 },   // hero
      { p: new THREE.Vector3(0, 0.4, 6.5), l: new THREE.Vector3(0, 0, 0), f: 40 }, // converge push
      { p: new THREE.Vector3(1.8, 0.8, 3.8), l: new THREE.Vector3(0, 0, 0), f: 36 }, // converge orbit
      { p: new THREE.Vector3(0, 2.8, 1.8), l: new THREE.Vector3(0, 0, 0), f: 56 },   // universe reveal
      { p: new THREE.Vector3(0, 4.5, 13), l: new THREE.Vector3(0, 0, 0), f: 50 },    // universe wide
      { p: new THREE.Vector3(-4.5, 1.8, 7), l: new THREE.Vector3(2, 0, 0), f: 43 },  // flow track
      { p: new THREE.Vector3(0, 7, 11), l: new THREE.Vector3(0, -2, 0), f: 48 },     // ocean fly
      { p: new THREE.Vector3(2.5, 1.5, 5.5), l: new THREE.Vector3(0, 0, 0), f: 40 }, // protocol
    ];
  }

  _lights() {
    this.amb = new THREE.AmbientLight(0x1a2a4a, 0.25);
    this.scene.add(this.amb);

    this.key = new THREE.DirectionalLight(0x3b5a7a, 1.6);
    this.key.position.set(4, 7, 4);
    this.scene.add(this.key);

    this.fill = new THREE.DirectionalLight(0x4a6a8a, 0.45);
    this.fill.position.set(-4, 2.5, 1.5);
    this.scene.add(this.fill);

    this.rim = new THREE.DirectionalLight(0x6a8aaa, 0.9);
    this.rim.position.set(0, -4, -7);
    this.scene.add(this.rim);

    this.pt1 = new THREE.PointLight(0x3a5a7a, 2.2, 18);
    this.pt1.position.set(2.5, 1.5, 2.5);
    this.scene.add(this.pt1);

    this.pt2 = new THREE.PointLight(0x4a6a8a, 1.4, 13);
    this.pt2.position.set(-2.5, -1.5, -1.5);
    this.scene.add(this.pt2);
  }

  _bgQuad() {
    // procedural deep starfield via simple shader
    const v = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
    const f = /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float n2(vec2 p){
        vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
        float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));
        return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
      }
      void main(){
        vec2 uv=vUv;
        float t=uTime*0.015;
        float neb=n2(uv*2.5+t)*0.45+n2(uv*5.0-t*0.6)*0.3+n2(uv*10.0+t*0.3)*0.15;
        float st=step(1.0-0.0025,hash(uv*600.0+t*8.0));
        st*=hash(uv*600.0+1.0)*0.7+0.3;
        vec3 base=mix(vec3(0.02,0.025,0.04),vec3(0.03,0.04,0.06),neb);
        base+=vec3(0.5)*st*0.45;
        gl_FragColor=vec4(base,1.0);
      }
    `;
    const geo = new THREE.PlaneGeometry(300, 300);
    const mat = new THREE.ShaderMaterial({ vertexShader: v, fragmentShader: f, uniforms: { uTime: { value: 0 } }, depthWrite: false });
    this.bg = new THREE.Mesh(geo, mat);
    this.bg.position.z = -55;
    this.scene.add(this.bg);
  }

  _world() {
    this.drops = new DropSystem(this.scene);
    this.stars = new Starfield(this.scene);
    this.haze = new Haze(this.scene);
  }

  _post() {
    this.pp = new PostProcessing(this.r, this.scene, this.cam);
  }

  _camPath(p) {
    const k = this._kf, s = k.length - 1;
    const sp = Math.min(p * s, s - 0.001);
    const i = Math.floor(sp);
    const lp = sp - i;
    const e = gsap.parseEase('power2.inOut')(lp);
    const fr = k[i], to = k[i + 1];
    this.cam.position.lerpVectors(fr.p, to.p, e);
    const tgt = new THREE.Vector3().lerpVectors(fr.l, to.l, e);
    this.cam.lookAt(tgt);
    this.cam.fov = THREE.MathUtils.lerp(fr.f, to.f, e);
    this.cam.updateProjectionMatrix();
  }

  _scroll() {
    this.scrollTrack.style.height = '600vh';

    ScrollTrigger.create({
      trigger: this.scrollTrack,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        this.progress = self.progress;
        this.phase = Math.min(Math.floor(self.progress * 6), 5);
        this.sub = (self.progress * 6) % 1;

        this._camPath(self.progress);
        this.drops.phase(this.phase, this.sub);
        this.pp.update(self.progress, this.phase);

        if (self.progress > 0.05) {
          this.elNav.classList.add('scrolled');
          this.elProgress.classList.add('visible');
        } else {
          this.elNav.classList.remove('scrolled');
          this.elProgress.classList.remove('visible');
        }
        this.elBar.style.width = `${self.progress * 100}%`;

        if (self.progress > 0.03) this.elHint.classList.add('hidden');
        else this.elHint.classList.remove('hidden');

        this._showSlide();
      },
    });

    // Hero entrance after load
    setTimeout(() => {
      gsap.from('.hero-title span', { y: 55, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.25 });
      gsap.from('.hero-body', { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.7 });
      gsap.from('.hero-actions', { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 });
    }, 2800);

    // Stat counters
    document.querySelectorAll('.stat-num').forEach(el => {
      const tgt = parseFloat(el.dataset.target);
      const pct = el.dataset.target.includes('%');
      let ran = false;
      ScrollTrigger.create({
        trigger: el, start: 'top 85%',
        onEnter: () => {
          if (ran) return; ran = true;
          const o = { v: 0 };
          gsap.to(o, { v: tgt, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = pct ? o.v.toFixed(2) + '%' : Math.round(o.v).toLocaleString() + '+'; }
          });
        },
      });
    });
  }

  _showSlide() {
    const th = 0.5;
    this.slides.forEach(s => {
      const sc = parseInt(s.dataset.scene, 10);
      const st = sc / 6;
      const en = (sc + 1) / 6;
      const act = this.progress >= st - 0.07 && this.progress < en + 0.015;
      s.classList.toggle('active', act);
    });
  }

  _events() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth, h = window.innerHeight;
      this.cam.aspect = w / h; this.cam.updateProjectionMatrix();
      this.r.setSize(w, h); this.pp.resize(w, h);
    });
    document.getElementById('nav-logo')?.addEventListener('click', (e) => {
      e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  _loaded() {
    setTimeout(() => {
      this.elLoader.classList.add('done');
      this.loaded = true;
      gsap.from(this.elHint, { opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 0.2 });
    }, 2800);
  }

  _tick() {
    requestAnimationFrame(() => this._tick());
    const tm = performance.now();
    const t = tm * 0.001;

    this.drops.update(tm, this.progress);
    this.stars.update(tm, this.progress);
    this.haze.update(tm);

    if (this.bg) this.bg.material.uniforms.uTime.value = t;

    this.pt1.position.x = Math.sin(t * 0.28) * 4.5;
    this.pt1.position.z = Math.cos(t * 0.28) * 4.5;
    this.pt2.position.x = Math.sin(t * 0.18 + 2) * 3.5;
    this.pt2.position.z = Math.cos(t * 0.18 + 2) * 3.5;

    this.pp.render();
  }
}

new SuiMeshApp();
