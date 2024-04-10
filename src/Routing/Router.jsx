import React from 'react'
import {   Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import DrawerBar from '../Components/Drawer/DrawerBar';
import { NotesGrid } from '../Components/NotesCompo/NotesGrid';
import { Archive } from '../Components/NotesCompo/Archive';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthRoute } from './AuthRoute';
import { NoteInput } from '../Components/Dashboard/DashBoard';
import { TrashNotes } from '../Components/NotesCompo/TrashNotes';


export default function Router() {
    return (
        
    
        <BrowserRouter>
            <Routes>
                <Route path='/login' element={ <AuthRoute><Login /></AuthRoute>} />
                <Route path='/register' element={<AuthRoute><SignUp /></AuthRoute>} />
                <Route path='/' element={<ProtectedRoute><DrawerBar /></ProtectedRoute>}>
                    <Route path='/' element={<NoteInput />} />
                    <Route path='/archive' element={<Archive />} />
                    <Route path='/trash' element={<TrashNotes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
