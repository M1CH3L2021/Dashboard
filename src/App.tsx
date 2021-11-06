import { BrowserRouter as Router } from 'react-router-dom'
import { Routes } from './Routes'
import { Sidebar } from './components/Sidebar'
import { Grid } from '@mui/material'
import { DataProvider } from './hooks/useData'

import './styles/index.css'

function App() {

  return (
    <DataProvider>
      <Router>
        <Grid sx={{ width: '100%', minHeight: '100vh', display: 'flex', p: '0 4%' }}>
          <Sidebar />
          <Routes />
        </Grid>
      </Router>
    </DataProvider>
  )
}

export default App