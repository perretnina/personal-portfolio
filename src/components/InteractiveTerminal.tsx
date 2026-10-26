import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import "./InteractiveTerminal.css";

type TerminalLine = {
  id: number;
  type: "command" | "output";
  text: string;
};

const commands: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  whoami    About me",
    "  skills    Technical interests",
    "  projects  Explore my projects",
    "  contact   Get in touch",
    "  clear     Clear terminal",
  ],

  whoami: [
    "Nina Perret",
    "Computer Science · Data · AI",
    "Final-year Engineering Student",
    "Mines Saint-Étienne",
  ],

  skills: [
    "{",
    '  "focus": [',
    '    "Machine Learning",',
    '    "Data",',
    '    "Software Engineering"',
    "  ]",
    "}",
  ],

  projects: [
    "Selected projects:",
    "  01  ETFolio",
    "  02  Junior-Entreprise Web App",
    "  03  SafeRoad",
    "",
    "Scroll to Projects to explore more.",
  ],

  contact: [
    "Email: nina.perret@etu.emse.fr",
    "LinkedIn: nina-perret",
    "GitHub: perretnina",
  ],
};

let nextId = 0;

function createLine(
  type: TerminalLine["type"],
  text: string
): TerminalLine {
  return {
    id: nextId++,
    type,
    text,
  };
}

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    createLine("output", "Welcome to Nina's terminal."),
    createLine("output", "Type 'help' to explore."),
    createLine("output", ""),
  ]);

  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const message = "whoami";
    let index = 0;

    const interval = window.setInterval(() => {
      index++;
      setBootText(message.slice(0, index));

      if (index >= message.length) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          setLines((previous) => [
            ...previous,
            createLine("command", "whoami"),
            ...commands.whoami.map((text) =>
              createLine("output", text)
            ),
            createLine("output", ""),
          ]);

          setBooting(false);
        }, 450);
      }
    }, 130);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!booting) {
      inputRef.current?.focus();
    }
  }, [booting]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop =
        outputRef.current.scrollHeight;
    }
  }, [lines]);

  function executeCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input.trim().toLowerCase();

    if (!command) return;

    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    const response = commands[command] ?? [
      `Command not found: ${command}`,
      "Type 'help' to see available commands.",
    ];

    setLines((previous) => [
      ...previous,
      createLine("command", command),
      ...response.map((text) => createLine("output", text)),
      createLine("output", ""),
    ]);

    setInput("");
  }

  return (
    <div className="terminal-scene">
      <div className="neural-network" aria-hidden="true">
        <svg
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <g className="network-lines">
            <line x1="80" y1="110" x2="210" y2="65" />
            <line x1="80" y1="110" x2="180" y2="250" />
            <line x1="210" y1="65" x2="350" y2="125" />
            <line x1="350" y1="125" x2="510" y2="80" />
            <line x1="350" y1="125" x2="430" y2="280" />
            <line x1="180" y1="250" x2="350" y2="125" />
            <line x1="180" y1="250" x2="90" y2="400" />
            <line x1="180" y1="250" x2="300" y2="360" />
            <line x1="430" y1="280" x2="540" y2="390" />
            <line x1="430" y1="280" x2="300" y2="360" />
            <line x1="90" y1="400" x2="220" y2="520" />
            <line x1="300" y1="360" x2="220" y2="520" />
            <line x1="300" y1="360" x2="450" y2="500" />
            <line x1="540" y1="390" x2="450" y2="500" />
          </g>

          <g className="network-pulses">
            <circle r="4">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M80 110 L210 65 L350 125 L430 280 L540 390"
              />
            </circle>

            <circle r="3">
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                path="M90 400 L180 250 L300 360 L450 500"
              />
            </circle>

            <circle r="3">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path="M510 80 L350 125 L180 250 L90 400"
              />
            </circle>
          </g>

          <g className="network-nodes">
            {[
              [80, 110],
              [210, 65],
              [350, 125],
              [510, 80],
              [180, 250],
              [430, 280],
              [90, 400],
              [300, 360],
              [540, 390],
              [220, 520],
              [450, 500],
            ].map(([x, y], index) => (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={index % 3 === 0 ? 6 : 4}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-controls">
            <span className="control-red" />
            <span className="control-yellow" />
            <span className="control-green" />
          </div>

          <span className="terminal-title">
            nina@portfolio — zsh
          </span>

          <span className="terminal-header-icon">⌘</span>
        </div>

        <div
          className="terminal-body"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-output" ref={outputRef}>
            {lines.map((line) => (
              <div
                key={line.id}
                className={`terminal-line ${line.type}`}
              >
                {line.type === "command" ? (
                  <>
                    <span className="terminal-prompt">
                      nina@portfolio ~ %
                    </span>{" "}
                    <span className="command-text">
                      {line.text}
                    </span>
                  </>
                ) : (
                  <span>{line.text || "\u00A0"}</span>
                )}
              </div>
            ))}

            {booting && (
              <div className="terminal-line">
                <span className="terminal-prompt">
                  nina@portfolio ~ %
                </span>{" "}
                <span className="command-text">
                  {bootText}
                </span>
                <span className="terminal-cursor" />
              </div>
            )}
          </div>

          {!booting && (
            <form
              className="terminal-input-line"
              onSubmit={executeCommand}
            >
              <span className="terminal-prompt">
                nina@portfolio ~ %
              </span>

              <input
                ref={inputRef}
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          )}
        </div>

        <div className="terminal-footer">
          <span className="terminal-status-dot" />
          <span>INTERACTIVE TERMINAL</span>
          <span className="terminal-footer-right">
            TYPE HELP ↗
          </span>
        </div>
      </div>
    </div>
  );
}