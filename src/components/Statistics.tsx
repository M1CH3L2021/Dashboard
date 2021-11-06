import { useState, useEffect } from "react"
import { useData } from "../hooks/useData"
import { Paper, Typography, Stack } from "@mui/material"

interface StatisticsProps {
  filter: 'tensao_V' | 'corrente_A' | 'potencia_kW' | 'temperatura_C' 
}

interface FactoryData {
  tempo_h: string
  tensao_V: number
  corrente_A: number
  potencia_kW: number
  temperatura_C: number
}

type VariantQuantity = 'V' | 'A' | 'kW' | '°C'

export function Statistics({ filter }: StatisticsProps) {
  const [variantQuantity, setVariantQuantity] = useState<VariantQuantity>('V')
  const { factoryData, totalRevenuePrice } = useData()

  useEffect(() => {
    switch (filter) {
      case 'tensao_V':
        setVariantQuantity('V')
        break;
      case 'corrente_A':
        setVariantQuantity('A')
        break;
      case 'potencia_kW':
        setVariantQuantity('kW')
        break;
      case 'temperatura_C':
        setVariantQuantity('°C')
        break;
    }
  }, [filter])

  const convertNumberFromUSAToBR = (number: number) => {
    return number.toString().replace('.',',')
  }

  const average = factoryData.reduce((acc: number, curr: FactoryData) => {
    switch (filter) {
      case 'tensao_V':
        return +(acc + curr.tensao_V / factoryData.length).toFixed(2)
        break
      case 'corrente_A':
        return +(acc + curr.corrente_A / factoryData.length).toFixed(2)
        break
      case 'potencia_kW':
        return +(acc + curr.potencia_kW / factoryData.length).toFixed(2)
        break
      case 'temperatura_C':
        return +(acc + curr.temperatura_C / factoryData.length).toFixed(2)
        break
    }
  }, 0)

  const maxValue = factoryData.reduce((acc: number, curr: FactoryData) => {
    switch (filter) {
      case 'tensao_V':
        return Math.max(acc, curr.tensao_V)
        break;
      case 'corrente_A':
        return Math.max(acc, curr.corrente_A)
        break
      case 'potencia_kW':
        return Math.max(acc, curr.potencia_kW)
        break
      case 'temperatura_C':
        return Math.max(acc, curr.temperatura_C)
        break
    }
    
  }, 0).toFixed(2)
  
  const minValue = () => {
    switch (filter) {
      case 'tensao_V':
        const voltageValues = factoryData.map(({tensao_V}) => tensao_V)
        return Math.min(...voltageValues)
        break;
      case 'corrente_A':
        const currentValues = factoryData.map(({corrente_A}) => corrente_A)
        return Math.min(...currentValues)
        break
      case 'potencia_kW':
        const potencyValues = factoryData.map(({potencia_kW}) => potencia_kW)
        return Math.min(...potencyValues)
        break
      case 'temperatura_C':
        const temperatureValues = factoryData.map(({temperatura_C}) => temperatura_C)
        return Math.min(...temperatureValues)
        break
    }
  }

  const standardDeviation = Math.sqrt(factoryData.reduce((acc: number, curr: FactoryData) => {
    switch (filter) {
      case 'tensao_V':
        return acc + Math.pow(curr.tensao_V - average, 2)
        break;
      case 'corrente_A':
        return acc + Math.pow(curr.corrente_A - average, 2)
        break
      case 'potencia_kW':
        return acc + Math.pow(curr.potencia_kW - average, 2)
        break
      case 'temperatura_C':
        return acc + Math.pow(curr.temperatura_C - average, 2)
        break
    }
  }, 0) / factoryData.length).toFixed(2)

  const generatedEnergy = (totalRevenuePrice / 0.95).toFixed(2)

  return (
    <Paper
      elevation={5}
      sx={{
        flexGrow: 1,
        height: '420px',
        width: '30%',
        maxWidth: '400px',
        minWidth: '250px',
        p: '30px',
        backgroundColor: '#1f2029',
        color: 'white',
        borderRadius: '10px',
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <Typography m="0 auto 30px" fontSize={20}>Estatísticas</Typography>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography>Média</Typography>
        <Typography color="gray">
          {`${convertNumberFromUSAToBR(average)} ${variantQuantity}`}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography>Máximo</Typography>
        <Typography color="gray">
          {`${convertNumberFromUSAToBR(+maxValue)} ${variantQuantity}`}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography>Mínimo</Typography>
        <Typography color="gray">
          {`${convertNumberFromUSAToBR(minValue())} ${variantQuantity}`}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography>Desvio padrão</Typography>
        <Typography color="gray">
          {`${convertNumberFromUSAToBR(+standardDeviation)} ${variantQuantity}`}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" mt="auto">
        <Typography>Energia gerada</Typography>
        <Typography color="gray">
          {convertNumberFromUSAToBR(+generatedEnergy)} kWh
        </Typography>
      </Stack>
    </Paper>
  )
}