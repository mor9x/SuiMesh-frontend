"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    
        const cursorGlow = document.querySelector(".cursor-glow");
        const pageHeader = document.querySelector(".page-header");
        const heroSection = document.querySelector(".hero");
        const heroCopy = document.querySelector(".hero-copy");
        const heroStage = document.querySelector(".hero-stage");
        const heroButton = document.querySelector(".hero-button");
        const overviewSection = document.querySelector("#overview");
        const coordinationSection = document.querySelector("#coordination");
        const visionSection = document.querySelector("#vision");
        const overviewCards = [...document.querySelectorAll("#overview .feature-card")];
        const revealNodes = [...document.querySelectorAll("[data-reveal]")];
        let activeOverviewIndex = 0;
    
        function syncOverviewCards(centerIndex) {
          if (!overviewCards.length) {
            return;
          }
    
          activeOverviewIndex = (centerIndex + overviewCards.length) % overviewCards.length;
    
          overviewCards.forEach((card, index) => {
            const offset = (index - activeOverviewIndex + overviewCards.length) % overviewCards.length;
            const slot = offset === 0 ? "center" : offset === 1 ? "right" : "left";
            card.dataset.slot = slot;
            card.setAttribute("aria-pressed", String(slot === "center"));
          });
        }
    
        overviewCards.forEach((card, index) => {
          card.setAttribute("role", "button");
          card.setAttribute("tabindex", "0");
          card.addEventListener("click", () => syncOverviewCards(index));
          card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              syncOverviewCards(index);
            }
          });
        });
    
        syncOverviewCards(1);
    
        function clamp(value, min = 0, max = 1) {
          return Math.min(max, Math.max(min, value));
        }
    
        function computeSectionFade(section, startRatio = 0.5, endRatio = 0.92) {
          if (!section) {
            return 0;
          }
    
          const rect = section.getBoundingClientRect();
          const traveled = Math.max(0, -rect.top);
          const fadeStart = rect.height * startRatio;
          const fadeEnd = Math.max(fadeStart + 1, rect.height * endRatio);
          return clamp((traveled - fadeStart) / (fadeEnd - fadeStart));
        }
    
        function setupRevealObserver() {
          if (!revealNodes.length) {
            return;
          }
    
          revealNodes.forEach((node) => {
            const rect = node.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
              node.classList.add("is-visible");
            }
          });
    
          requestAnimationFrame(() => {
            document.documentElement.classList.add("reveal-ready");
          });
    
          if (!("IntersectionObserver" in window)) {
            revealNodes.forEach((node) => node.classList.add("is-visible"));
            return;
          }
    
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                return;
              }
    
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            });
          }, {
            threshold: 0.2,
            rootMargin: "0px 0px -8% 0px"
          });
    
          revealNodes.forEach((node) => observer.observe(node));
        }
    
        function syncScrollEffects() {
          const currentY = window.scrollY;
          const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
          const heroTravel = heroRect ? Math.max(0, -heroRect.top) : 0;
          const heroFadeStart = heroRect ? heroRect.height * 0.16 : 0;
          const heroFadeEnd = heroRect ? heroRect.height * 0.64 : 1;
          const fadeProgress = clamp((heroTravel - heroFadeStart) / Math.max(1, heroFadeEnd - heroFadeStart));
    
          if (heroCopy) {
            heroCopy.style.setProperty("--hero-copy-fade", fadeProgress.toFixed(3));
          }
    
          if (heroSection) {
            heroSection.style.setProperty("--hero-stage-fade", fadeProgress.toFixed(3));
          }
    
          if (heroStage) {
            heroStage.style.setProperty("--hero-stage-fade", fadeProgress.toFixed(3));
          }
    
          if (overviewSection) {
            overviewSection.style.setProperty("--section-fade", computeSectionFade(overviewSection, 0.48, 0.9).toFixed(3));
          }
    
          if (coordinationSection) {
            coordinationSection.style.setProperty("--section-fade", computeSectionFade(coordinationSection, 0.5, 0.9).toFixed(3));
          }
    
          if (visionSection) {
            visionSection.style.setProperty("--section-fade", computeSectionFade(visionSection, 0.82, 1.08).toFixed(3));
          }
    
          if (pageHeader) {
            const heroButtonRect = heroButton ? heroButton.getBoundingClientRect() : null;
            const heroButtonVisible = heroButtonRect
              ? heroButtonRect.bottom > 0 && heroButtonRect.top < window.innerHeight
              : currentY < 120;
            pageHeader.classList.toggle("is-hidden", !heroButtonVisible && currentY > 120);
          }
        }
    
        setupRevealObserver();
        syncScrollEffects();
        window.addEventListener("scroll", syncScrollEffects, { passive: true });
        window.addEventListener("resize", syncScrollEffects);
    
        window.addEventListener("pointermove", (event) => {
          document.body.classList.add("has-cursor-glow");
          cursorGlow.style.setProperty("--cursor-x", event.clientX + "px");
          cursorGlow.style.setProperty("--cursor-y", event.clientY + "px");
        }, { passive: true });
    
        window.addEventListener("pointerleave", () => {
          document.body.classList.remove("has-cursor-glow");
        });
      
  }, []);

  return (
    <>
  <div className="cursor-glow" aria-hidden="true"></div>
  <div className="page">
    <header className="page-header">
      <div className="header-grid">
        <a className="brand-lockup" href="/" aria-label="SuiMesh home">
          <img src="/assets/suimesh-lockup-hd.png" alt="SuiMesh" />
        </a>

        <nav className="main-nav" aria-label="Primary navigation">
          <a href="/explore">Explore Protocol</a>
          <a href="https://github.com/ArisLiWind/SuiMesh">Build</a>
          <a href="https://github.com/ArisLiWind/SuiMesh">Ecosystem</a>
        </nav>

        <div className="header-actions">
          <a className="ghost-button nav-cta" href="/explore">
            <span>Read the docs</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="hero-copy" data-reveal="true">
          <h1 className="headline-display">
            <span className="title-line" aria-label="Own the Context.">
              <span className="slogan-type" style={{"--duration": "1500ms", "--delay": "120ms"}}>
                <span className="slogan-word">Own</span>
                <span className="slogan-word">the</span>
                <span className="slogan-word">Context<span className="accent">.</span></span>
              </span>
            </span>
            <span className="title-line" aria-label="Verify the Action.">
              <span className="slogan-type" style={{"--duration": "1650ms", "--delay": "1260ms"}}>
                <span className="slogan-word">Verify</span>
                <span className="slogan-word">the</span>
                <span className="slogan-word">Action<span className="accent">.</span></span>
              </span>
            </span>
          </h1>

          <p className="subhead">
            SuiMesh is the communication protocol layer for AI Agents on Sui, built for auditable coordination, traceable execution, and onchain memory.
          </p>

          <div className="hero-actions">
            <a className="hero-button" href="https://github.com/ArisLiWind/SuiMesh">
              <span className="hero-button-label">
                <span>Start Building</span>
                <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </div>

        <div className="hero-stage" id="hero-stage" data-reveal="true">
          <div className="hero-art-shell">
            <img className="hero-flower" src="/assets/hero-flower-hd.png" alt="" />
          </div>
        </div>
      </section>

      <section className="section" id="overview">
        <div className="section-head" data-reveal="true">
          <div className="section-kicker glass">What problem does Mesh solve?</div>
          <h2 className="headline-display">
            <span className="headline-line">
              <span className="headline-type" style={{"--duration": "1450ms", "--delay": "60ms"}}>Let Your Agent Communicate</span>
            </span>
            <span className="headline-line">
              <span className="headline-type" style={{"--duration": "1520ms", "--delay": "760ms"}}>With Any Agent.</span>
            </span>
          </h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card glass" data-reveal="true">
            <div className="feature-icon" aria-hidden="true">
              <img className="feature-icon-image" src="/assets/overview-icon-1.png" alt="" />
            </div>
            <h3>Connect Any Agent</h3>
            <p>
              Connect your agent to agents, services, and systems across the world through a unified communication layer.
            </p>
          </article>

          <article className="feature-card glass" data-reveal="true">
            <div className="feature-icon" aria-hidden="true">
              <img className="feature-icon-image" src="/assets/overview-icon-2.png" alt="" />
            </div>
            <h3>Control Action</h3>
            <p>
              Review, approve, and enforce rules before an agent executes actions in the real world.
            </p>
          </article>

          <article className="feature-card glass" data-reveal="true">
            <div className="feature-icon" aria-hidden="true">
              <img className="feature-icon-image" src="/assets/overview-icon-3.png" alt="" />
            </div>
            <h3>Audit Everything</h3>
            <p>
              Every message, decision, tool call, and execution can be recorded and verified on-chain.
            </p>
          </article>
        </div>
      </section>

      <section className="section story-section" id="coordination">
        <div className="section-head" data-reveal="true">
          <div className="section-kicker glass">Coordination</div>
          <h2 className="story-title headline-display">
            <span className="headline-line">
              <span className="headline-type" style={{"--duration": "1320ms", "--delay": "40ms"}}>Coordination Starts Here.</span>
            </span>
          </h2>
        </div>

        <div className="story-panel" data-reveal="true">
          <div className="story-grid">
            <div className="story-copy">
              <p className="story-lead">
                SuiMesh provides a verifiable communication layer for autonomous agents.
              </p>

              <p className="story-conclusion">
                So agents can communicate with confidence across applications, organizations, and networks.
              </p>
            </div>

            <div className="story-points">
              <div className="story-point">Every interaction can be identified.</div>
              <div className="story-point">Every message can be traced.</div>
              <div className="story-point">Every action can be verified.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section vision-section" id="vision">
        <div className="vision-shell" data-reveal="true">
          <div className="vision-copy">
            <div className="vision-orb vision-orb-left" aria-hidden="true"></div>
            <div className="vision-orb vision-orb-right" aria-hidden="true"></div>

            <div className="vision-poster">
              <div className="vision-deco" aria-hidden="true">
                <div className="vision-deco-grid"></div>
                <svg className="vision-deco-svg" viewBox="0 0 1120 260" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="visionNetworkStroke" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="rgba(25,44,86,0)"></stop>
                      <stop offset="0.22" stopColor="rgba(66,92,145,0.5)"></stop>
                      <stop offset="0.5" stopColor="rgba(82,112,170,0.72)"></stop>
                      <stop offset="0.78" stopColor="rgba(66,92,145,0.5)"></stop>
                      <stop offset="1" stopColor="rgba(25,44,86,0)"></stop>
                    </linearGradient>
                    <linearGradient id="visionFlowStroke" x1="0" y1="0" x2="1120" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="rgba(63,99,174,0)"></stop>
                      <stop offset="0.5" stopColor="rgba(95,131,194,0.7)"></stop>
                      <stop offset="1" stopColor="rgba(63,99,174,0)"></stop>
                    </linearGradient>
                  </defs>
                  <polyline className="vision-deco-network" points="64,198 184,128 306,166 438,88 560,132 682,88 814,166 936,128 1056,198"></polyline>
                  <polyline className="vision-deco-network" points="184,128 248,52 438,88 560,28 682,88 872,52 936,128"></polyline>
                  <polyline className="vision-deco-network" points="306,166 438,216 560,132 682,216 814,166"></polyline>
                  <polyline className="vision-deco-polygon" points="560,28 682,88 636,216 484,216 438,88 560,28"></polyline>
                  <polyline className="vision-deco-polygon" points="248,52 438,88 306,166 184,128 248,52"></polyline>
                  <polyline className="vision-deco-polygon" points="872,52 936,128 814,166 682,88 872,52"></polyline>
                  <line className="vision-deco-link" x1="560" y1="132" x2="560" y2="28"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="682" y2="88"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="636" y2="216"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="484" y2="216"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="438" y2="88"></line>
                  <line className="vision-deco-link" x1="306" y1="166" x2="438" y2="88"></line>
                  <line className="vision-deco-link" x1="814" y1="166" x2="682" y2="88"></line>
                  <polyline className="vision-deco-flow" points="64,198 184,128 306,166 438,88 560,132 682,88 814,166 936,128 1056,198"></polyline>
                  <polyline className="vision-deco-flow" points="184,128 248,52 438,88 560,28 682,88 872,52 936,128"></polyline>
                  <circle className="vision-deco-node" cx="64" cy="198" r="2.4"></circle>
                  <circle className="vision-deco-node" cx="184" cy="128" r="3"></circle>
                  <circle className="vision-deco-node" cx="248" cy="52" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="306" cy="166" r="3"></circle>
                  <circle className="vision-deco-node" cx="438" cy="88" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="484" cy="216" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="560" cy="28" r="3"></circle>
                  <circle className="vision-deco-node" cx="560" cy="132" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="636" cy="216" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="682" cy="88" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="814" cy="166" r="3"></circle>
                  <circle className="vision-deco-node" cx="872" cy="52" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="936" cy="128" r="3"></circle>
                  <circle className="vision-deco-node" cx="1056" cy="198" r="2.4"></circle>
                </svg>
                <div className="vision-deco-line"></div>
              </div>

              <div className="vision-deco vision-deco-bottom" aria-hidden="true">
                <div className="vision-deco-grid"></div>
                <svg className="vision-deco-svg" viewBox="0 0 1120 260" preserveAspectRatio="none">
                  <polyline className="vision-deco-network" points="64,198 184,128 306,166 438,88 560,132 682,88 814,166 936,128 1056,198"></polyline>
                  <polyline className="vision-deco-network" points="184,128 248,52 438,88 560,28 682,88 872,52 936,128"></polyline>
                  <polyline className="vision-deco-network" points="306,166 438,216 560,132 682,216 814,166"></polyline>
                  <polyline className="vision-deco-polygon" points="560,28 682,88 636,216 484,216 438,88 560,28"></polyline>
                  <polyline className="vision-deco-polygon" points="248,52 438,88 306,166 184,128 248,52"></polyline>
                  <polyline className="vision-deco-polygon" points="872,52 936,128 814,166 682,88 872,52"></polyline>
                  <line className="vision-deco-link" x1="560" y1="132" x2="560" y2="28"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="682" y2="88"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="636" y2="216"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="484" y2="216"></line>
                  <line className="vision-deco-link" x1="560" y1="132" x2="438" y2="88"></line>
                  <line className="vision-deco-link" x1="306" y1="166" x2="438" y2="88"></line>
                  <line className="vision-deco-link" x1="814" y1="166" x2="682" y2="88"></line>
                  <polyline className="vision-deco-flow" points="64,198 184,128 306,166 438,88 560,132 682,88 814,166 936,128 1056,198"></polyline>
                  <polyline className="vision-deco-flow" points="184,128 248,52 438,88 560,28 682,88 872,52 936,128"></polyline>
                  <circle className="vision-deco-node" cx="64" cy="198" r="2.4"></circle>
                  <circle className="vision-deco-node" cx="184" cy="128" r="3"></circle>
                  <circle className="vision-deco-node" cx="248" cy="52" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="306" cy="166" r="3"></circle>
                  <circle className="vision-deco-node" cx="438" cy="88" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="484" cy="216" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="560" cy="28" r="3"></circle>
                  <circle className="vision-deco-node" cx="560" cy="132" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="636" cy="216" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="682" cy="88" r="3.2"></circle>
                  <circle className="vision-deco-node" cx="814" cy="166" r="3"></circle>
                  <circle className="vision-deco-node" cx="872" cy="52" r="2.8"></circle>
                  <circle className="vision-deco-node" cx="936" cy="128" r="3"></circle>
                  <circle className="vision-deco-node" cx="1056" cy="198" r="2.4"></circle>
                </svg>
              </div>

              <div className="vision-captions">
                <div className="vision-caption"><strong>The internet</strong> connected people.</div>
                <div className="vision-caption"><strong>Cloud platforms</strong> connected software.</div>
                <div className="vision-caption"><strong>SuiMesh</strong> connects autonomous agents.</div>
              </div>

              <h2 className="vision-title">
                <span className="headline-display">
                  <span className="headline-line">
                    <span className="headline-type" style={{"--duration": "1420ms", "--delay": "40ms"}}>The next generation Internet</span>
                  </span>
                  <span className="headline-line">
                    <span className="headline-type" style={{"--duration": "1500ms", "--delay": "620ms"}}>is a multi-agent cooperative Internet.</span>
                  </span>
                </span>
              </h2>

              <div className="vision-actions">
                <a className="hero-button" href="https://github.com/ArisLiWind/SuiMesh">
                  <span className="hero-button-label">
                    <span>Start Building</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span>SuiMesh</span>
        </div>

        <div className="footer-right">
          <div className="footer-links">
            <a className="footer-social" href="https://github.com/ArisLiWind/SuiMesh" aria-label="Discord">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.54 5.34A16.1 16.1 0 0 0 15.6 4.1a.06.06 0 0 0-.07.03c-.17.3-.36.69-.49 1a14.9 14.9 0 0 0-4.48 0 10.8 10.8 0 0 0-.5-1 .07.07 0 0 0-.07-.03 16.05 16.05 0 0 0-3.94 1.24.06.06 0 0 0-.03.03C3.53 9.1 2.84 12.75 3.18 16.35c0 .02.01.04.03.05a16.2 16.2 0 0 0 4.83 2.43.07.07 0 0 0 .08-.02c.37-.5.7-1.04.98-1.61a.07.07 0 0 0-.04-.1c-.53-.2-1.03-.44-1.52-.72a.07.07 0 0 1-.01-.12l.3-.23a.06.06 0 0 1 .07 0c3.18 1.45 6.62 1.45 9.76 0a.06.06 0 0 1 .07 0l.31.23a.07.07 0 0 1-.01.12c-.48.29-.99.53-1.52.72a.07.07 0 0 0-.04.1c.29.57.62 1.11.98 1.61a.07.07 0 0 0 .08.02 16.15 16.15 0 0 0 4.84-2.43.07.07 0 0 0 .03-.05c.41-4.16-.69-7.78-2.81-10.98a.06.06 0 0 0-.03-.03ZM9.72 14.17c-.96 0-1.75-.88-1.75-1.96 0-1.08.77-1.96 1.75-1.96.98 0 1.76.89 1.75 1.96 0 1.08-.77 1.96-1.75 1.96Zm6.15 0c-.96 0-1.75-.88-1.75-1.96 0-1.08.77-1.96 1.75-1.96.98 0 1.76.89 1.75 1.96 0 1.08-.77 1.96-1.75 1.96Z"></path>
              </svg>
            </a>
            <a className="footer-social" href="https://github.com/ArisLiWind/SuiMesh" aria-label="@SuiMesh">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.27l-4.9-7.38L5.56 22H2.45l7.24-8.28L1.6 2h6.43l4.43 6.8L18.9 2zM17.8 19.95h1.74L7.1 3.94H5.22z"></path>
              </svg>
            </a>
            <a className="footer-social" href="https://github.com/ArisLiWind/SuiMesh" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.98 3.5A2.48 2.48 0 1 1 5 8.46a2.48 2.48 0 0 1-.02-4.96zM3 9h4v12H3zM10 9h3.83v1.64h.06c.53-1.01 1.84-2.08 3.79-2.08 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.55c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94V21h-4z"></path>
              </svg>
            </a>
            <a className="footer-social" href="https://github.com/ArisLiWind/SuiMesh" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.24 1.84 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.77-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.24-3.22-.13-.31-.54-1.56.12-3.24 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.67 1.68.25 2.93.12 3.24.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.38.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58A12 12 0 0 0 12 .5z"></path>
              </svg>
            </a>
            <a className="footer-link" href="/explore">Docs</a>
            <a className="footer-link" href="/explore">Terms of Service</a>
          </div>
          <img className="founder-signature" src="/assets/founder-signature.png" alt="Aris and Ari signature" />
        </div>
      </div>
    </footer>
  </div>

  
    </>
  );
}
