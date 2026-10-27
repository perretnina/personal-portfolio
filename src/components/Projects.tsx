import { useEffect, useRef, useState } from "react";
import "./Projects.css";

type Section = { heading: string; paragraphs: string[] };
type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  sections: Section[];
  github?: string;
};

const projects: Project[] = [
  {
    title: "ETFolio", category: "Data & AI",
    description: "A personal project combining my interest in investing with data engineering, financial analysis, and investment strategy backtesting.",
    technologies: ["Data Engineering", "Data Analysis", "Financial Markets", "Backtesting", "Python"],
    sections: [
      { heading: "The Challenge", paragraphs: ["I wanted to combine my interest in investing with data analysis to better understand an ETF's historical performance and explore different investment strategies, without treating financial indicators as reliable predictions."] },
      { heading: "What I Built", paragraphs: ["I built a Python ETL pipeline to collect, clean, and combine historical ETF data from different exchanges.", "I developed a Streamlit dashboard with interactive Plotly charts and technical indicators, including moving averages, RSI, MACD, and Bollinger Bands.", "I also designed a backtesting module to compare investment strategies, with machine learning as a potential future extension."] },
    ],
  },
  {
    title: "Junior-Entreprise Web App", category: "Software Engineering",
    description: "A full-stack web application developed as part of a university project, simulating the management of a Junior-Enterprise's missions, contributors, and corporate prospects.",
    technologies: ["TypeScript", "React", "NestJS", "PostgreSQL", "Prisma", "Docker"],
    github: "https://github.com/perretnina/cs_junior_entreprise_Perret_Tahar",
    sections: [
      { heading: "The Challenge", paragraphs: ["In a university project carried out in pairs, we worked on a fictional Junior-Enterprise scenario: keeping mission, contributor, and prospect information accessible across successive management teams."] },
      { heading: "What I Built", paragraphs: ["We developed a full-stack application with a React frontend, a NestJS API, and a PostgreSQL database managed with Prisma.", "The application includes mission tracking, contributor and prospect management, and a KPI dashboard.", "We implemented JWT authentication and role-based access control, ensuring contributors only access their own missions and never receive confidential pricing information.", "We containerized the application with Docker for reproducible setup and testing."] },
    ],
  },
  {
    title: "SafeRoad", category: "Entrepreneurship",
    description: "A university entrepreneurship project focused on designing a safety solution for outdoor activities, from the initial concept to a complete business plan and go-to-market strategy.",
    technologies: ["Business Planning", "Market Research", "Financial Forecasting", "Marketing", "Product Design"],
    sections: [
      { heading: "The Challenge", paragraphs: ["We explored how to make outdoor activities such as walking, running, and cycling safer through a dedicated product concept."] },
      { heading: "What I Did", paragraphs: ["We developed the SafeRoad concept and evaluated its market potential through competitor analysis and market research.", "We defined a business model, pricing strategy, financial forecasts, and a go-to-market approach, supported by product mockups.", "The project focused on entrepreneurial planning and product design rather than building a working application."] },
    ],
  },
  {
    title: "Supermarket Evacuation Simulation", category: "Simulation & Research",
    description: "An agent-based simulation exploring how emergency exit configurations, crowd congestion, and fire propagation affect supermarket evacuation efficiency.",
    technologies: ["AnyLogic", "Java", "Agent-Based Modeling", "Simulation"],
    github: "https://github.com/perretnina/supermarket-evacuation-simulation",
    sections: [
      { heading: "The Challenge", paragraphs: ["We investigated how the placement, number, and width of emergency exits influence evacuation efficiency in a supermarket during a fire."] },
      { heading: "What I Built", paragraphs: ["We created an agent-based simulation in AnyLogic, modeling individual movement, reaction times, fire and smoke propagation, and congestion around exits.", "We compared three exit configurations and measured evacuation times, exposure to danger, and crowd distribution.", "We also introduced a hysteresis rule to prevent pedestrians from repeatedly switching between exits when congestion changed."] },
      { heading: "The Results", paragraphs: ["Our simulations suggested that the number and distribution of exits had a greater impact on evacuation performance than total exit width alone."] },
    ],
  },
  {
    title: "ASCON Hardware Implementation", category: "Embedded & Hardware",
    description: "A hardware implementation of the ASCON authenticated encryption algorithm, combining RTL design, finite state machine control, and functional verification.",
    technologies: ["SystemVerilog", "RTL", "ASCON", "ModelSim", "Cryptography"],
    github: "https://github.com/perretnina/ascon-hardware-implementation",
    sections: [
      { heading: "The Challenge", paragraphs: ["The objective was to translate the ASCON authenticated encryption algorithm into a hardware architecture described at register-transfer level."] },
      { heading: "What I Built", paragraphs: ["I implemented the ASCON permutation in SystemVerilog, including nonlinear substitution, linear diffusion, and round constants.", "I designed the control logic around finite state machines, registers, and counters, and created testbenches to verify functional behavior in ModelSim."] },
    ],
  },
  {
    title: "LoRa IoT Monitoring System", category: "Embedded & Hardware",
    description: "An IoT system using STM32 and LoRa to collect and monitor pressure, temperature, and humidity data in real time.",
    technologies: ["STM32", "Embedded C", "LoRa", "Datacake"],
    sections: [
      { heading: "The Challenge", paragraphs: ["The project aimed to acquire environmental measurements from sensors and make them available remotely."] },
      { heading: "What I Built", paragraphs: ["We programmed an STM32 microcontroller in C to collect pressure, temperature, and humidity measurements.", "We transmitted the data over LoRa and configured a Datacake dashboard to monitor the readings in real time."] },
    ],
  },
  {
    title: "Bluetooth-Controlled Robot", category: "Embedded & Hardware",
    description: "An STM32-based mobile robot controlled via Bluetooth, combining embedded programming, wireless communication, and motor control.",
    technologies: ["STM32", "Embedded C", "Bluetooth", "UART", "PWM"],
    sections: [
      { heading: "The Challenge", paragraphs: ["The goal was to control a mobile robot wirelessly using commands sent from a smartphone."] },
      { heading: "What I Built", paragraphs: ["We programmed an STM32 microcontroller in C to receive Bluetooth commands over UART.", "We used PWM, timers, and interrupts to control the motors and implement basic movements, including moving forward, turning, and stopping."] },
    ],
  },
  {
    title: "Non-Newtonian Fluids", category: "Simulation & Research",
    description: "A two-year experimental research project investigating the impact absorption and durability of shear-thickening fluids for bicycle helmet applications.",
    technologies: ["Python", "Experimental Physics", "Electronics", "Chemistry", "Data Analysis"],
    github: "https://github.com/perretnina/supervised-research-project",
    sections: [
      { heading: "The Challenge", paragraphs: ["During my two years in preparatory classes, I worked with a partner to investigate to what extent shear-thickening fluids could improve bicycle helmet protection.", "Unlike conventional fluids, shear-thickening fluids become more viscous under increased shear stress, making them interesting candidates for impact protection.", "We focused on a water-cornstarch mixture to evaluate two key properties: its ability to absorb impacts and its durability over time."] },
      { heading: "What I Did", paragraphs: ["We designed and built an experimental setup from scratch, using a piezoelectric sensor, a charge amplifier, and an oscilloscope to measure impact forces under different conditions.", "We compared measurements obtained without a protective material, with water, and with the non-Newtonian mixture. These comparisons allowed us to establish a baseline and determine whether the mixture offered better impact absorption than a conventional fluid. We used Python to analyze the results and calculate measurement uncertainties.", "We also investigated the mixture's durability by studying its fermentation over time. Since fermentation can alter the mixture's properties, we conducted chemical titrations to measure ethanol production as an indicator of this process. We then used Python and Monte Carlo simulations to analyze the experimental data."] },
      { heading: "The Results", paragraphs: ["Our experiments highlighted a major limitation of the water-cornstarch mixture: its tendency to ferment over time, compromising its long-term stability.", "While shear-thickening fluids remain promising for impact protection, our findings suggest that this particular mixture would not be suitable for direct use in bicycle helmets without addressing its durability issues."] },
    ],
  },
  {
    title: "Capacitive Sensor & PCB Prototyping", category: "Embedded & Hardware",
    description: "A complete electronics prototyping project, from PCB design and assembly to the development of a capacitive proximity sensor and an STM32-controlled device.",
    technologies: ["KiCad", "STM32", "Embedded C", "PCB Design", "Soldering", "PWM"],
    sections: [
      { heading: "The Challenge", paragraphs: ["As part of a university electronics project carried out in pairs, we designed and built a functional prototype integrating a custom PCB.", "We developed a physical version of Forest, a productivity app designed to help users stay focused and avoid smartphone distractions.", "Our idea was to create a phone storage box equipped with a capacitive proximity sensor. When the user reaches for their phone, a small character raises a stop sign, encouraging them to stay focused."] },
      { heading: "What I Built", paragraphs: ["We designed and built a capacitive signal conditioning circuit, converting changes in capacitance into a square-wave signal whose frequency varies with the distance between the user's hand and a copper electrode.", "We designed the circuit schematic and PCB layout using KiCad, assembled the board by soldering its components, and performed electrical tests to verify its operation.", "We also simulated the circuit using PartQuest and studied the relationship between capacitance and distance using COMSOL, comparing theoretical predictions with experimental measurements.", "I programmed an STM32 microcontroller in C to measure the signal frequency, calculate the corresponding capacitance, and control a servomotor using PWM.", "Finally, we assembled the electronic components into a physical prototype, combining the capacitive sensor, microcontroller, and motorized character."] },
      { heading: "The Results", paragraphs: ["We successfully developed a working prototype: as the user's hand approaches the phone, the character progressively raises its stop sign.", "The main limitation was the sensor's short detection range, approximately 3 cm, which restricted how early the device could react."] },
    ],
  },
  {
    title: "Secure ECG Processing on FPGA", category: "Embedded & Hardware",
    description: "A hardware-software system combining FPGA-based encryption, serial communication, and real-time ECG signal visualization.",
    technologies: ["SystemVerilog", "FPGA", "Vivado", "Python", "UART", "ASCON-128"],
    sections: [
      { heading: "The Challenge", paragraphs: ["As part of a university project carried out in pairs, we developed a system to securely process and visualize electrocardiogram (ECG) signals.", "Our goal was to combine FPGA-based encryption with a Python application capable of communicating with the hardware and analyzing ECG data in real time."] },
      { heading: "What I Built", paragraphs: ["To work efficiently, we divided the project into two complementary parts: I focused on the FPGA implementation, while my project partner handled the Python-based acquisition and visualization system.", "I developed the SystemVerilog architecture integrating ASCON-128 encryption, UART communication, memory management, and finite state machines to coordinate data processing.", "I used Vivado to synthesize the design, programmed the FPGA board, and performed simulations and hardware tests to validate its operation.", "Meanwhile, my project partner developed the Python interface for communicating with the FPGA, transmitting ECG data, and visualizing cardiac signals in real time.", "We then worked on integrating both components into a hardware-software pipeline."] },
      { heading: "The Results", paragraphs: ["We developed and tested an FPGA–Python prototype, successfully validating the encryption and decryption process: the decrypted ECG signal matched the original data.", "While the complete system was not fully finalized, we implemented its main components and identified remaining challenges, particularly in the acquisition and filtering of real ECG signals."] },
    ],
  },
];

