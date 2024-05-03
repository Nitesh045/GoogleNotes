// import React from 'react'
// import CustomAppBar from './AppBar'
// import { SearchInput1 } from './SearchInput1'
// import DrawerBar from './DrawerBar'
// import { Outlet } from 'react-router-dom'

// export default function Main1  () {
//   return (
//     <div>
//         <DrawerBar />

//     </div>
//   )
// }

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet, useNavigate } from 'react-router-dom';
import CustomAppBar from '../Header/AppBar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './Drawer.css'
import { useState } from 'react';
const drawerWidth = 240;
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setArchiveTitle, setNotesTitle, setTrashTitle } from '../../Redux/Action';


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DrawerBar() {


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeLinkArchive, setActiveLinkArchive] = useState('');
  const [activeLinkTrash, setActiveLinkTrash] = useState('');
  const [activeLinkHome, setActiveLinkHome] = useState('activeStyle');
  const [activeRemind, setActiveRemind] = useState('')

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };


  const handleDrawerHoverOpne = () => {
    setOpen(true)
  };
  const handleModalHoverClose = () => {
    setOpen(false)
  }


  const dispatch = useDispatch();
  const archiveRoute = () => {
    navigate('/archive', { state: { widthValue: drawerWidth } })
    console.log(drawerWidth)
    setActiveLinkArchive('activeStyle')
    setActiveLinkHome('')
    setActiveLinkTrash('')
    dispatch(setArchiveTitle())
    setActiveRemind('')

  }
  const notesRoute = () => {
    navigate('/', { state: { widthValue: drawerWidth } })
    setActiveLinkArchive('')
    setActiveLinkHome('activeStyle')
    setActiveLinkTrash('')
    dispatch(setNotesTitle())
    setActiveRemind('')
  }

  const trashRoute = () => {
    navigate('/trash')
    setActiveLinkArchive('')
    setActiveLinkHome('')
    setActiveLinkTrash('activeStyle')
    dispatch(setTrashTitle())
    setActiveRemind('')
  }
  const handleReminder = () => {
    navigate('/reminder')
    setActiveLinkArchive('')
    setActiveLinkTrash('')
    setActiveLinkHome('')
    setActiveRemind('activeStyle')
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar handleDrawerOpen={handleDrawerOpen} />

      <Drawer variant="permanent" open={open} onMouseEnter={handleDrawerHoverOpne} onMouseLeave={handleModalHoverClose}>

        <List>

          <ListItem disablePadding className={activeLinkHome} sx={{ display: 'block', borderRadius: '20px', width: '100%' }}>
            <ListItemButton
              sx={{
                minHeight: 50,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,


              }}
              className='listItem-button-drawer'
              onClick={notesRoute}
            >

              <LightbulbOutlinedIcon
                sx={{
                  minWidth: 40,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}

              >


              </LightbulbOutlinedIcon>


              <ListItemText primary={'Notes'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: '20px' }} className={activeRemind}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}
              onClick={handleReminder}
              className='listItem-button-drawer'
            >
              <NotificationsNoneOutlinedIcon
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {/* {index  == 0 ? <LightbulbOutlinedIcon/>:null}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </NotificationsNoneOutlinedIcon>

              <ListItemText primary={'Reminder'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding className={activeLinkArchive} sx={{ display: 'block', borderRadius: '20px' }} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}
              onClick={archiveRoute}
              className='listItem-button-drawer'
            >

              <ArchiveOutlined
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                }}
              >
                {/* {index  == 0 ? <LightbulbOutlinedIcon/>:null}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ArchiveOutlined>


              <ListItemText primary={'Archive'} sx={{ opacity: open ? 1 : 0, }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block', borderRadius: '20px' }} className={activeLinkTrash}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,


              }}
              className='listItem-button-drawer'
              onClick={trashRoute}
            >
              <DeleteOutlineOutlinedIcon
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}

              >
                {/* {index  == 0 ? <LightbulbOutlinedIcon/>:null}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </DeleteOutlineOutlinedIcon>

              <ListItemText primary={'Bin'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>


      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
}
