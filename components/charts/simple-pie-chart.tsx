"use client";

interface SimplePieChartProps {
  data: Array<{ name: string; value: number; percentage: number }>;
  colors?: string[];
  size?: number;
}

const DEFAULT_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export function SimplePieChart({ 
  data, 
  colors = DEFAULT_COLORS, 
  size = 200 
}: SimplePieChartProps) {
  if (!data.length) return null;

  const center = size / 2;
  const radius = size * 0.35;
  const innerRadius = radius * 0.6;

  let cumulativePercentage = 0;

  const createArcPath = (startAngle: number, endAngle: number, outerRadius: number, innerRadius: number) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const x1 = center + outerRadius * Math.cos(startAngleRad);
    const y1 = center + outerRadius * Math.sin(startAngleRad);
    const x2 = center + outerRadius * Math.cos(endAngleRad);
    const y2 = center + outerRadius * Math.sin(endAngleRad);

    const x3 = center + innerRadius * Math.cos(endAngleRad);
    const y3 = center + innerRadius * Math.sin(endAngleRad);
    const x4 = center + innerRadius * Math.cos(startAngleRad);
    const y4 = center + innerRadius * Math.sin(startAngleRad);

    return [
      "M", x1, y1,
      "A", outerRadius, outerRadius, 0, largeArcFlag, 1, x2, y2,
      "L", x3, y3,
      "A", innerRadius, innerRadius, 0, largeArcFlag, 0, x4, y4,
      "Z"
    ].join(" ");
  };

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="drop-shadow-sm">
        {data.map((item, index) => {
          const startAngle = (cumulativePercentage / 100) * 360 - 90; // Start from top
          const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360 - 90;
          
          cumulativePercentage += item.percentage;

          const pathData = createArcPath(startAngle, endAngle, radius, innerRadius);
          const color = colors[index % colors.length];

          // Calculate label position
          const labelAngle = (startAngle + endAngle) / 2;
          const labelRadius = (radius + innerRadius) / 2;
          const labelX = center + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
          const labelY = center + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

          return (
            <g key={index}>
              <path
                d={pathData}
                fill={color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                stroke="#ffffff"
                strokeWidth="1"
              >
                <title>{item.name}: {item.percentage.toFixed(1)}% (${item.value.toLocaleString()})</title>
              </path>
              
              {/* Percentage label */}
              {item.percentage > 5 && (
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                  className="pointer-events-none"
                >
                  {item.percentage.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
        
        {/* Center text */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fill="currentColor"
          className="opacity-60"
        >
          Portfolio
        </text>
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="currentColor"
          className="opacity-60"
        >
          Allocation
        </text>
      </svg>
    </div>
  );
}
