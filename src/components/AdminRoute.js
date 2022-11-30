import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import {  Navigate } from "react-router-dom";

export default function AdminRoute({children}) {
    const { currentUser } = useAuth();  
    if (currentUser) {
        if(currentUser.uid === "xE5wdJl2u8aHhIqbQq4dqXOBUKt1") {
            return children
        }
    }
    
    return (
        <Navigate to="/admin-panel" />
    )
}