const categories = ["All", ...new Set(projects.map((project) => project.category))];

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalScrollKey, setModalScrollKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const visibleProjects = projects.filter((project) => category === "All" || project.category === category);
  const selectedIndex = selected ? visibleProjects.findIndex((project) => project.title === selected.title) : -1;

  const navigate = (direction: -1 | 1) => {
    if (selectedIndex < 0) return;
    const next = visibleProjects[selectedIndex + direction];
    if (next) {
      setSelected(next);
      setModalScrollKey((value) => value + 1);
    }
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowLeft") navigate(-1);
      if (event.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, category]);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-heading">
          <span className="projects-eyebrow">03 /</span>
          <h2>My <span>Projects.</span></h2>
          <p>A selection of projects spanning AI, software engineering, embedded systems, and research.</p>
        </div>

        <div className="projects-filters" aria-label="Filter projects by category">
          {categories.map((item) => (
            <button key={item} type="button" className={`projects-filter ${category === item ? "is-active" : ""}`} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>

        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <button type="button" key={project.title} className="project-card" onClick={() => setSelected(project)} aria-label={`Read more about ${project.title}`}>
              <span className="project-card-top"><span className="project-category">{project.category}</span><span className="project-arrow" aria-hidden="true">↗</span></span>
              <span className="project-card-body"><strong>{project.title}</strong><span className="project-description">{project.description}</span></span>
              <span className="project-card-footer">{project.technologies.slice(0, 3).map((tech) => <span className="project-tech" key={tech}>{tech}</span>)}</span>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="project-modal-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          {selectedIndex > 0 && (
            <button type="button" className="project-modal-nav project-modal-prev" onClick={() => navigate(-1)} aria-label="Previous project">‹</button>
          )}
          <div key={modalScrollKey} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title"
            onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchStartX.current === null) return;
              const difference = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
              if (Math.abs(difference) > 70) navigate(difference < 0 ? 1 : -1);
              touchStartX.current = null;
            }}
          >
            <button className="project-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close project details">×</button>
            <span className="projects-eyebrow">{selected.category}</span>
            <h3 id="project-modal-title">{selected.title}</h3>
            <p className="project-modal-intro">{selected.description}</p>
            <div className="project-modal-tech">{selected.technologies.map((tech) => <span className="project-tech" key={tech}>{tech}</span>)}</div>
            <div className="project-modal-sections">{selected.sections.map((section) => <div key={section.heading} className="project-modal-section"><h4>{section.heading}</h4>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>)}</div>
            {selected.github && <a className="project-github" href={selected.github} target="_blank" rel="noopener noreferrer">View on GitHub <span aria-hidden="true">↗</span></a>}
          </div>
          {selectedIndex < visibleProjects.length - 1 && (
            <button type="button" className="project-modal-nav project-modal-next" onClick={() => navigate(1)} aria-label="Next project">›</button>
          )}
        </div>
      )}
    </section>
  );
}
