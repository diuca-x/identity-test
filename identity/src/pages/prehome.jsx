import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    signInWithCustomToken
  } from 'firebase/auth';
import { useNavigate } from "react-router-dom";


const Prehome = () => {
    const {store, actions} = useContext(Context)
    const [user, setUser] = useState({});
    const navigate = useNavigate();


    const user_setinator = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };


    const firebaseConfig = {
        
            apiKey: "AIzaSyCzQzBZBD-kjo-eNrqvWgj8AubswSY0eX0",
            authDomain: "ordinal-verbena-407812.firebaseapp.com",
          
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app, {/* extra options */ });

    const signin =  async(e) => {
        e.preventDefault()
        
        
    }

    return (
        <>
        <div className="d-flex flex-column">
            <button type="button" className="btn btn-primary" onClick={() => {navigate("/signup", { replace: true })}}>
                to regular signupp
            </button>
            <button type="button" className="btn btn-primary" onClick={() => {navigate("/googlesignup", { replace: true })}}>to google signup</button>

        </div>
           

            
        </>
    )
}


export default Prehome