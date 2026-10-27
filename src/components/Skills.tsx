import "./Skills.css";

const technicalGroups = [
  {
    number: "01",
    title: "AI & Data",
    description: "Turning data into useful insights and intelligent applications.",
    skills: ["Python", "Machine Learning", "Deep Learning", "NLP", "Data Processing", "SQL", "Data Analysis"],
  },
  {
    number: "02",
    title: "Software Development",
    description: "Building reliable software, from interfaces to backend systems.",
    skills: ["Object-Oriented Programming", "C++", "Java", "TypeScript", "C", "HTML/CSS"],
  },
  {
    number: "03",
    title: "Embedded Systems & Hardware",
    description: "Connecting software with electronics and physical systems.",
    skills: ["STM32", "SystemVerilog", "FPGA", "LoRa"],
  },
  {
    number: "04",
    title: "Tools & Technologies",
    description: "Tools I use to develop, test, and deliver projects.",
    skills: ["Git", "Docker", "Kubernetes", "Linux", "PostgreSQL", "React", "FastAPI", "NestJS", "R", "Excel (MOS Expert)"],
  },
];

const softSkills = [
  "Analytical Mindset",
  "Autonomy",
  "Resourcefulness",
  "Attention to Detail",
  "Fast Learner",
];

const languages = [
  { name: "French", level: "Native", code: "FR" },
  { name: "English", level: "C1 · Fluent", code: "EN" },
  { name: "Spanish", level: "B1 · Intermediate", code: "ES" },
  { name: "Italian", level: "A2 · Elementary", code: "IT" },
];

export default function Skills() {
  return (
    <section id="skills" className="skills-section" aria-labelledby="skills-title">
      <div className="skills-container">
        <header className="skills-header">
          <span className="skills-eyebrow">WHAT I BRING TO THE TABLE</span>
          <h2 id="skills-title">My <span>Skills.</span></h2>
          <p>A combination of technical expertise, collaborative thinking, and an international mindset.</p>
        </header>

        <div className="skills-block" aria-labelledby="technical-skills-title">
          <div className="skills-block-heading">
            <span className="skills-block-index">01 /</span>
            <h3 id="technical-skills-title">Technical Skills</h3>
            <span className="skills-block-rule" aria-hidden="true" />
          </div>
          <div className="skills-technical-grid">
            {technicalGroups.map((group) => (
              <article className="skills-technical-card" key={group.title}>
                <div className="skills-card-top">
                  <span className="skills-card-number">{group.number}</span>
                  <span className="skills-card-symbol" aria-hidden="true">↗</span>
                </div>
                <h4>{group.title}</h4>
                <p>{group.description}</p>
                <div className="skills-tags">
                  {group.skills.map((skill) => <span className="skills-tag" key={skill}>{skill}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="skills-block" aria-labelledby="soft-skills-title">
          <div className="skills-block-heading">
            <span className="skills-block-index">02 /</span>
            <h3 id="soft-skills-title">Soft Skills</h3>
            <span className="skills-block-rule" aria-hidden="true" />
          </div>
          <div className="skills-soft-panel">
            <p>How I approach challenges and work with others.</p>
            <div className="skills-soft-list">
              {softSkills.map((skill, index) => (
                <span className="skills-soft-item" key={skill}>
                  <span className="skills-soft-star" aria-hidden="true">{index % 2 === 0 ? "✳" : "✦"}</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="skills-block" aria-labelledby="languages-title">
          <div className="skills-block-heading">
            <span className="skills-block-index">03 /</span>
            <h3 id="languages-title">Languages</h3>
            <span className="skills-block-rule" aria-hidden="true" />
          </div>
          <div className="skills-languages-grid">
            {languages.map((language) => (
              <div className="skills-language-card" key={language.code}>
                <span className="skills-language-code">{language.code}</span>
                <div className="skills-language-detail">
                  <span className="skills-language-name">{language.name}</span>
                  <span className="skills-language-level">{language.level}</span>
                </div>
                <span className="skills-language-arrow" aria-hidden="true">↗</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
