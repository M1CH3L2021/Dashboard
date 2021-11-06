import { useState } from 'react';
import { Link } from 'react-router-dom'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles'
import {
  Typography,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';

import { FaUsers } from 'react-icons/fa'
import { RiLineChartLine } from 'react-icons/ri';
import { FiMenu, FiChevronLeft } from 'react-icons/fi'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <AppBar sx={{ background: '#1f2029', mb: '50px' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpenSidebar}
            edge="start"
            sx={{
              mr: 2,
              ...(isSidebarOpen && { display: 'none' })
            }}
          >
            <FiMenu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{
          sx:{ background: '#1f2029'}
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="temporary"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleCloseSidebar} size="large">
            <FiChevronLeft fill="white"/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ background: '#1f2029' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button>
              <ListItemIcon>
                <RiLineChartLine fill="white" fontSize={20} />
              </ListItemIcon>
              <ListItemText primary="Usina" />
            </ListItem>
          </Link>
          <Link to="/Clients" style={{ textDecoration: 'none', color: 'white' }}>
            <ListItem button>
              <ListItemIcon>
                <FaUsers fill="white" fontSize={20} />
              </ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  )
}