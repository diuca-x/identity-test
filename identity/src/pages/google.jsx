import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { jwtDecode } from "jwt-decode";

import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    signInWithCustomToken,
    signInWithPopup,
    GoogleAuthProvider,

} from 'firebase/auth';
import { GoogleLogin } from '@react-oauth/google';

//for two step capcha widget



const Google = () => {
    const { store, actions } = useContext(Context)
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
    const provider = new GoogleAuthProvider();
    auth.useDeviceLanguage()
    provider.setCustomParameters({
        'login_hint': 'user@example.com'
    });



    const signin = async (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user)
                alert("login succesfull")
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                alert(error.message)
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
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
                <button type="submit" className="btn btn-primary" onClick={(e) => { signin(e) }}>singin with google</button>

                <div id="g_id_onload"
                    data-client_id="330271854417-jlvht3gh4akfbq7mtjvgm7um96jd5ca6.apps.googleusercontent.com"
                    data-context="signin"
                    data-ux_mode="popup"
                    data-callback=
                    'console.log("asd")'
                    data-itp_support="true">
                </div>

                <div className="g_id_signin"
                    data-type="standard"
                    data-shape="pill"
                    data-theme="filled_blue"
                    data-text="signin_with"
                    data-size="large"
                    data-logo_alignment="left">
                </div>
                {// abajo boton de google de react, arriba el de la docu que no anda 
                }


                <GoogleLogin
                    onSuccess={credentialResponse => {
                        let data  = jwtDecode(credentialResponse.credential)
                        console.log(data);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />

            </form>
        </>
    )
}


export default Google