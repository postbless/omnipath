import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

interface GasChartProps {
  data: Array<{
    time: string
    price: number
  }>
  color?: string
  height?: number
  showGrid?: boolean
}

export const GasChart: React.FC<GasChartProps> = ({
  data,
  color = '#f97316',
  height = 200,
  showGrid = false,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
          )}
          <XAxis
            dataKey="time"
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#71717a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} Gwei`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

interface MiniSparklineProps {
  data: number[]
  color: string
  width?: number
  height?: number
  trend: 'up' | 'down' | 'stable'
}

export const MiniSparkline: React.FC<MiniSparklineProps> = ({
  data,
  color,
  width = 100,
  height = 40,
  trend: _trend,
}) => {
  const chartData = data.map((price, index) => ({
    time: index.toString(),
    price,
  }))

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2}
            dot={false}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GasChart
