import React from 'react'
import { getNotes, updateArchive } from '../../AllNotesServices';
import { useState } from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { Button, Card, Popper } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PropTypes from 'prop-types';
import { PopperColor } from '../Popper/PopperColor';
import Typography from '@mui/material/Typography';


import { useSpring, animated } from '@react-spring/web';
import './GridNotes.css'

import { forwardRef } from 'react';





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
export const Archive = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };



  const [fetchData, setFetchData] = useState([])
  const [notes, setNotes] = useState(null)
  useEffect(() => {
    let res = getNotes()
      .then((data) => {
        let result = data.data.data.data;
        let newNotes = result.filter((notes) => notes.isArchived === true && notes.isDeleted === false)


        setFetchData(newNotes.reverse())

        // console.log(data)
      }).catch((e) => {
        console.log(e)
      })

      


  }, []);

  const unArchive = async (id) => {
    console.log(id)
    let archive = { noteIdList: [id], isArchived: false }
    let response = await updateArchive(archive);
    console.log(response)
    window.location.reload();
  }
  
  return (
    <div className='mainSectionGrid'>
      {fetchData.map((res, i) => {
        return (
          <div key={i} className='gridItemMain' style={{ backgroundColor: res.color }}>
            <div className='gridItem'>
              <div >
                <h3>{res.title}</h3>
                <p>{res.description}</p>
              </div>
              <div className='noteBoxIcon'>
                <PushPinOutlinedIcon style={{ fontSize: "30px" }} />
              </div>
            </div>
            <div className='noteBoxIcon'>
              <div className="srarchInput-icon" >
                <AddAlertOutlinedIcon />
              </div>
              <div className="srarchInput-icon">
                <PersonAddOutlinedIcon />
              </div>
              <div className="srarchInput-icon">
                <PopperColor />
              </div>
              <div className="srarchInput-icon">
                <ImageOutlinedIcon />
              </div>
              <div className="srarchInput-icon">
              {  res.isArchived ? <UnarchiveOutlinedIcon onClick={()=>unArchive(res.id)} />:<ArchiveOutlinedIcon /> } 
              </div>
              <div className="srarchInput-icon" onClick={handleClick}>
                <MoreVertOutlinedIcon />
                <Popper open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                      <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', p: 1, bgcolor: 'background.paper' }}>
                        <p><Button  fullWidth>Delete</Button></p>
                        <p><Button fullWidth>Add label</Button></p>
                        <p><Button fullWidth>Add Drawing</Button></p>
                        <p><Button fullWidth>Show tick boxes</Button></p>
                        <p> <Button fullWidth>Version history</Button></p>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </div>
            </div>
          </div>



        )
      })}
    </div >
  )
}
