import React from 'react';

interface ControlSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ControlSlider: React.FC<ControlSliderProps> = ({ label, value, min, max, step, onChange }) => (
  <div className="flex flex-col space-y-2">
    <div className="flex justify-between items-center text-sm">
      <label htmlFor={label} className="text-gray-300">{label}</label>
      <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded text-xs">
        {step < 1 ? value.toFixed(3) : value}
      </span>
    </div>
    <input
      id={label}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);


interface ControlsProps {
  count: number;
  setCount: (value: number) => void;
  speed: number;
  setSpeed: (value: number) => void;
  size: number;
  setSize: (value: number) => void;
}

const Controls: React.FC<ControlsProps> = ({ count, setCount, speed, setSpeed, size, setSize }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur-sm space-y-4" aria-label="Particle Controls">
       <h3 className="text-lg font-bold text-white text-center mb-2">Live Controls</h3>
      <ControlSlider
        label="Particle Count"
        value={count}
        min={50}
        max={500}
        step={10}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <ControlSlider
        label="Speed"
        value={speed}
        min={0.01}
        max={0.1}
        step={0.005}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
      <ControlSlider
        label="Size"
        value={size}
        min={5}
        max={50}
        step={1}
        onChange={(e) => setSize(Number(e.target.value))}
      />
    </div>
  );
};

export default Controls;