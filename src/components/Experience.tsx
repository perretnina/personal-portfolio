import { useState } from "react";
import "./Experience.css";

type ExperienceCategory = "professional" | "extracurricular";

type ExperienceEntry = {
  id: string;
  organization: string;
  role: string;
  dates: string;
  location: string;
  category: ExperienceCategory;
  summary: string;
  skills: string[];
  challenge: string[];
  work: string[];
  impact: string[];
};

const experiences: ExperienceEntry[] = [
  {
    id: "edf",
    organization: "EDF",
    role: "Data Engineering Intern",
    dates: "January 2025",
    location: "Aix-en-Provence, France",
    category: "professional",
    summary:
      "Automating soil settlement data processing and analysis for nuclear power plants.",
    skills: ["Python", "Data Processing", "Data Visualization", "Automation"],
    challenge: [
      "At EDF, engineers needed to analyze soil settlement measurements collected over several decades from multiple nuclear power plants.",
      "These analyses were previously performed manually using Excel, making the process particularly time-consuming when dealing with large datasets.",
      "The goal was to automate this workflow, from preparing the raw data to analyzing and visualizing the results.",
    ],
    work: [
      "Building on an existing Python tool developed by my internship supervisor, I worked on two key aspects of the application: preprocessing and postprocessing.",
      "On the preprocessing side, I improved the preparation and processing of more than 50,000 measurements collected from 10 nuclear power plants.",
      "On the postprocessing side, I developed automated visualizations and analysis features, including the extrapolation of soil settlement trends over periods extending more than 80 years into the future.",
    ],
    impact: [
      "The tool dramatically reduced the time required to perform analyses that had previously involved extensive manual work in Excel.",
      "By automating repetitive tasks, it allowed engineers to process large datasets much faster and spend more time interpreting the results.",
      "Beyond the immediate time savings, the tool was designed to support engineering analyses for years to come, with an expected useful life of at least a decade.",
      "This first technical internship showed me how programming and data analysis can deliver both immediate efficiency gains and lasting value in an industrial environment.",
    ],
  },
  {
    id: "fei",
    organization: "Forum Entreprises ISMIN",
    role: "Head of Corporate Relations",
    dates: "April 2025 – March 2026",
    location: "Aix-en-Provence, France",
    category: "extracurricular",
    summary:
      "Coordinating corporate partnerships and a team of 7 students for a major engineering career fair.",
    skills: ["Team Coordination", "Corporate Relations", "Project Management"],
    challenge: [
      "Every year, the Forum Entreprises ISMIN brings together engineering students and companies, creating opportunities for networking, internships, and career development.",
      "Organizing such an event requires months of preparation, particularly when it comes to attracting companies, maintaining professional relationships, and coordinating everyone involved.",
      "As Head of Corporate Relations, my responsibility was to manage this aspect of the event and help ensure its success.",
    ],
    work: [
      "I coordinated a team of 7 students responsible for corporate outreach and partnerships.",
      "My role involved identifying potential partners, contacting companies, following up with representatives, and maintaining relationships throughout the preparation of the event.",
      "I also contributed to event-day operations at the Aix-en-Provence Congress Center, working alongside the organizing team to welcome companies and ensure everything ran smoothly.",
    ],
    impact: [
      "The event brought together 43 companies and over 400 students, providing opportunities for students to connect directly with potential employers.",
      "Beyond the event itself, this experience strengthened my ability to coordinate a team, manage professional relationships, and work toward a shared goal over several months.",
      "It also taught me how much effective communication, organization, and teamwork matter when bringing a large-scale project to life.",
    ],
  },
  {
    id: "xrays",
    organization: "XRAYS Trading",
    role: "AI Development Intern",
    dates: "April – August 2026",
    location: "Paris, France",
    category: "professional",
    summary:
      "Developing an AI-powered application to automate CV analysis and skills matrix generation.",
    skills: ["Python", "NLP", "Machine Learning", "Full-Stack Development"],
    challenge: [
      "At XRAYS Trading, candidates' technical skills were organized into structured skills matrices. However, completing these matrices required a manual process involving forms sent to candidates and several days of back-and-forth communication.",
      "The goal was to automate this existing workflow using AI, while preserving the format of the skills matrices.",
    ],
    work: [
      "I developed an AI-powered application from scratch to extract relevant information from CVs and automatically populate the existing skills matrices.",
      "I worked across the entire development process, from NLP and model fine-tuning to backend development, frontend integration, and deployment.",
      "I tested the application on real CVs, refined the extraction process, and documented the remaining limitations and potential improvements to support future development.",
    ],
    impact: [
      "The application reduced a process that previously took several days to less than a minute.",
      "While further improvements are needed, the project demonstrated how AI could significantly streamline an existing business workflow.",
      "It also gave me hands-on experience in developing an end-to-end AI application, balancing technical performance with real-world constraints.",
    ],
  }
];

function ExperienceDetails({ experience }: { experience: ExperienceEntry }) {
  const sections = [
    { title: "The Challenge", paragraphs: experience.challenge },
    { title: "What I Did", paragraphs: experience.work },
    { title: "The Impact", paragraphs: experience.impact },
  ];

  return (
    <div className="experience-details">
      {sections.map((section) => (
        <div className="experience-detail-section" key={section.title}>
          <h4>{section.title}</h4>

          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggleExperience(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <header className="experience-heading">
          <span className="experience-eyebrow">02 / EXPERIENCE</span>

          <h2>
            My <span>Experience.</span>
          </h2>

          <p>
            From technical challenges to team coordination, each experience
            has shaped the way I approach problems and work with others.
          </p>
        </header>

        <div className="experience-timeline">
          {experiences.map((experience, index) => {
            const expanded = expandedId === experience.id;
            const extracurricular =
              experience.category === "extracurricular";

            return (
              <article
                key={experience.id}
                className={`experience-item ${
                  extracurricular ? "experience-item-pink" : ""
                } ${expanded ? "experience-item-expanded" : ""}`}
              >
                <div className="experience-timeline-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>

                <div className="experience-card">
                  <button
                    type="button"
                    className="experience-card-trigger"
                    onClick={() => toggleExperience(experience.id)}
                    aria-expanded={expanded}
                    aria-controls={`experience-details-${experience.id}`}
                  >
                    <span className="experience-card-main">
                      <span className="experience-card-meta">
                        <span
                          className={`experience-category ${
                            extracurricular
                              ? "experience-category-pink"
                              : "experience-category-cyan"
                          }`}
                        >
                          {extracurricular
                            ? "BEYOND THE CLASSROOM"
                            : "PROFESSIONAL EXPERIENCE"}
                        </span>

                        <span className="experience-date">
                          {experience.dates}
                        </span>
                      </span>

                      <span className="experience-organization">
                        {experience.organization}
                      </span>

                      <span className="experience-role">
                        {experience.role}
                      </span>

                      <span className="experience-location">
                        {experience.location}
                      </span>

                      <span className="experience-summary">
                        {experience.summary}
                      </span>
                    </span>

                    <span className="experience-toggle" aria-hidden="true">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>

                  <div className="experience-skills">
                    {experience.skills.map((skill) => (
                      <span className="experience-skill" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>

                  {expanded && (
                    <div
                      id={`experience-details-${experience.id}`}
                      className="experience-expanded-content"
                    >
                      <ExperienceDetails experience={experience} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}