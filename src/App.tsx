import { useEffect, useState } from "react";
import InteractiveTerminal from "./components/InteractiveTerminal";
import MyJourney from "./components/MyJourney";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import "./App.css";

const navigation = [
  { label: "Home", id: "home" },
  { label: "My Journey", id: "my-journey" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150;

      let currentSection = "home";

      for (const item of navigation) {
        const section = document.getElementById(item.id);

        if (section && section.getBoundingClientRect().top <= 150) {
          currentSection = item.id;
        }
      }

      // Ensure the last section becomes active at the bottom of the page
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (atBottom) {
        currentSection = "contact";
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

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
          {navigation.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${
                activeSection === item.id ? "active" : ""
              }`}
              aria-current={
                activeSection === item.id ? "location" : undefined
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* HOME */}

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
                Driven by curiosity and a passion for problem-solving, I'm{" "}
                <span style={{ color: "var(--pink)" }}>
                  seeking a 6-month international graduation internship
                </span >{" "}
                starting April 2027, with a particular interest in{" "}
                <span style={{ color: "var(--pink)" }}>
                  Artificial Intelligence
                </span>
                .
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

            <div className="hero-visual">
              <InteractiveTerminal />
            </div>
          </div>

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* MY JOURNEY */}

        <MyJourney />

        {/* EXPERIENCE */}

        <Experience />

        {/* PROJECTS */}

        <Projects />

        {/* SKILLS */}

        <Skills />

        {/* CONTACT */}

        <Contact />
      </main>
    </div>
  );
}

export default App;