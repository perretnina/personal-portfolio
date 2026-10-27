import { useState } from "react";
import FranceMap from "./FranceMap";
import "./MyJourney.css";

const chapters = [
  {
    place: "Brittany",
    shortPlace: "Brittany",
    title: "The First Spark",
    paragraphs: [
      "As a teenager, with no engineers in my family, I had a pretty stereotypical idea of the job: some geek spending all day coding and playing video games. Turns out, I was missing quite a lot.",
      "During COVID, I got curious and started researching the profession on my own. I was looking for a career that would keep me learning and challenged. When I discovered that engineering was about solving problems and understanding how things work, I started seeing myself as an engineer.",
      "I wanted to see what the job was actually like, so I spent part of my final high school holidays shadowing engineers at Krampouz.",
      "That settled it. Engineering was for me. And with my interest in chemistry at the time, I thought that might be the direction I'd take.",
    ],
  },
  {
    place: "Lyon",
    shortPlace: "Lyon",
    title: "Taking the Leap",
    paragraphs: [
      "At just 18, I left Brittany and moved over 1,000 km away from home to join the chemistry track at Lycée du Parc, in Lyon, for two years of intensive preparatory classes before engineering school.",
      "I loved chemistry in high school. But studying it at a higher level changed my perspective: I couldn't see myself building a career in it.",
      "So I chose an engineering school in a completely different field.",
    ],
  },
  {
    place: "Gardanne / Aix-en-Provence",
    shortPlace: "Gardanne / Aix",
    title: "A New Direction",
    paragraphs: [
      "Computer Science and Microelectronics at Mines Saint-Étienne. Two fields I knew almost nothing about.",
      "And honestly, learning to code was a real struggle at first.",
      "But I kept at it. I gradually became more comfortable with programming, discovered data and AI, and started applying what I'd learned through personal projects and an internship at EDF.",
      "More than anything, engineering school taught me how to learn. That's what allowed me to keep exploring AI beyond the classroom.",
    ],
    emphasis: 1,
  },
  {
    place: "Paris",
    shortPlace: "Paris",
    title: "Learning by Doing",
    paragraphs: [
      "At XRAYS Trading, I spent several months developing an AI-powered application from scratch to extract information from CVs and generate skills matrices.",
      "It was much more than training a model. I worked across the full application, from NLP and model fine-tuning to backend development, frontend integration and deployment.",
      "I learned a lot, made mistakes, and figured things out along the way. I also discovered what it takes to turn an AI idea into a working product while dealing with real-world constraints.",
      "That experience confirmed that AI was the field I wanted to pursue, at least for the start of my career. After all, who knows what the future holds?",
    ],
  },
  {
    place: "Beyond France",
    shortPlace: "Beyond France",
    title: "What's Next?",
    paragraphs: [
      "Moving away from home at 18 was my first big step outside my comfort zone. Since then, I've learned how much there is to gain from adapting to new environments.",
      "Now, I'm ready to take that experience beyond France. I want to discover a different way of working, immerse myself in another culture, and keep challenging myself, both professionally and personally.",
      "I'm looking for a 6-month international graduation internship in Artificial Intelligence, starting April 2027. And I'm not just looking for a temporary experience abroad: I'd love to build the next chapter of my career there, too.",
    ],
    emphasis: 2,
  },
];

export default function MyJourney() {
  const [activeStep, setActiveStep] = useState(0);

  const chapter = chapters[activeStep];

  function selectStep(index: number) {
    if (index >= 0 && index < chapters.length) {
      setActiveStep(index);
    }
  }

  return (
    <section id="my-journey" className="my-journey">
      <div className="journey-container">
        {/* HEADING */}

        <div className="journey-heading">
          <span className="journey-eyebrow">01 /</span>

          <h2>
            My <span>Journey.</span>
          </h2>
        </div>

        {/* HORIZONTAL TIMELINE */}

        <nav
          className="journey-timeline"
          aria-label="Journey chapters"
        >
          <div className="journey-timeline-line">
            <div
              className="journey-timeline-progress"
              style={{
                width: `${
                  (activeStep / (chapters.length - 1)) * 100
                }%`,
              }}
            />
          </div>

          {chapters.map((item, index) => {
            const active = index === activeStep;
            const completed = index < activeStep;

            return (
              <button
                key={item.place}
                type="button"
                className={`journey-step ${
                  active ? "is-active" : ""
                } ${completed ? "is-completed" : ""}`}
                onClick={() => selectStep(index)}
                aria-current={active ? "step" : undefined}
              >
                <span className="journey-step-dot" />

                <span className="journey-step-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="journey-step-place">
                  {item.shortPlace}
                </span>
              </button>
            );
          })}
        </nav>

        {/* MAIN CONTENT */}

        <div className="journey-layout">
          {/* LEFT: FRANCE MAP */}

          <div className="journey-map-column">
            <FranceMap
              activeStep={activeStep}
              onSelectStep={selectStep}
            />
          </div>

          {/* RIGHT: CHAPTER + ARROWS */}

          <div className="journey-reading-column">
            <button
              type="button"
              className="journey-arrow journey-arrow-prev"
              onClick={() => selectStep(activeStep - 1)}
              disabled={activeStep === 0}
              aria-label="Previous chapter"
            >
              ‹
            </button>

            <article className="journey-reading-card">
              <div
                key={activeStep}
                className="journey-reading-content"
              >
                <div className="journey-reading-header">
                  {/* CHAPTER NUMBER BADGE */}

                  <span className="journey-reading-number">
                    <span className="journey-number-current">
                      {String(activeStep + 1).padStart(2, "0")}
                    </span>

                    <span className="journey-number-separator">
                      /
                    </span>

                    <span className="journey-number-total">
                      {String(chapters.length).padStart(2, "0")}
                    </span>
                  </span>

                  {/* LOCATION BADGE */}

                  <span className="journey-reading-place">
                    {chapter.place}
                  </span>
                </div>

                <h3 className="journey-reading-title">
                  {chapter.title}
                </h3>

                <div className="journey-reading-text">
                  {chapter.paragraphs.map(
                    (paragraph, index) => (
                      <p
                        key={index}
                        className={
                          chapter.emphasis === index
                            ? "journey-emphasis"
                            : ""
                        }
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </div>
            </article>

            <button
              type="button"
              className="journey-arrow journey-arrow-next"
              onClick={() => selectStep(activeStep + 1)}
              disabled={activeStep === chapters.length - 1}
              aria-label="Next chapter"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}