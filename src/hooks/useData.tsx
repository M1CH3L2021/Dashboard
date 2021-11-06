import { ReactNode, createContext, useState, useEffect, useContext } from 'react'
import { api } from '../services/api'

interface DataProviderProps {
  children: ReactNode
}

interface ClientData {
  id?: number
  numeroCliente: number
  nomeCliente: string
  usinas: [{
    usinaId: number,
    percentualDeParticipacao: number
  }]
}

interface ClientToBeEditedData {
  id?: number
  numeroCliente?: number
  nomeCliente: string
  usinas: [{
    usinaId: number,
    percentualDeParticipacao: number
  }]
}

interface FactoryData {
  tempo_h: string
  tensao_V: number
  corrente_A: number
  potencia_kW: number
  temperatura_C: number
}

interface DataContextData {
  factoryData: FactoryData[]
  clients: ClientData[]
  createClient: (newClient: ClientData) => Promise<void>
  editClient: (clientToBeEdited: ClientToBeEditedData) => Promise<void>
  excludeClient: (clientToBeExcluded: ClientData) => void
  totalRevenuePrice: number
}

const DataContext = createContext<DataContextData>({} as DataContextData)

export function DataProvider({ children }: DataProviderProps) {
  const [clients, setClients] = useState<ClientData[]>([])
  const [factoryData, setFactoryData] = useState<FactoryData[]>([])
  const [totalRevenuePrice, setTotalRevenuePrice] = useState(0)

  const convertHourFromDecimalToNormal = (data: FactoryData[]) => {
    data.map(datas =>{
      const separated = datas.tempo_h.toString().split('.')
      const transformed = separated[1] ? +separated[1] * 0.6 : 0
      const reducedSize = transformed.toPrecision(2)
      const concludedTransformation = reducedSize.slice(0, 3).replace('.', '')
      const concated = separated[0] + ':' + concludedTransformation + 'h'
      datas.tempo_h = concated
    })
  }

  useEffect(() => {
    const loadData = async () => {
      await api.get('/dadosClientes')
        .then(response => {
          setClients(response.data as ClientData[])
        })

      await api.get('/dadosUsina')
        .then(response => {
          var timeInterval = response.data[1].tempo_h - response.data[0].tempo_h
          const pricePerkWh = 0.95
          const totalRevenue = response.data.reduce((acc: number, curr: FactoryData) => {
            return acc + curr.potencia_kW * timeInterval * pricePerkWh
          }, 0)

          setTotalRevenuePrice(totalRevenue)
          convertHourFromDecimalToNormal(response.data)
          setFactoryData(response.data as FactoryData[])
        })
    }

    loadData()
  }, [])

  const createClient = async (newClient: ClientData) => {
    const response = await api.post('/dadosClientes', {
      ...newClient
    })

    newClient = response.data

    setClients([...clients, newClient])
  }

  const editClient = async (clientToBeEdited: ClientToBeEditedData) => {
    const response = await api.patch(`/dadosClientes/${clientToBeEdited.id}`, {
      nomeCliente: clientToBeEdited.nomeCliente,
      usinas: [{
        usinaId: clientToBeEdited.usinas[0].usinaId,
        percentualDeParticipacao: clientToBeEdited.usinas[0].percentualDeParticipacao,
      }]
    })
    const editedClient = response.data

    const ClientListWithoutEditedClient = clients.filter(client => {
      return client.id !== clientToBeEdited.id
    })
    const newClientList = [...ClientListWithoutEditedClient, editedClient]
    
    newClientList.sort((a, b) => {
      return a.numeroCliente - b.numeroCliente
    })

    setClients([...newClientList])
  }

  const excludeClient = async (clientToBeExcluded: ClientData) => {
    await api.delete(`/dadosClientes/${clientToBeExcluded.id}`)

    const newClientList = clients.filter(client => {
      return client !== clientToBeExcluded
    })

    newClientList.map(async client => {
      client.numeroCliente = newClientList.indexOf(client) + 1
      await api.patch(`/dadosClientes/${client.id}`, {
        numeroCliente: newClientList.indexOf(client) + 1,
      })
    })

    setClients([...newClientList])
  }

  return (
    <DataContext.Provider
      value={{
        factoryData,
        clients,
        createClient,
        editClient,
        excludeClient,
        totalRevenuePrice
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)

  return context
}