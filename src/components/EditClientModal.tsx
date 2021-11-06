import { FormEvent, useState, useEffect } from "react"
import { useData } from "../hooks/useData"
import {
  Modal,
  Button,
  Paper,
  Typography,
  TextField,
  Stack,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio
} from "@mui/material"

import { FiX } from "react-icons/fi"

interface ClientData {
  id?: number
  numeroCliente: number
  nomeCliente: string
  usinas: [{
    usinaId: number,
    percentualDeParticipacao: number
  }]
}

interface EditClientModalProps {
  clientToBeEdited: ClientData
  isEditClientModalOpen: boolean
  handleCloseEditClientModal: () => void
}


export function EditClientModal({ clientToBeEdited, isEditClientModalOpen, handleCloseEditClientModal }: EditClientModalProps) {
  const { editClient, excludeClient } = useData()
  const [clientName, setClientName] = useState('')
  const [factoryNumber, setFactoryNumber] = useState(1)
  const [participationPercentage, setParticipationPercentage] = useState(0)

  const handleEditClient = (event: FormEvent) => {
    event.preventDefault()

    editClient({
      id: clientToBeEdited.id,
      nomeCliente: clientName,
      usinas: [{
        usinaId: factoryNumber,
        percentualDeParticipacao: participationPercentage
      }]
    })

    setClientName('')
    setFactoryNumber(0)
    setParticipationPercentage(0)

    handleCloseEditClientModal()
  }

  const handleChangeParticipationPercentage = (value: number) => {
    if (value >= 0 && value <= 100) {
      setParticipationPercentage(value)
    }
  }

  const handleExcludeClient = () => {
    excludeClient(clientToBeEdited)
    handleCloseEditClientModal()
  }

  return (
    <Modal
      open={isEditClientModalOpen}
      onClose={handleCloseEditClientModal}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '30px 4%'
      }}
    >
      <Paper sx={{
        position: 'relative',
        p: '60px 30px 50px',
        background: '#1f2029',
        width: '100%',
        maxWidth: 500
      }}>
        <Button
          onClick={handleCloseEditClientModal}
          color="error"
          variant="text"
          size="medium"
          sx={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            borderRadius: '50%',
            height: '35px',
            width: '35px',
            minWidth: '0px'
          }}
        >
          <FiX fontSize={20} />
        </Button>
        <Typography mb="30px" fontSize={20} color="white">
          {clientToBeEdited ? `Editando cliente ${clientToBeEdited.nomeCliente}` : 'sla'}
        </Typography>
        <form onSubmit={handleEditClient}>
          <TextField
            value={clientName}
            onChange={event => setClientName(event.target.value)}
            required
            label="Nome"
            inputProps={{
              maxLength: '30'
            }}
            variant="filled"
            color="primary"
            sx={{
              width: '100%',
              background: 'white',
              borderRadius: '4px'
            }}
          />
          <Stack direction="column" spacing={2} mt={2} mb={2}>
            <FormLabel component="legend" sx={{ color: 'white' }}>
              Número da usina
            </FormLabel>
            <RadioGroup
              aria-label="Número da usina"
              defaultValue="1"
              sx={{
                color: 'white'
              }}
            >
              <FormControlLabel
                label="1"
                control={
                  <Radio
                    value="1"
                    onChange={event => setFactoryNumber(Number(event.target.value))}
                  />
                }
              />
            </RadioGroup>
            <TextField
              value={participationPercentage}
              onChange={event => handleChangeParticipationPercentage(Number(event.target.value))}
              required
              type="number"
              label="Percentual de participação"
              variant="filled"
              color="primary"
              sx={{
                width: '100%',
                background: 'white',
                borderRadius: '4px'
              }}
            />
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap="10px">
            <Button
              onClick={handleExcludeClient}
              color="error"
              variant="contained"
              size="large"
              sx={{ flexGrow: 1, p: 2 }}
            >
              Excluir cliente
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ flexGrow: 1, p: 2 }}
            >
              Salvar Edição
            </Button>
          </Stack>
        </form>
      </Paper>
    </Modal>
  )
}