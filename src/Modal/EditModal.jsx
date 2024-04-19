import React, { useEffect } from 'react'
import Modal from 'react-modal';
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
import { PopperColor } from '../Components/Popper/PopperColor';
import { useState } from 'react';
import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import { EditeNotes } from '../AllNotesServices';
import './EditModal.css'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        
    },
};
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
export const EditModal = ({ modalIsOpen, setIsOpenModal, notdataedit,setIsComponentRender }) => {
console.log(notdataedit)
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((previousOpen) => !previousOpen);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpenModal(false);
    }

  

    const [editNotes, seteditNotes] = useState({
        title: "",
        description: "",
        color:"",
        isArchived: false,
        isDeleted: false
    });
    useEffect(() => {
        console.log(notdataedit)
        seteditNotes({
            title: notdataedit?.title,
            description: notdataedit?.description,
            color: notdataedit?.color,
            isArchived: notdataedit?.isArchived,
            isDeleted: notdataedit?.isDeleted
        })
    }, [modalIsOpen])

    const handleChangeEdit = (e) => {
        seteditNotes((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };
    const handleInputClose = () => {
        let id = notdataedit.id
        console.log(editNotes)
         EditeNotes(id,editNotes)
        .then((d)=>{
             console.log(d)
             
        }).catch((err)=>{
            console.log(err)
        })
        setIsOpenModal(false);
        setIsComponentRender(prev=>!prev)
    }

    return (
        <div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                
                
            >
                <Grid
                    sx={12}
                    lg={8}
                    xl={10}
                    display={'grid'}
                    justifyContent={'center'}
                    alignContent={'center'}
                    style={{backgroundColor:notdataedit.color}}
                // height={'300px'}
                // width={'100px'}
                >
                    <Box>
                        <Search
                            style={{
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
                                color: 'black',
                               
                                height: "auto",
                                borderRadius: '10px',
                                marginLeft: '',
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',


                            }}
                        >
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <StyledInputBase
                                    placeholder="heading"
                                    inputProps={{ 'aria-label': 'search' }}
                                    color=""

                                    onChange={handleChangeEdit}
                                    value={editNotes.title}
                                    name='title'

                                />
                                <PushPinOutlinedIcon className="srarchInput-icon" style={{ fontSize: "30px" }} />
                            </div>
                            <div>
                                <TextareaAutosize
                                    placeholder="heading"
                                    inputProps={{ 'aria-label': 'search' }}
                                    color=""
                                    
                                    onChange={handleChangeEdit}
                                    value={editNotes.description}
                                    name='description'
                                    rows={1}

                                    style={{ border: 'none', width: "100%", outline: "none", paddingLeft: "23px", fontSize: '15px',backgroundColor:notdataedit.color }}

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
                                        <PopperColor action='create' />
                                    </div>
                                    <div className="srarchInput-icon">
                                        <ImageOutlinedIcon />
                                    </div>
                                    <div className="srarchInput-icon">
                                        <ArchiveOutlinedIcon />
                                    </div>
                                    <div className="srarchInput-icon" onClick={handleClick} >
                                        <MoreVertOutlinedIcon />
                                        <Popper open={open} anchorEl={anchorEl} transition>
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
                                    <Button onClick={() => handleInputClose()}>Close</Button>
                                </div>
                            </div>
                        </Search>
                    </Box>
                </Grid>
            </Modal>
        </div>
    )
}
