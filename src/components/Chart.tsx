import { useData } from '../hooks/useData';
import { Grid } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ChartProps {
  filter: 'tensao_V' | 'corrente_A' | 'potencia_kW' | 'temperatura_C'
}

export function Chart({ filter }: ChartProps) {
  const { factoryData } = useData()

  return(
    <Grid mt="auto" className="chart-box">
      <ResponsiveContainer height="100%" minWidth="600px" aspect={3}>
          <AreaChart
            data={factoryData}
            margin={{
              top: 0,
              right: 10,
              left: -20,
              bottom: 0
            }}>
            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D80D8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0D80D8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#243240" horizontal={false} vertical={false}/>
            <XAxis dataKey="tempo_h" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#181b23",
                color: "#fff",
                borderRadius: '10px',
                border: 'none',
                boxShadow: '0 0 8px 0 rgba(0,0,0,.4)',
                textAlign: 'center'
              }}
            />
            <Area
              type="monotone"
              dataKey={filter}
              stroke="#0D80D8"
              fillOpacity={1}
              fill="url(#areaColor)"
              strokeWidth={1}
            />
          </AreaChart>
        </ResponsiveContainer>
    </Grid>
  )
}