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
import CustomAppBar from './AppBar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlined from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
const drawerWidth = 240;

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

export default function Main1() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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

  const archiveRoute = () => {
    navigate('/archive', { state: { widthValue: drawerWidth } })
    console.log(drawerWidth)
  }
  const notesRoute = () => {
    navigate('/notes', { state: { widthValue: drawerWidth } })
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar handleDrawerOpen={handleDrawerOpen} />

      <Drawer variant="permanent" open={open} onMouseEnter={handleDrawerHoverOpne} onMouseLeave={handleModalHoverClose}>

        <List>

          <ListItem disablePadding sx={{ display: 'block', backgroundColor: "lightyellow", borderRadius: '40px', width: '100%' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,


              }}
              onClick={notesRoute}
            >

              <LightbulbOutlinedIcon
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}

              >

                {/* {index  == 0 ? <LightbulbOutlinedIcon/>:null}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </LightbulbOutlinedIcon>


              <ListItemText primary={'Notes'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}

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
          <ListItem disablePadding sx={{ display: 'block' }} >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,

              }}
              onClick={archiveRoute}
            >

              <ArchiveOutlined
                sx={{
                  minWidth: 30,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "grey"
                }}
              >
                {/* {index  == 0 ? <LightbulbOutlinedIcon/>:null}
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ArchiveOutlined>


              <ListItemText primary={'Archive'} sx={{ opacity: open ? 1 : 0, }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,


              }}

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
