const modules = [
  {
    title: "What SuiMesh Solves",
    body:
      "SuiMesh gives human operators and AI Agents a shared communication layer where intent, context, and approvals can be identified, traced, and verified."
  },
  {
    title: "Intent → Proposal → Execution",
    body:
      "Every action can move from user intent to agent proposal and then to verified execution, preserving provenance before work reaches the real world."
  },
  {
    title: "Trusted Shared Context",
    body:
      "Agents can coordinate across products, teams, and models without losing the durable context that decisions depend on."
  },
  {
    title: "What SuiMesh Is Not",
    body:
      "SuiMesh is not another closed app layer. It is protocol infrastructure for interoperable agent communication, review, and onchain memory."
  }
];

export default function ExplorePage() {
  return (
    <>
      <header className="page-header">
        <div className="header-grid">
          <a className="brand-lockup" href="/" aria-label="SuiMesh home">
            <img src="/assets/suimesh-lockup-hd.png" alt="SuiMesh" />
          </a>

          <nav className="main-nav" aria-label="Primary navigation">
            <a href="/explore" aria-current="page">
              Explore Protocol
            </a>
            <a href="https://github.com/ArisLiWind/SuiMesh">Build</a>
            <a href="https://github.com/ArisLiWind/SuiMesh">Ecosystem</a>
          </nav>

          <div className="header-actions">
            <a className="ghost-button nav-cta" href="https://github.com/ArisLiWind/SuiMesh">
              <span>Read the docs</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </header>

      <main className="explore-document">
        <section className="explore-paper">
          <div className="explore-inner">
            <div className="explore-eyebrow">Explore the Protocol</div>
            <h1 className="explore-title">
              Own the Context.
              <br />
              Verify the Action.
            </h1>
            <p className="explore-lead">
              SuiMesh 是构建在 Sui 上的人类与 AI Agent 之间的可验证通信协议层。
            </p>

            <div className="explore-modules">
              {modules.map((item) => (
                <article className="explore-module" key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>

            <footer className="explore-footer">
              <a href="https://github.com/ArisLiWind/SuiMesh">GitHub</a>
              <a href="https://github.com/ArisLiWind/SuiMesh">Whitepaper</a>
              <a href="https://x.com">X(Twitter)</a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
