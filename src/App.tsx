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

  // =========================================
  // NAVIGATION
  // =========================================

  function scrollToSection(id: string) {
    setMenuOpen(false);

    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const section = document.getElementById(id);

    if (!section) return;

    const navbar = document.querySelector(".navbar");

    const navbarHeight =
      navbar?.getBoundingClientRect().height ?? 0;

    const targetPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight -
      20;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  }

  // =========================================
  // ACTIVE SECTION TRACKING
  // =========================================

  useEffect(() => {
    const updateActiveSection = () => {
      const navbar = document.querySelector(".navbar");

      const navbarHeight =
        navbar?.getBoundingClientRect().height ?? 0;

      const activationThreshold = navbarHeight + 30;

      let currentSection = "home";

      for (const item of navigation) {
        const section = document.getElementById(item.id);

        if (
          section &&
          section.getBoundingClientRect().top <=
            activationThreshold
        ) {
          currentSection = item.id;
        }
      }

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
      window.removeEventListener(
        "scroll",
        updateActiveSection
      );

      window.removeEventListener(
        "resize",
        updateActiveSection
      );
    };
  }, []);

  return (
    <div className="portfolio">
      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="navbar">
        <div className="navbar-brand">
          <a
            href="#home"
            className="logo"
            aria-label="Nina — Home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("home");
            }}
          >
            NINA<span>.</span>
          </a>

          <span
            className="navbar-divider"
            aria-hidden="true"
          />

          <span className="navbar-specialties">
            Computer Science <span>·</span> Data{" "}
            <span>·</span> AI
          </span>
        </div>

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
                activeSection === item.id
                  ? "location"
                  : undefined
              }
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* =====================================
            HOME
        ===================================== */}

        <section id="home" className="hero">
          <div
            className="hero-background"
            aria-hidden="true"
          />

          <div className="hero-content">
            {/* LEFT: INTRODUCTION */}

            <div className="hero-text">
              <div className="eyebrow">
                <span className="status-dot" />
                ENGINEERING STUDENT · MINES SAINT-ÉTIENNE
              </div>

              <h1>
                <span className="first-name">
                  NINA
                </span>

                <span className="last-name">
                  Perret
                </span>
              </h1>

              {/* INTRODUCTION */}

              <div className="hero-introduction">
                <p className="hero-description">
                  Final-year engineering student at Mines
                  Saint-Étienne, with hands-on experience in
                  AI development and data engineering.
                </p>

                {/* INTERNSHIP OPPORTUNITY */}

                <div className="hero-opportunity">
                  <span className="hero-opportunity-label">
                    <span className="hero-opportunity-dot" />
                    SEEKING
                  </span>

                  <p className="hero-opportunity-title">
                    6-month international AI internship
                  </p>

                  <span className="hero-opportunity-date">
                    Starting April 2027
                  </span>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="hero-actions">
                <a
                  className="button button-primary"
                  href="#projects"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("projects");
                  }}
                >
                  Projects
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

            {/* RIGHT: INTERACTIVE TERMINAL */}

            <div className="hero-visual">
              <InteractiveTerminal />
            </div>
          </div>

          {/* SCROLL INDICATOR */}

          <div className="scroll-indicator">
            <span>SCROLL TO EXPLORE</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* =====================================
            MY JOURNEY
        ===================================== */}

        <MyJourney />

        {/* =====================================
            EXPERIENCE
        ===================================== */}

        <Experience />

        {/* =====================================
            PROJECTS
        ===================================== */}

        <Projects />

        {/* =====================================
            SKILLS
        ===================================== */}

        <Skills />

        {/* =====================================
            CONTACT
        ===================================== */}

        <Contact />
      </main>
    </div>
  );
}

export default App;