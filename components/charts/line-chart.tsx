"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineChartComponentProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export function LineChartComponent({
  data,
  dataKey,
  xAxisKey,
  color = "#8884d8",
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
}: LineChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" className="opacity-30" />}
        <XAxis 
          dataKey={xAxisKey} 
          className="text-xs"
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          className="text-xs"
          axisLine={false}
          tickLine={false}
        />
        {showTooltip && (
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
        )}
        {showLegend && <Legend />}
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
