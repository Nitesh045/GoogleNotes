import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

import '../NoteBox/NoteBox.css';

import { useSpring, animated } from '@react-spring/web';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useState } from 'react';
import { UpdateColor } from '../../Service/AllNotesServices';
import { useDispatch } from 'react-redux';
import { setIsComponentRender } from '../../Redux/Action';
const Fade = React.forwardRef(function Fade(props, ref) {
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


export const PopperColor = ({ setNotesData, setNotesColor, action, noteId }) => {

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
 const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);

  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'spring-popper' : undefined;

  const color = ['#edf2fa', '#0acc81', '#e1a2ee', '#c6d972', '#e1a2ee', '#59e4c5', '#7cdd43']

  const updateColor = (color1) => {
    if (action === 'create') {
      setNotesData(prev => ({
        ...prev, color: color1
      }))
    } else if(action=='update') {
      let colorvalue = { noteIdList: [noteId], color: color1 }
      let updateColor = UpdateColor(colorvalue);
      console.log(updateColor)
     dispatch(setIsComponentRender())
    }
    setOpen((previousOpen) => !previousOpen);
  }




  return (
    <div>

      <ColorLensOutlinedIcon onClick={handleClick} />

      <Popper id={id} open={open} anchorEl={anchorEl} transition style={{ marginLeft: "20%" }}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box sx={{ m: 1, p: 1, bgcolor: 'background.paper', display: "flex", boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px', justifyContent: 'center',  margin:'0px'}} >
              {color.map((rang, index) => {
                return (
                  <div key={index} style={{ width: "35px", height: "35px", borderRadius: "50%", border: "solid 1px black", backgroundColor: rang, marginLeft: "20px" }}
                    onClick={() => updateColor(rang)}
                  ></div>
                )
              })}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  )
}
