import { useState } from "react";
import "./App.css";

const navigation = [
  "Home",
  "My Journey",
  "Experience",
  "Projects",
  "Skills",
  "Contact",
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="portfolio">
      <header className="navbar">
        <a href="#home" className="logo" aria-label="Nina — Home">
          NINA<span>.</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navigation.map((item) =>
            item === "Home" ? (
              <a
                key={item}
                href="#home"
                className="nav-link active"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ) : (
              <span
                key={item}
                className="nav-link nav-upcoming"
                title="Section coming soon"
              >
                {item}
              </span>
            )
          )}
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-background" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-text">
              <div className="eyebrow">
                <span className="status-dot" />
                ENGINEERING STUDENT · MINES SAINT-ÉTIENNE
              </div>

              <h1>
                <span className="first-name">NINA</span>
                <span className="last-name">Perret</span>
              </h1>

              <div className="hero-subtitle">
                Computer Science <span>·</span> Data <span>·</span> AI
              </div>

              <p className="hero-description">
                Final-year engineering student at Mines Saint-Étienne, with
                hands-on experience in AI development and data engineering.
              </p>

              <p className="hero-description">
                Driven by curiosity and a passion for problem-solving, I'm
                seeking a 6-month international graduation internship starting
                April 2027, with a particular interest in Artificial
                Intelligence.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore My Work
                  <span aria-hidden="true">↗</span>
                </a>

                <a
                  className="button button-secondary"
                  href="/cv.pdf"
                  download="Nina_Perret_CV.pdf"
                >
                  Download CV
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="visual-glow visual-glow-pink" />
              <div className="visual-glow visual-glow-cyan" />

              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />

              <div className="core">
                <div className="core-inner">
                  <span className="core-symbol">N.</span>
                </div>
              </div>

              <div className="floating-label label-ai">AI / ML</div>
              <div className="floating-label label-data">DATA</div>
              <div className="floating-label label-code">01 / 00</div>

              <div className="visual-node node-one" />
              <div className="visual-node node-two" />
              <div className="visual-node node-three" />
            </div>
          </div>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* Les prochaines sections seront ajoutées après validation du rendu Home. */}
      </main>
    </div>
  );
}

export default App;