import React, { useState } from 'react';
import Router from './Routing/Router';
import { Spinner } from './Components/NotesCompo/Spinner';
import {Toaster} from  'react-hot-toast'






function App() {

  return (
    <>
    <Router />
    <Toaster/>
    </>
  );
}

export default App;
