import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBarMui from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import DrawerBar from '../Drawer/DrawerBar';
import { Grid } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { useSelector, useDispatch } from 'react-redux';

import { SPINNER_LOADING, setFalse, setInputData, setTrue } from '../../Redux/Action';
import { Spinner } from '../NotesCompo/Spinner';
import '../NoteBox/NoteBox.css'




const Search = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '45%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(-2)})`,
    transition: theme.transitions.create('width'),
    width: '50%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function CustomAppBar({ handleDrawerOpen }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const theme = useTheme();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };



  const logOut = () => {
    localStorage.clear()
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={logOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem>
        <IconButton>

          <AccountCircle />

        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"

        >

        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );



  const refrecePage = () => {
    window.location.reload();
  }

  const dispatch = useDispatch();

  

  const isTrue = useSelector(state => state.isTrue);
  const initialSearchValue= useSelector(state=>state.inputData)
  const loadiang= useSelector(state=>state.isLoaging)
  // console.log(loadiang);
  

  const changeView = () => {
   
      // Dispatch the appropriate action based on the current state
      if (isTrue) {
        dispatch(setFalse());
      } else {
        dispatch(setTrue());
      }
      // Store the initial state before the action is dispatched
      
    

  }

  const[inputSearch,setInputSearch]=useState(initialSearchValue)
  const hangleSearch=(e)=>{
    setInputSearch(e.target.value)
    dispatch(setInputData(inputSearch));
   
  }
  
  return (
    <Box sx={{ flexGrow: 1, width: "100%", position: "fixed" }} >
      <AppBarMui position="static" sx={{ backgroundColor: 'white', border: '1px solid grey', boxShadow: "none", height: "70px" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"

            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon onClick={handleDrawerOpen} />
          </IconButton>
          <div>
            <img src="https://up.yimg.com/ib/th?id=OIP.hcr2l0kSdi7HLWWsgKkaOQAAAA&%3Bpid=Api&rs=1&c=1&qlt=95&w=78&h=107" alt="" height={'40px'} />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, color: 'black', marginLeft: '20px' }}
          >
            Keep
          </Typography>

          <Search className='navSerach_bar' style={{ color: 'black', width: "50%", height: '50px', borderRadius: "10px", backgroundColor: "#ecf0f2" }}>
            <SearchIconWrapper>
              <SearchIcon  />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              color='black'
              onChange={hangleSearch}
              name='searchValue'
              value={inputSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', marginRight: "10px" } }}>
            <IconButton
              size="large"
              style={{ marginRight: "10px" }}
            >
              <Badge>
                {loadiang ? <RefreshOutlinedIcon style={{ fontSize: "25px", }} onClick={refrecePage} /> :<Spinner/>}
              </Badge>
            </IconButton>

            <IconButton size="large">
              <Badge  >
                {isTrue ? <GridViewOutlinedIcon style={{ fontSize: "25px", }} onClick={changeView} /> : <ViewAgendaOutlinedIcon style={{ fontSize: "25px", }} onClick={changeView} />}
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              style={{ marginRight: "25px" }}
            >
              <Badge>
                <SettingsOutlinedIcon style={{ fontSize: "25px", }} />
              </Badge>
            </IconButton>

            <IconButton size="large">
              <Badge  >
                <AppsSharpIcon style={{ fontSize: "25px", }} />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              width="50px"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}

            >
              <AccountCircle style={{ fontSize: "25px", }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}

            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBarMui>
      {renderMobileMenu}
      {renderMenu}




      <Grid >
        {/* <DrawerBar openModal={open} handleDrawerOpen={handleDrawerHoverOpne} handleModalHoverClose={handleModalHoverClose}/> */}
      </Grid>
    </Box>
  );
}
