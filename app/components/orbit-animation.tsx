import React from "react";

import {
  FaJs,
  FaPython,
  FaFigma,
  FaReact,
  FaDatabase,
  FaCss3,
  FaHtml5,
  FaGithub,
  FaNodeJs,
  FaJava,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaPhp,
  FaVuejs,
  FaSwift,
} from "react-icons/fa";
import Info from "./info";

// /**
//  * Props for the OrbitAnimation component
//  * @param elements - Array of React elements to be placed in the orbits
//  */
// interface OrbitAnimationProps {
//   elements: React.ReactNode[];
// }

/**
 * OrbitAnimation Component
 * Creates multiple spinning orbits with evenly spaced elements around each orbit.
 * If more than 8 elements are provided, additional orbits are created.
 * @param {OrbitAnimationProps} props - The props object containing elements.
 * @returns {JSX.Element} - A React component rendering animated orbits.
 */
const elements = [
  <Info info="JavaScript">
    <FaJs className="text-yellow-300 text-2xl rounded-md" />
  </Info>,
  <Info info="Python">
    <FaPython className="text-blue-400 text-2xl rounded-md" />
  </Info>,
  <Info info="Figma">
    <FaFigma className="text-purple-400 text-2xl rounded-md" />
  </Info>,
  <Info info="React">
    <FaReact className="text-blue-500 text-2xl rounded-md" />
  </Info>,
  <Info info="Database">
    <FaDatabase className="text-red-500 text-2xl rounded-md" />
  </Info>,
  <Info info="CSS3">
    <FaCss3 className="text-blue-600 text-2xl rounded-md" />
  </Info>,
  <Info info="HTML5">
    <FaHtml5 className="text-orange-500 text-2xl rounded-md" />
  </Info>,
  <Info info="GitHub">
    <FaGithub className="text-black text-2xl rounded-full bg-white" />
  </Info>,
  <Info info="Node.js">
    <FaNodeJs className="text-green-500 text-2xl rounded-md" />
  </Info>,
  <Info info="Java">
    <FaJava className="text-red-600 text-2xl rounded-md" />
  </Info>,
  <Info info="AWS">
    <FaAws className="text-orange-600 text-2xl rounded-md" />
  </Info>,
  <Info info="Docker">
    <FaDocker className="text-blue-400 text-2xl rounded-md" />
  </Info>,
  <Info info="Git">
    <FaGitAlt className="text-orange-400 text-2xl rounded-md" />
  </Info>,
  <Info info="PHP">
    <FaPhp className="text-indigo-600 text-2xl rounded-md" />
  </Info>,
  <Info info="Vue.js">
    <FaVuejs className="text-green-400 text-2xl rounded-md" />
  </Info>,
  <Info info="Swift">
    <FaSwift className="text-orange-500 text-2xl rounded-md" />
  </Info>,
];

const OrbitAnimation = () => {
  // Maximum number of elements per orbit
  const maxPerOrbit = 8;

  // Array to store the groups of elements for each orbit
  const orbits: React.ReactNode[][] = [];

  // Split the elements array into groups of maxPerOrbit for each orbit
  for (let i = 0; i < elements.length; i += maxPerOrbit) {
    orbits.push(elements.slice(i, i + maxPerOrbit));
  }

  return (
    <div className="relative mt-40 md:m-0 flex items-center justify-center ">
      {/* Center Element */}
      <div className="absolute w-8 h-8 bg-blue-500 rounded-full"></div>

      {/* Loop through each orbit and place the elements in it */}
      {orbits.map((orbitElements, orbitIndex) => {
        // Reduced orbit radius to decrease space between orbits
        const orbitRadius = 3 * (orbitIndex + 1); // Adjusted orbit size to reduce spacing
        const angleStep = (2 * Math.PI) / orbitElements.length; // Calculate angle step based on number of elements

        return (
          <div
            key={orbitIndex}
            className="absolute border border-blue-400 rounded-full"
            style={{
              width: `${orbitRadius * 2}rem`, // Orbit width
              height: `${orbitRadius * 2}rem`, // Orbit height
              animation: `spin ${8 - orbitIndex}s linear infinite`, // Orbit spin speed
            }}
          >
            {/* Loop through elements in the orbit and place them in position */}
            {orbitElements.map((element, i) => {
              const angle = i * angleStep; // Calculate angle for each element
              const x = Math.cos(angle) * orbitRadius; // X coordinate based on the angle
              const y = Math.sin(angle) * orbitRadius; // Y coordinate based on the angle

              return (
                <div
                  key={i}
                  className="absolute z-50"
                  style={{
                    top: `calc(50% + ${y}rem)`, // Position element vertically
                    left: `calc(50% + ${x}rem)`, // Position element horizontally
                    transform: `translate(-50%, -50%) rotate(${
                      (angle * 180) / Math.PI
                    }deg)`, // Rotate element based on angle
                  }}
                >
                  {element}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default OrbitAnimation;
