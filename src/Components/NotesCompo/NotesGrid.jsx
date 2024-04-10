
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

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
import { useEffect } from 'react';
import { Deleting, getNotes } from '../../AllNotesServices';
import { useSpring, animated } from '@react-spring/web';


import { forwardRef } from 'react';
import { NotesList } from './NotesList';


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

export const NotesGrid = () => {
  const [fetchData, setFetchData] = useState([])
  const [resColor,setResColor]=useState()
  
 
  

  
  
  
  useEffect(() => {
    let res = getNotes()
      .then((data) => {
        let result = data.data.data.data;
        let newNotes = result.filter((notes) => notes.isArchived ===  notes.isDeleted )


        setFetchData(newNotes)

        // console.log(data)
      }).catch((e) => {
        console.log(e)
      })


  }, []);

  


  console.log(fetchData);
  return (

   
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px',flexDirection:'row'}}>
    {fetchData.map((d,i)=>{
      return(
        <NotesList noteObj={d} key={i} />
      )
    })}
    </div>

  )
}
