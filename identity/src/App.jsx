import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

import Home from './pages/home';
import Prehome from './pages/prehome';
import Google from './pages/google';


function App() {

    const basename = import.meta.env.BASENAME || "";


    return (
        <div>

                <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<Home />} path="/signup" />
                        <Route element={<Prehome />} path="/" />
                        <Route element={<Google />} path="/googlesignup" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>


                </BrowserRouter>
        </div>
    );
}

export default injectContext(App)
