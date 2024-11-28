"use client"
// src/lib/MusicContext.js
import { createContext, useContext } from 'react';

export const MusicContext = createContext();

export const useMusicContext = () => {
    const context = useContext(MusicContext);
    if (!context) {
        throw new Error('useMusicContext must be used within a MusicProvider');
    }
    return context;
};