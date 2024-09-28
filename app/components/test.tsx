// components/AbstractShape.tsx
const AbstractShape: React.FC = () => {
  return (
    <svg
      width="100%"
      height="400"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 z-[-1]"
    >
      <path
        fill="#0070f3" // Change this to your desired color
        d="M0,128L30,117.3C60,107,120,85,180,90.7C240,96,300,128,360,133.3C420,139,480,117,540,112C600,107,660,117,720,144C780,171,840,213,900,218.7C960,224,1020,192,1080,176C1140,160,1200,160,1260,154.7C1320,149,1380,139,1410,133.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320H0Z"
      />
    </svg>
  );
};

export default AbstractShape;
