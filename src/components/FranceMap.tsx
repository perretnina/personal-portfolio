import { useEffect, useState } from "react";

type Position = [number, number];

type Geometry = {
  type: "Polygon" | "MultiPolygon";
  coordinates: number[][][] | number[][][][];
};

type Feature = {
  type: "Feature";
  geometry: Geometry;
};

type GeoJSON =
  | Feature
  | {
      type: "FeatureCollection";
      features: Feature[];
    };

type FranceMapProps = {
  activeStep: number;
  onSelectStep: (step: number) => void;
};

const GEOJSON_URL = "/france.geojson";

const WIDTH = 520;
const HEIGHT = 600;

// Geographic bounds of metropolitan France, including Corsica.
const BOUNDS = {
  west: -5.5,
  east: 9.8,
  north: 51.2,
  south: 41.2,
};

const locations = [
  { name: "Brittany", longitude: -4.1028, latitude: 47.9961 },
  { name: "Lyon", longitude: 4.8357, latitude: 45.764 },
  { name: "Gardanne / Aix", longitude: 5.47, latitude: 43.46 },
  { name: "Paris", longitude: 2.3522, latitude: 48.8566 },
];

// Geographic projection.
function project(longitude: number, latitude: number): Position {
  const centerLatitude = 46.5 * (Math.PI / 180);

  const scaleX = Math.cos(centerLatitude);

  const geographicWidth =
    (BOUNDS.east - BOUNDS.west) * scaleX;

  const geographicHeight =
    BOUNDS.north - BOUNDS.south;

  const padding = 35;

  const scale = Math.min(
    (WIDTH - 2 * padding) / geographicWidth,
    (HEIGHT - 2 * padding) / geographicHeight
  );

  const offsetX =
    (WIDTH - geographicWidth * scale) / 2;

  const offsetY =
    (HEIGHT - geographicHeight * scale) / 2;

  return [
    offsetX +
      (longitude - BOUNDS.west) * scaleX * scale,

    offsetY +
      (BOUNDS.north - latitude) * scale,
  ];
}

// Convert one GeoJSON polygon ring into an SVG path.
function polygonToPath(ring: number[][]): string {
  return (
    ring
      .map(([longitude, latitude], index) => {
        const [x, y] = project(longitude, latitude);

        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ") + " Z"
  );
}

// Convert Polygon or MultiPolygon geometry into SVG paths.
function geometryToPath(geometry: Geometry): string {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as number[][][])
      .map(polygonToPath)
      .join(" ");
  }

  return (geometry.coordinates as number[][][][])
    .flatMap((polygon) => polygon.map(polygonToPath))
    .join(" ");
}

export default function FranceMap({
  activeStep,
  onSelectStep,
}: FranceMapProps) {
  const [mapPaths, setMapPaths] = useState<string[]>([]);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMap() {
      try {
        const response = await fetch(GEOJSON_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load France GeoJSON");
        }

        const data: GeoJSON = await response.json();

        // Support both Feature and FeatureCollection.
        const features =
          data.type === "FeatureCollection"
            ? data.features
            : [data];

        setMapPaths(
          features.map((feature) =>
            geometryToPath(feature.geometry)
          )
        );

        setMapError(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("France map loading error:", error);
          setMapError(true);
        }
      }
    }

    loadMap();

    return () => controller.abort();
  }, []);

  const points = locations.map((location) =>
    project(location.longitude, location.latitude)
  );

  // The future path deliberately has no geographic destination.
  const futurePoint: Position = [455, 25];

  const route = points
    .slice(0, Math.min(activeStep + 1, 4))
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"} ${x} ${y}`
    )
    .join(" ");

  const [parisX, parisY] = points[3];

  return (
    <div className="journey-map">
      <div className="journey-map-topline">
        <span>THE ROUTE SO FAR</span>
        <span>FRANCE → ?</span>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Interactive map showing Nina's journey through France"
      >
        <defs>
          <linearGradient id="journey-route-gradient">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f43f93" />
          </linearGradient>

          <filter id="journey-glow">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* France borders */}

        <g className="journey-map-shape">
          {mapPaths.map((path, index) => (
            <path key={index} d={path} fillRule="evenodd" />
          ))}
        </g>

        {/* Route between cities */}

        {route && activeStep > 0 && (
          <path
            key={`route-${activeStep}`}
            d={route}
            className="journey-route"
          />
        )}

        {/* Future path beyond France */}

        {activeStep === 4 && (
          <path
            d={`M ${parisX} ${parisY} Q 370 75 ${futurePoint[0]} ${futurePoint[1]}`}
            className="journey-future-route"
          />
        )}

        {/* City markers */}

        {points.map(([x, y], index) => {
          const visible = index <= activeStep;
          const active = index === activeStep;

          return (
            <g
              key={locations[index].name}
              className={`journey-map-marker ${
                active ? "is-active" : ""
              } ${visible ? "is-visible" : ""}`}
              onClick={() => onSelectStep(index)}
              role="button"
              tabIndex={0}
              aria-label={`Show ${locations[index].name}`}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  onSelectStep(index);
                }
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="19"
                className="marker-hit"
              />

              {visible && (
                <>
                  {active && (
                    <circle
                      cx={x}
                      cy={y}
                      r="13"
                      className="marker-halo"
                    />
                  )}

                  <circle
                    cx={x}
                    cy={y}
                    r="5"
                    className="marker-dot"
                  />

                  <text x={x + 12} y={y - 13}>
                    {locations[index].name}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Beyond France marker */}

        {activeStep === 4 && (
          <g className="journey-future-marker">
            <circle
              cx={futurePoint[0]}
              cy={futurePoint[1]}
              r="7"
            />

            <text
              x={futurePoint[0] - 8}
              y={futurePoint[1] - 15}
              textAnchor="end"
            >
              WHAT'S NEXT?
            </text>
          </g>
        )}
      </svg>

      {mapError && (
        <p className="journey-map-error">
          Map unavailable. The journey timeline remains accessible.
        </p>
      )}

      <div className="journey-map-bottomline">
        <span>48° N / 02° E</span>
        <span>
          CHAPTER {String(activeStep + 1).padStart(2, "0")} / 05
        </span>
      </div>
    </div>
  );
}