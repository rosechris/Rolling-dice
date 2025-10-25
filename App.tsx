import React, { useState } from 'react';
import Dice from './components/Dice';

const App: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [displayedNumber, setDisplayedNumber] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  // Map dice numbers to the required rotation to show that face
  const faceRotations: { [key: number]: { x: number; y: number } } = {
    1: { x: 0, y: 0 },      // Face 1 is at the front
    2: { x: 90, y: 0 },     // Rotate cube forward to see top face (Face 2)
    3: { x: 0, y: 90 },     // Rotate cube right to see left face (Face 3)
    4: { x: 0, y: -90 },    // Rotate cube left to see right face (Face 4)
    5: { x: -90, y: 0 },    // Rotate cube backward to see bottom face (Face 5)
    6: { x: 0, y: 180 },    // Rotate cube 180deg to see back face (Face 6)
  };

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    // Hide the previous result text immediately
    setDisplayedNumber(null);

    const newRolledNumber = Math.floor(Math.random() * 6) + 1;

    const targetRotation = faceRotations[newRolledNumber];

    // Calculate new rotation values to ensure the dice always spins forward
    const currentSpinsX = Math.round(rotation.x / 360);
    const currentSpinsY = Math.round(rotation.y / 360);

    const extraSpins = 3; // Add extra spins for a better visual effect
    
    const newRotationX = (currentSpinsX + extraSpins) * 360 + targetRotation.x;
    const newRotationY = (currentSpinsY + extraSpins) * 360 + targetRotation.y;

    setRotation({ x: newRotationX, y: newRotationY });

    // After the 1.5s animation is complete...
    setTimeout(() => {
      setIsRolling(false);
      // ...show the new rolled number.
      setDisplayedNumber(newRolledNumber);
    }, 1500);
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto text-center space-y-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_theme(colors.cyan.400)]">
            3D Terningkast
          </h1>
          <p className="text-slate-400 mt-2">Klikk på knappen for å kaste terningen!</p>
        </header>

        <div className="w-32 h-32 mx-auto">
          <Dice rotation={rotation} />
        </div>

        <div className="h-16 flex items-center justify-center">
            {/* The text now only appears when displayedNumber has a value */}
            {displayedNumber !== null && (
              <p className="text-2xl">
                Du kastet en: <span className="font-bold text-cyan-400 text-3xl">{displayedNumber}</span>
              </p>
            )}
        </div>

        <button
          onClick={rollDice}
          disabled={isRolling}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          {isRolling ? 'Kaster...' : 'Kast terning'}
        </button>
      </div>
    </main>
  );
};

export default App;