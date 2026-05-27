"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface BarChartComponentProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
}

export function BarChartComponent({
  data,
  dataKey,
  xAxisKey,
  color = "#82ca9d",
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = false,
}: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Bar 
          dataKey={dataKey} 
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
