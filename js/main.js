import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DropSystem } from './drops.js';
import { ParallaxSystem, VolumetricFog } from './particles.js';
import { PostProcessing } from './post.js';
import { DeepSpaceFragmentShader, DeepSpaceVertexShader } from './shaders.js';

gsap.registerPlugin(ScrollTrigger);

class SuiMeshExperience {
  constructor() {
    this.container = document.getElementById('webgl');
    this.loaderEl = document.getElementById('loader');
    this.navbar = document.getElementById('navbar');
    this.scrollIndicator = document.getElementById('scroll-indicator');
    this.progressBar = document.getElementById('progress-bar');
    this.progressFill = this.progressBar.querySelector('.progress-fill');
    this.uiTexts = document.querySelectorAll('#ui-layer .screen-text');
    this.scrollTrack = document.getElementById('scroll-track');
    this.isLoaded = false;
    this.scrollProgress = 0;
    this.phase = 0;
    this.phaseProgress = 0;
    this.time = 0;

    this._init();
  }

  _init() {
    this._initRenderer();
    this._initScene();
    this._initCamera();
    this._initLighting();
    this._initBackground();
    this._initSystems();
    this._initPostProcessing();
    this._initScroll();
    this._initEvents();
    this._animate();
    this._finishLoading();
  }

