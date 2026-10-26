import { useState } from "react";
import FranceMap from "./FranceMap";
import "./MyJourney.css";

const chapters = [
  {
    place: "Brittany",
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
    title: "Taking the Leap",
    paragraphs: [
      "At just 18, I left Brittany and moved over 1,000 km away from home to join the chemistry track at Lycée du Parc, in Lyon, for two years of intensive preparatory classes before engineering school.",

      "I loved chemistry in high school. But studying it at a higher level changed my perspective: I couldn't see myself building a career in it.",

      "So I chose an engineering school in a completely different field.",
    ],
  },
  {
    place: "Gardanne / Aix-en-Provence",
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
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  function selectStep(index: number) {
    if (index >= 0 && index < chapters.length) {
      setActiveStep(index);
      setExpandedStep(index);
    }
  }

  function toggleStep(index: number) {
    if (expandedStep === index) {
      setExpandedStep(null);
    } else {
      selectStep(index);
    }
  }

  return (
    <section id="my-journey" className="my-journey">
      <div className="journey-heading">
        <span className="journey-eyebrow">01 / MY STORY</span>

        <h2>
          My <span>Journey.</span>
        </h2>

        <p>
          From discovering engineering to finding my path in AI.
          Five chapters, and a story still being written.
        </p>
      </div>

      <div className="journey-layout">
        <div className="journey-map-column">
          <FranceMap
            activeStep={activeStep}
            onSelectStep={selectStep}
          />
        </div>

        <div className="journey-timeline-column">
          <div className="journey-timeline">
            {chapters.map((chapter, index) => {
              const active = index === expandedStep;
              const completed = index < activeStep;

              return (
                <article
                  key={chapter.place}
                  className={`journey-chapter ${
                    active ? "is-active" : ""
                  } ${completed ? "is-completed" : ""}`}
                >
                  <button
                    type="button"
                    className="journey-chapter-trigger"
                    onClick={() => toggleStep(index)}
                    aria-expanded={active}
                    aria-controls={`journey-panel-${index}`}
                  >
                    <span className="journey-chapter-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="journey-chapter-labels">
                      <span className="journey-chapter-place">
                        {chapter.place}
                      </span>

                      <span className="journey-chapter-title">
                        {chapter.title}
                      </span>
                    </span>

                    <span className="journey-chapter-toggle">
                      {active ? "−" : "+"}
                    </span>
                  </button>

                  {active && (
                    <div
                      id={`journey-panel-${index}`}
                      className="journey-chapter-content"
                    >
                      {chapter.paragraphs.map(
                        (paragraph, paragraphIndex) => (
                          <p
                            key={paragraphIndex}
                            className={
                              chapter.emphasis === paragraphIndex
                                ? "journey-emphasis"
                                : ""
                            }
                          >
                            {paragraph}
                          </p>
                        )
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="journey-navigation">
            <button
              type="button"
              onClick={() => selectStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              <span aria-hidden="true">←</span> Previous
            </button>

            <span className="journey-progress">
              {String(activeStep + 1).padStart(2, "0")}
              <span> / 05</span>
            </span>

            <button
              type="button"
              onClick={() => selectStep(activeStep + 1)}
              disabled={activeStep === chapters.length - 1}
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}