"use client";

interface SimpleLineChartProps {
  data: Array<{ date: string; value: number }>;
  height?: number;
  color?: string;
}

export function SimpleLineChart({ data, height = 200, color = "#3b82f6" }: SimpleLineChartProps) {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;
  const padding = range * 0.1;

  const adjustedMax = maxValue + padding;
  const adjustedMin = minValue - padding;
  const adjustedRange = adjustedMax - adjustedMin;

  const width = 100; // percentage
  const chartHeight = height - 40; // Account for padding

  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = ((adjustedMax - point.value) / adjustedRange) * chartHeight + 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox={`0 0 100 ${height}`} className="overflow-visible">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-20" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="opacity-30" />
        
        {/* Line */}
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = ((adjustedMax - point.value) / adjustedRange) * chartHeight + 20;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              className="hover:r-4 transition-all cursor-pointer"
            >
              <title>{point.date}: ${point.value.toLocaleString()}</title>
            </circle>
          );
        })}
        
        {/* Y-axis labels */}
        <text x="2" y="25" fontSize="8" fill="currentColor" className="opacity-60">
          ${adjustedMax.toLocaleString()}
        </text>
        <text x="2" y={chartHeight + 15} fontSize="8" fill="currentColor" className="opacity-60">
          ${adjustedMin.toLocaleString()}
        </text>
      </svg>
    </div>
  );
}
