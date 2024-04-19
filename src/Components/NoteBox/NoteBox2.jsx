import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
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
import { Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import './NoteBox.css';
import { useRef } from 'react';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import PropTypes from 'prop-types';
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';
import { forwardRef } from 'react';
import { PopperColor } from '../Popper/PopperColor';
import { useState } from 'react';
import { useEffect } from 'react';


const Fade = forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});
Fade.propTypes = {
    children: PropTypes.element,
    in: PropTypes.bool,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
};
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export const SearchInput2 = ({ handleInputClose }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notesData, setNotesData] = useState({
        title: '',
        description: '',
        color: '#ffffff',
        isArchived: false,
        isDeleted:false

    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;


    const handleInputChange = (e) => {
        setNotesData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const handleArchive = () => {
        setNotesData((prev) => ({
            ...prev,
            isArchived: !prev.isArchived
        }))
    }

 console.log(notesData.isArchived)
    return (

        <Grid
            sx={12}
            lg={8}
            xl={10}
            display={'grid'}
            justifyContent={'center'}
            alignContent={'center'}
            height={'200px'}
            width={'100%'}
        >
            <Box>
                <Search
                    style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                        color: 'black',
                        width: '600px',
                        height: "auto",
                        borderRadius: '10px',
                        marginLeft:'85px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        backgroundColor: notesData.color ? notesData.color : null

                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <StyledInputBase
                            placeholder="Title"
                            inputProps={{ 'aria-label': 'search' }}
                            color=""
                            onChange={handleInputChange}
                            value={notesData.title}
                            name='title'

                        />
                        <PushPinOutlinedIcon className="srarchInput-icon" style={{ fontSize: "30px" }} />
                    </div>
                    <div>
                        <TextareaAutosize
                            placeholder="description"
                            inputProps={{ 'aria-label': 'search' }}
                            color=""
                            value={notesData.description}
                            name='description'
                            rows={1}
                            onChange={handleInputChange}
                            style={{ border: 'none', width: "100%", outline: "none", paddingLeft: "23px", fontSize: '15px', marginTop: "20px", backgroundColor: notesData.color ? notesData.color : null }}

                        />
                    </div>
                    <div className="searhInout-parent">
                        <div className='SearchInput-child-1' >
                            <div className="srarchInput-icon" >
                                <AddAlertOutlinedIcon />
                            </div>
                            <div className="srarchInput-icon">
                                <PersonAddOutlinedIcon />
                            </div>
                            <div className="srarchInput-icon">
                                <PopperColor action='create' setNotesData={setNotesData}  />
                            </div>
                            <div className="srarchInput-icon">
                                <ImageOutlinedIcon />
                            </div>
                            <div className="srarchInput-icon">
                                 {  notesData.isArchived ? <UnarchiveOutlinedIcon onClick={handleArchive}/>:<ArchiveOutlinedIcon onClick={handleArchive}/> } 
                            </div>
                            <div className="srarchInput-icon" onClick={handleClick}>
                                <MoreVertOutlinedIcon />
                                <Popper id={id} open={open} anchorEl={anchorEl} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps}>
                                            <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', p: 1, bgcolor: 'background.paper' }}>
                                                <p><Button fullWidth>Add label</Button></p>
                                                <p><Button fullWidth>Add Drawing</Button></p>
                                                <p><Button fullWidth>Show tick boxes</Button></p>
                                                <p> <Button fullWidth>Version history</Button></p>
                                            </Box>
                                        </Fade>
                                    )}
                                </Popper>
                            </div>

                            <div className="srarchInput-icon">
                                <UndoOutlinedIcon />
                            </div>
                            <div className="srarchInput-icon">
                                <RedoOutlinedIcon />
                            </div>
                        </div>
                        <div className='srarchInput-button'>
                            <Button onClick={() => handleInputClose(notesData)}>Close</Button>
                        </div>
                    </div>
                </Search>
            </Box>
        </Grid>

    );
};