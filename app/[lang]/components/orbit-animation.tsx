// "use client";
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

const elements = [
  <Info key="js" info="JavaScript">
    <FaJs className=" rotate-90 text-yellow-300 text-2xl rounded-md" />
  </Info>,
  <Info key="python" info="Python">
    <FaPython className=" rotate-90 text-blue-400 text-2xl rounded-md" />
  </Info>,
  <Info key="figma" info="Figma">
    <FaFigma className=" rotate-90 text-purple-400 text-2xl rounded-md" />
  </Info>,
  <Info key="react" info="React">
    <FaReact className=" rotate-90 text-blue-500 text-2xl rounded-md" />
  </Info>,
  <Info key="database" info="Database">
    <FaDatabase className=" rotate-90 text-red-500 text-2xl rounded-md" />
  </Info>,
  <Info key="css" info="CSS3">
    <FaCss3 className=" rotate-90 text-blue-600 text-2xl rounded-md" />
  </Info>,
  <Info key="html" info="HTML5">
    <FaHtml5 className=" rotate-90 text-orange-500 text-2xl rounded-md" />
  </Info>,
  <Info key="github" info="GitHub">
    <FaGithub className=" rotate-90 text-black text-2xl rounded-full bg-white" />
  </Info>,
  <Info key="node" info="Node.js">
    <FaNodeJs className=" rotate-90 text-green-500 text-2xl rounded-md" />
  </Info>,
  <Info key="java" info="Java">
    <FaJava className=" rotate-90 text-red-600 text-2xl rounded-md" />
  </Info>,
  <Info key="aws" info="AWS">
    <FaAws className=" rotate-90 text-orange-600 text-2xl rounded-md" />
  </Info>,
  <Info key="docker" info="Docker">
    <FaDocker className=" rotate-90 text-blue-400 text-2xl rounded-md" />
  </Info>,
  <Info key="git" info="Git">
    <FaGitAlt className=" rotate-90 text-orange-400 text-2xl rounded-md" />
  </Info>,
  <Info key="php" info="PHP">
    <FaPhp className=" rotate-90 text-indigo-600 text-2xl rounded-md" />
  </Info>,
  <Info key="vue" info="Vue.js">
    <FaVuejs className=" rotate-90 text-green-400 text-2xl rounded-md" />
  </Info>,
  <Info key="swift" info="Swift">
    <FaSwift className=" rotate-90 text-orange-500 text-2xl rounded-md" />
  </Info>,
];

const OrbitAnimation = () => {
  const maxPerOrbit = 8;
  const orbits: React.ReactNode[][] = [];

  for (let i = 0; i < elements.length; i += maxPerOrbit) {
    orbits.push(elements.slice(i, i + maxPerOrbit));
  }

  return (
    <div className="relative mt-40 md:m-0 flex items-center justify-center ">
      {/* Center Element */}
      <div className="absolute w-8  h-8 bg-primary rounded-full"></div>

      {/* Loop through each orbit and place the elements in it */}
      {orbits.map((orbitElements, orbitIndex) => {
        const orbitRadius = 3 * (orbitIndex + 1);
        const angleStep = (2 * Math.PI) / orbitElements.length;

        return (
          <div
            key={`orbit-${orbitIndex}`} // Unique key for each orbit
            className="absolute  border border-primary/80 rounded-full"
            style={{
              width: `${orbitRadius * 2}rem`,
              height: `${orbitRadius * 2}rem`,
              animation: `spin ${8 - orbitIndex}s linear infinite`,
            }}
          >
            {orbitElements.map((element, i) => {
              const angle = i * angleStep;
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius;

              return (
                <div
                  key={`element-${orbitIndex}-${i}`} // Unique key for each element
                  className="absolute z-50"
                  style={{
                    top: `calc(50% + ${y}rem)`,
                    left: `calc(50% + ${x}rem)`,
                    transform: `translate(-50%, -50%) rotate(${
                      (angle * 180) / Math.PI
                    }deg)`,
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
