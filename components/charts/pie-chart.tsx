"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface PieChartComponentProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  colors?: string[];
  height?: number;
  showTooltip?: boolean;
  showLegend?: boolean;
  innerRadius?: number;
  outerRadius?: number;
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  colors = DEFAULT_COLORS,
  height = 300,
  showTooltip = true,
  showLegend = true,
  innerRadius = 0,
  outerRadius = 80,
}: PieChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey={dataKey}
          nameKey={nameKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
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
        {showLegend && (
          <Legend 
            verticalAlign="bottom" 
            height={36}
            wrapperStyle={{ fontSize: '12px' }}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
}
