import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  score: number;
  max: number;
  min: number;
}

const Gauge: React.FC<GaugeProps> = ({ score, max, min }) => {
  // Calculate percentage for needle position (simplified for this visual)
  // For 768 on a 300-900 scale
  const normalizedScore = Math.min(Math.max(score, min), max);
  const percentage = (normalizedScore - min) / (max - min);

  const data = [
    { name: 'Score', value: percentage },
    { name: 'Remaining', value: 1 - percentage },
  ];

  // Green gradient logic simulated by color interpolation or simple status color
  const getColor = (val: number) => {
    if (val < 0.5) return '#E74C3C';
    if (val < 0.75) return '#FF9800';
    return '#4CAF50';
  };

  return (
    <div className="w-full h-24 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx="50%"
              cy="85%"
              innerRadius={45}
              outerRadius={60}
              stroke="none"
            >
              <Cell fill={getColor(percentage)} />
              <Cell fill="#e5e7eb" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        {/* Score positioned inside the gauge arc */}
        <div className="absolute top-[55%] left-0 right-0 flex justify-center items-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-800 tracking-tight">{score}</span>
        </div>

        {/* Label positioned below the gauge to prevent overlap */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center pointer-events-none">
            <span className="text-[8px] text-gray-400 uppercase tracking-widest font-bold">Approved Recommendation</span>
        </div>
    </div>
  );
};

export default Gauge;