import { FormEvent, useState } from "react"
import { useData } from "../hooks/useData"
import {
  Modal,
  Button,
  Paper,
  TextField,
  Stack,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio
} from "@mui/material"

import { FiX } from 'react-icons/fi'

interface NewClientModalProps {
  isNewClientModalOpen: boolean
  handleCloseNewClientModal: () => void
}

export function NewClientModal({ isNewClientModalOpen, handleCloseNewClientModal }: NewClientModalProps) {
  const [clientName, setClientName] = useState('')
  const [factoryNumber, setFactoryNumber] = useState(1)
  const [participationPercentage, setParticipationPercentage] = useState(0)
  const { clients, createClient } = useData()

  const handleCreateNewClient = (event: FormEvent) => {
    event.preventDefault()

    createClient({
      numeroCliente: clients.length + 1,
      nomeCliente: clientName,
      usinas: [{
        usinaId: factoryNumber,
        percentualDeParticipacao: participationPercentage
      }]
    })

    setClientName('')
    setFactoryNumber(0)
    setParticipationPercentage(0)

    handleCloseNewClientModal()
  }

  const handleChangeParticipationPercentage = (value: number) => {
    if (value >= 0 && value <= 100) {
      setParticipationPercentage(value)
    }
  }

  return (
    <Modal
      open={isNewClientModalOpen}
      onClose={handleCloseNewClientModal}
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
          onClick={handleCloseNewClientModal}
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
        <form onSubmit={handleCreateNewClient}>
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
          <Stack direction="column" spacing={2} mt={2}>
            <FormLabel component="legend" sx={{ color: 'white' }}>Número da usina</FormLabel>
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
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: '100%', marginTop: 2, p: 2 }}
          >
            Criar novo cliente
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}