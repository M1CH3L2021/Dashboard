import { useState } from "react";
import { useData } from "../hooks/useData";
import { NewClientModal } from "../components/NewClientModal";
import { EditClientModal } from "../components/EditClientModal";
import {
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Typography,
  Stack
} from "@mui/material";

import { RiAddLine, RiPencilLine } from 'react-icons/ri'

interface ClientData {
  id?: number
  numeroCliente: number
  nomeCliente: string
  usinas: [{
    usinaId: number,
    percentualDeParticipacao: number
  }]
}

export function Clients() {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false)
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false)
  const { clients, totalRevenuePrice } = useData()
  const [clientToBeEdited, setClientToBeEdited] = useState<ClientData>({} as ClientData)

  const handleOpenNewClientModal = () => {
    setIsNewClientModalOpen(true)
  }

  const handleCloseNewClientModal = () => {
    setIsNewClientModalOpen(false)
  }

  const handleOpenEditClientModal = (client: ClientData) => {
    setClientToBeEdited(client)
    setIsEditClientModalOpen(true)
  }

  const handleCloseEditClientModal = () => {
    setIsEditClientModalOpen(false)
  }

  return (
    <Grid
      item
      xs={12}
      height="100%"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: '100px 4%'
      }}
    >
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          height: 'max-content',
          minWidth: '280px',
          maxWidth: '1000px',
          m: '0 auto',
          p: '20px',
          background: '#1f2029',
          borderRadius: '10px',
          textAlign: 'left',
          overflowX: 'hidden'
        }}
      >
        <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', mb: '20px' }}>
          <Typography variant="h5" sx={{ color: 'white' }}>Clientes</Typography>
          <Button
            onClick={handleOpenNewClientModal}
            variant="contained"
            size="small"
            startIcon={<RiAddLine />}
          >
            Criar novo
          </Button>
        </Stack>
        <Stack sx={{ overflowX: 'auto' }}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#797d9a' }}>Nome</TableCell>
                <TableCell sx={{ color: '#797d9a' }} align="center">Número</TableCell>
                <TableCell sx={{ color: '#797d9a' }} align="center">N° Usina</TableCell>
                <TableCell sx={{ color: '#797d9a' }} align="center">Percentual de participação</TableCell>
                <TableCell sx={{ color: '#797d9a' }} align="center">Retorno</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map(client=> (
                <TableRow
                  key={client.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ color: 'white' }} component="th" scope="row">
                    {client.nomeCliente}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">{client.numeroCliente}</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">{client.usinas[0].usinaId}</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">{client.usinas[0].percentualDeParticipacao} %</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(client.usinas[0].percentualDeParticipacao * totalRevenuePrice / 100)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">
                  <Button
                    onClick={() => handleOpenEditClientModal(client)}
                    variant="outlined"
                    size="small"
                    startIcon={<RiPencilLine />}
                  >
                    Editar
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </TableContainer>
      <NewClientModal
        isNewClientModalOpen={isNewClientModalOpen}
        handleCloseNewClientModal={handleCloseNewClientModal}
      />
      <EditClientModal
        clientToBeEdited={clientToBeEdited}
        isEditClientModalOpen={isEditClientModalOpen}
        handleCloseEditClientModal={handleCloseEditClientModal}
      />
    </Grid>
  )
}