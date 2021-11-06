import { useState } from "react";
import { Chart } from "../components/Chart";
import { Statistics } from "../components/Statistics";
import {
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Stack
} from "@mui/material";

type Filter = 'tensao_V' | 'corrente_A' | 'potencia_kW' | 'temperatura_C' 

export function Home() {
  const [filter, setFilter] = useState<Filter>('tensao_V')

  return (
    <Grid
      item
      xs={12}
      sx={{
        height: '100%',
        minHeight: '600px',
        pt: '100px',
        mb: '50px',
      }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{
          gap: '20px',
          width: '100%',
          height: '100%'
        }}
      >
        <Paper
          elevation={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '420px',
            width: '85%',
            maxWidth: '850px',
            p: '30px',
            borderRadius: '10px',
            background: '#1f2029',
            textAlign: 'left',
          }}
        >
          <Typography fontSize={24} sx={{ color: 'white' }}>
            Dados da usina
          </Typography>
          <FormControl variant="standard" sx={{ m: 1 }}>
            <InputLabel id="filter" sx={{ color: 'white' }}>
              Variável
            </InputLabel>
            <Select
              onChange={(event: any) => setFilter(event.target.value)}
              labelId="filter"
              id="filter"
              value={filter}
              label="Variável"
              sx={{
                color: '#1f2029',
                textAlign: 'center',
                background: 'white',
                borderRadius: 1
              }}
            >
              <MenuItem value="tensao_V">Tensão (V)</MenuItem>
              <MenuItem value="corrente_A">Corrente (A)</MenuItem>
              <MenuItem value="potencia_kW">Potência (kW)</MenuItem>
              <MenuItem value="temperatura_C">Temperatura (°C)</MenuItem>
            </Select>
          </FormControl>
          <Chart filter={filter} />
        </Paper>
        <Statistics filter={filter} />
      </Stack>
    </Grid>
  )
}