  // --- Renderer ---
  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x020205, 1);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
  }

  // --- Scene ---
  _initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020205, 0.025);
  }

  // --- Camera keyframes ---
  _initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 12);
    this.camera.lookAt(0, 0, 0);

    // Cinematic keyframes: [pos, lookAt, fov]
    this._keyframes = [
      { pos: new THREE.Vector3(0, 0, 11),  look: new THREE.Vector3(0, 0, 0),  fov: 45 },  // 0 Hero
      { pos: new THREE.Vector3(0, 0.5, 7), look: new THREE.Vector3(0, 0, 0),  fov: 40 },  // 1 Convergence dolly-in
      { pos: new THREE.Vector3(2, 1, 4),   look: new THREE.Vector3(0, 0, 0),  fov: 36 },  // 2 Convergence orbit
      { pos: new THREE.Vector3(0, 3, 2),   look: new THREE.Vector3(0, 0, 0),  fov: 58 },  // 3 Universe reveal (dolly-out + zoom)
      { pos: new THREE.Vector3(0, 5, 14),  look: new THREE.Vector3(0, 0, 0),  fov: 52 },  // 4 Universe wide
      { pos: new THREE.Vector3(-5, 2, 8),  look: new THREE.Vector3(2, 0, 0),  fov: 44 },  // 5 Flow tracking
      { pos: new THREE.Vector3(0, 8, 12),  look: new THREE.Vector3(0, -2, 0), fov: 50 },  // 6 Ocean flyover
      { pos: new THREE.Vector3(3, 2, 6),   look: new THREE.Vector3(0, 0, 0),  fov: 40 },  // 7 Protocol close
    ];
  }

  // --- Lighting ---
  _initLighting() {
    this.ambient = new THREE.AmbientLight(0x1a2a5a, 0.3);
    this.scene.add(this.ambient);

    this.keyLight = new THREE.DirectionalLight(0x3b82f6, 2.0);
    this.keyLight.position.set(5, 8, 5);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x60a5fa, 0.6);
    this.fillLight.position.set(-5, 3, 2);
    this.scene.add(this.fillLight);

    this.rimLight = new THREE.DirectionalLight(0x93c5fd, 1.2);
    this.rimLight.position.set(0, -5, -8);
    this.scene.add(this.rimLight);

    this.glow1 = new THREE.PointLight(0x3b82f6, 3, 20);
    this.glow1.position.set(3, 2, 3);
    this.scene.add(this.glow1);

    this.glow2 = new THREE.PointLight(0x60a5fa, 2, 15);
    this.glow2.position.set(-3, -2, -2);
    this.scene.add(this.glow2);
  }

  // --- Deep space background ---
  _initBackground() {
    const geo = new THREE.PlaneGeometry(300, 300);
    const mat = new THREE.ShaderMaterial({
      vertexShader: DeepSpaceVertexShader,
      fragmentShader: DeepSpaceFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0.01, 0.02, 0.06) },
        uColor2: { value: new THREE.Color(0.02, 0.05, 0.12) },
        uColor3: { value: new THREE.Color(0.01, 0.03, 0.08) },
        uStarDensity: { value: 0.003 },
      },
      depthWrite: false,
    });
    this.bg = new THREE.Mesh(geo, mat);
    this.bg.position.z = -60;
    this.scene.add(this.bg);
  }

  // --- Systems ---
  _initSystems() {
    this.drops = new DropSystem(this.scene);
    this.parallax = new ParallaxSystem(this.scene);
    this.fog = new VolumetricFog(this.scene);
  }

  // --- Post processing ---
  _initPostProcessing() {
    try {
      this.post = new PostProcessing(this.renderer, this.scene, this.camera);
    } catch (e) {
      console.warn('Post processing init failed, falling back:', e);
      this.post = null;
    }
  }

  // --- Cinematic camera interpolation ---
  _updateCamera(p) {
    const kf = this._keyframes;
    const segs = kf.length - 1;
    const sp = Math.min(p * segs, segs - 0.001);
    const idx = Math.floor(sp);
    const lp = sp - idx;
    const eased = gsap.parseEase('power2.inOut')(lp);

    const from = kf[idx];
    const to = kf[idx + 1];

    this.camera.position.lerpVectors(from.pos, to.pos, eased);
    const target = new THREE.Vector3().lerpVectors(from.look, to.look, eased);
    this.camera.lookAt(target);
    this.camera.fov = THREE.MathUtils.lerp(from.fov, to.fov, eased);
    this.camera.updateProjectionMatrix();
  }

  // --- Scroll ---
  _initScroll() {
    const totalPhases = 6;
    this.scrollTrack.style.height = `${totalPhases * 100}vh`;

    // Landscape ScrollTrigger for progress
    ScrollTrigger.create({
      trigger: this.scrollTrack,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        this.scrollProgress = self.progress;
        this.phase = Math.min(Math.floor(self.progress * totalPhases), totalPhases - 1);
        this.phaseProgress = (self.progress * totalPhases) % 1;

        this._updateCamera(self.progress);
        this.drops.setScenePhase(this.phase, this.phaseProgress);
        if (this.post) this.post.update(self.progress, this.phase);

        // UI
        if (self.progress > 0.05) {
          this.navbar.classList.add('scrolled');
          this.progressBar.classList.add('visible');
        } else {
          this.navbar.classList.remove('scrolled');
          this.progressBar.classList.remove('visible');
        }
        this.progressFill.style.width = `${self.progress * 100}%`;

        if (self.progress > 0.03) {
          this.scrollIndicator.classList.add('hidden');
        } else {
          this.scrollIndicator.classList.remove('hidden');
        }

        this._updateTextVisibility();
      },
    });

    // Hero entrance animations (after loader)
    setTimeout(() => {
      gsap.from('.title-line', { y: 60, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power3.out', delay: 0.3 });
      gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: 1.0, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-buttons', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.0 });
    }, 2600);

    // Stat counters
    document.querySelectorAll('.stat-number').forEach(el => {
      const raw = el.dataset.count;
      const target = parseFloat(raw);
      const isPct = raw.includes('%');
      let hasRun = false;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          if (hasRun) return;
          hasRun = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              if (isPct) el.textContent = obj.val.toFixed(2) + '%';
              else el.textContent = Math.round(obj.val).toLocaleString() + '+';
            },
          });
        },
      });
    });
  }

  _updateTextVisibility() {
    const threshold = 0.5; // center of phase
    this.uiTexts.forEach(el => {
      const s = parseInt(el.dataset.scene, 10);
      const start = s / 6;
      const end = (s + 1) / 6;
      const active = this.scrollProgress >= start - 0.08 && this.scrollProgress < end + 0.02;
      el.classList.toggle('active', active);
    });
  }

  // --- Events ---
  _initEvents() {
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if (this.post) this.post.resize(w, h);
    });

    document.getElementById('nav-logo')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Loading ---
  _finishLoading() {
    setTimeout(() => {
      this.loaderEl.classList.add('done');
      this.isLoaded = true;
      gsap.from(this.scrollIndicator, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
      });
    }, 2600);
  }

  // --- Render loop ---
  _animate() {
    requestAnimationFrame(() => this._animate());
    this.time = performance.now();
    const t = this.time * 0.001;

    this.drops.update(this.time, this.scrollProgress);
    this.parallax.update(this.time, this.scrollProgress, this.camera);
    this.fog.update(this.time);

    if (this.bg) this.bg.material.uniforms.uTime.value = t;

    // Animated lights
    this.glow1.position.x = Math.sin(t * 0.3) * 5;
    this.glow1.position.z = Math.cos(t * 0.3) * 5;
    this.glow2.position.x = Math.sin(t * 0.2 + 2) * 4;
    this.glow2.position.z = Math.cos(t * 0.2 + 2) * 4;

    if (this.post) {
      this.post.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

new SuiMeshExperience();
