import React, { useState } from "react";

import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth
  } from 'firebase/auth';


const Home = () => {

    const [user, setUser] = useState({});
    const user_setinator = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
      };


    const firebaseConfig = {
        
            apiKey: "AIzaSyCzQzBZBD-kjo-eNrqvWgj8AubswSY0eX0",
            authDomain: "ordinal-verbena-407812.firebaseapp.com",
          
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app, {/* extra options */ });

    const signin =  (e) => {
        e.preventDefault()
        console.log(user)
        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                document.getElementById("message").innerHTML = error.message;
            });
    }

    return (
        <>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e) => {
                    user_setinator(e);
                  }} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => {
                    user_setinator(e);
                  }} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => { signin(e) }}>Submit</button>
            </form>
        </>
    )
}


export default Home