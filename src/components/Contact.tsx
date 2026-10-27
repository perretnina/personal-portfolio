import "./Contact.css";

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-title"
      >
        <div className="contact-container">
          <h2 id="contact-title">
            Let's <span>Connect.</span>
          </h2>

          <a
            className="contact-email-button"
            href="mailto:nina.perret@etu.emse.fr"
          >
            Get in Touch
            <span aria-hidden="true">↗</span>
          </a>

          <div className="contact-socials">
            <a
              className="contact-social-card"
              href="https://www.linkedin.com/in/nina-perret-6b1b5832b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <span className="contact-social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <a
              className="contact-social-card"
              href="https://github.com/perretnina"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span className="contact-social-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      <footer className="contact-footer">
        © {new Date().getFullYear()} Nina Perret
      </footer>
    </>
  );
}