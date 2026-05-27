"use client";

interface SimpleBarChartProps {
  data: Array<{ month: string; pnl: number }>;
  height?: number;
  color?: string;
}

export function SimpleBarChart({ data, height = 200 }: SimpleBarChartProps) {
  if (!data.length) return null;

  const maxValue = Math.max(...data.map(d => Math.abs(d.pnl)));
  const minValue = Math.min(...data.map(d => d.pnl));
  const hasNegative = minValue < 0;
  
  const chartHeight = height - 60; // Account for labels
  const barWidth = 80 / data.length; // Percentage width per bar
  const barSpacing = 5; // Space between bars

  return (
    <div className="w-full" style={{ height }}>
      <svg width="100%" height="100%" viewBox={`0 0 100 ${height}`}>
        {/* Zero line if we have negative values */}
        {hasNegative && (
          <line
            x1="10"
            y1={height / 2}
            x2="90"
            y2={height / 2}
            stroke="currentColor"
            strokeWidth="0.5"
            className="opacity-40"
          />
        )}
        
        {data.map((item, index) => {
          const barHeight = (Math.abs(item.pnl) / maxValue) * (chartHeight / 2);
          const x = 10 + (index * (barWidth + barSpacing));
          const isPositive = item.pnl >= 0;
          const y = hasNegative 
            ? (isPositive ? height / 2 - barHeight : height / 2)
            : height - 40 - barHeight;

          return (
            <g key={index}>
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={isPositive ? "#10b981" : "#ef4444"}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                rx="2"
              >
                <title>{item.month}: ${item.pnl.toLocaleString()}</title>
              </rect>
              
              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={height - 10}
                textAnchor="middle"
                fontSize="8"
                fill="currentColor"
                className="opacity-60"
              >
                {item.month}
              </text>
              
              {/* Value label */}
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                fontSize="7"
                fill="currentColor"
                className="opacity-80"
              >
                ${item.pnl > 0 ? '+' : ''}
                {item.pnl.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
