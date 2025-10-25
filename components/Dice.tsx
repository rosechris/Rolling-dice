import React from 'react';

// A single dot on the dice face
const Dot: React.FC = () => (
  <div className="w-5 h-5 md:w-6 md:h-6 bg-cyan-400 rounded-full shadow-[0_0_10px_theme(colors.cyan.400)]"></div>
);

// A container for a single face of the dice
const Face: React.FC<{ children: React.ReactNode; transform: string }> = ({ children, transform }) => (
  <div
    className="absolute w-32 h-32 bg-slate-700/60 backdrop-blur-sm rounded-2xl p-4 flex border border-slate-500"
    style={{ transform }}
  >
    {children}
  </div>
);

// Props for the 3D Dice component
interface DiceProps {
  rotation: { x: number; y: number };
}

const Dice: React.FC<DiceProps> = ({ rotation }) => {
  const cubeStyle: React.CSSProperties = {
    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transition: 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div className="w-full h-full" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', ...cubeStyle }}
      >
        {/* Face 1 */}
        <Face transform="rotateY(0deg) translateZ(4rem)">
          <div className="w-full h-full flex justify-center items-center">
            <Dot />
          </div>
        </Face>
        {/* Face 2 */}
        <Face transform="rotateX(-90deg) translateZ(4rem)">
          <div className="w-full h-full flex justify-between">
            <div className="flex items-start"><Dot /></div>
            <div className="flex items-end"><Dot /></div>
          </div>
        </Face>
        {/* Face 3 */}
        <Face transform="rotateY(-90deg) translateZ(4rem)">
          <div className="w-full h-full flex justify-between">
            <div className="flex items-start"><Dot /></div>
            <div className="flex items-center"><Dot /></div>
            <div className="flex items-end"><Dot /></div>
          </div>
        </Face>
        {/* Face 4 */}
        <Face transform="rotateY(90deg) translateZ(4rem)">
          <div className="w-full h-full flex justify-between">
            <div className="flex flex-col justify-between"><Dot /><Dot /></div>
            <div className="flex flex-col justify-between"><Dot /><Dot /></div>
          </div>
        </Face>
        {/* Face 5 */}
        <Face transform="rotateX(90deg) translateZ(4rem)">
           <div className="w-full h-full flex justify-between">
            <div className="flex flex-col justify-between"><Dot /><Dot /></div>
            <div className="flex justify-center items-center"><Dot /></div>
            <div className="flex flex-col justify-between"><Dot /><Dot /></div>
          </div>
        </Face>
        {/* Face 6 */}
        <Face transform="rotateY(180deg) translateZ(4rem)">
          <div className="w-full h-full flex justify-between">
            <div className="flex flex-col justify-between"><Dot /><Dot /><Dot /></div>
            <div className="flex flex-col justify-between"><Dot /><Dot /><Dot /></div>
          </div>
        </Face>
      </div>
    </div>
  );
};

export default Dice;
