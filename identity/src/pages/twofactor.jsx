import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import { initializeApp } from 'firebase/app';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    getAuth,
    signInWithCustomToken
} from 'firebase/auth';

import {
    multiFactor, PhoneAuthProvider, PhoneMultiFactorGenerator,
    RecaptchaVerifier,getMultiFactorResolver
} from "firebase/auth";


const Twofactor = () => {
    const { store, actions } = useContext(Context)
    const [user, setUser] = useState({});
    const [authUser, setAuthUser] = useState()
    const [cresponse, setResponse] = useState()
    const user_setinator = (event) => {
        setUser({ ...user, [event.target.id]: event.target.value });
    };


    const firebaseConfig = {

        apiKey: "AIzaSyCzQzBZBD-kjo-eNrqvWgj8AubswSY0eX0",
        authDomain: "ordinal-verbena-407812.firebaseapp.com",

    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app, {/* extra options */ });
    auth.useDeviceLanguage();


    //for twostep captcha
    useEffect(() => {
        
        const recaptchaVerifier =  new RecaptchaVerifier(auth, 'captcha', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                
                onSolvedRecaptcha();
            }
        });
        setResponse(recaptchaVerifier)
      }, []);


    const two_factor = () => {
        console.log(authUser)
       


        multiFactor(authUser).getSession()
            .then(function (multiFactorSession) {
                // Specify the phone number and pass the MFA session.
                const phoneInfoOptions = {
                    phoneNumber: "+34722617903",
                    session: multiFactorSession
                };

                const phoneAuthProvider = new PhoneAuthProvider(auth);

                // Send SMS verification code.
                alert(cresponse)
                
                phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, cresponse)
                .then(function (verificationId) {
                    // verificationId will be needed to complete enrollment.
                    let verificationCode = prompt("Enter code: ")

                    const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                    const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

                    // Complete enrollment.
                    return multiFactor(authUser).enroll(multiFactorAssertion, "+34722617903");
                });

            })
    }

    const signin = async (e) => {
        e.preventDefault()
       

        signInWithEmailAndPassword(auth, user.email, user.password)
            .then((userCredential) => {
                // Signed in 
                const user1 = userCredential.user;
                setAuthUser(user1)
                console.log(user1)

            })
            .catch((error) => {
                if (error.code == 'auth/multi-factor-auth-required') {
                    // The user is a multi-factor user. Second factor challenge is required.
                    const resolver = getMultiFactorResolver(auth, error);
                    const phoneInfoOptions = {
                        multiFactorHint: resolver.hints[0],
                        session: resolver.session
                    };
                    const phoneAuthProvider = new PhoneAuthProvider(auth);
                   

                    phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, cresponse)
                        .then(function (verificationId) {
                            // verificationId will be needed for sign-in completion.
                            let verificationCode = prompt("Enter code: ")
                            const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                            const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
                            resolver.resolveSignIn(multiFactorAssertion)
                            .then(function (userCredential) {
                                // userCredential will also contain the user, additionalUserInfo, optional
                                // credential (null for email/password) associated with the first factor sign-in.
                        
                                // For example, if the user signed in with Google as a first factor,
                                // userCredential.additionalUserInfo will contain data related to Google
                                // provider that the user signed in with.
                                // - user.credential contains the Google OAuth credential.
                                // - user.credential.accessToken contains the Google OAuth access token.
                                // - user.credential.idToken contains the Google OAuth ID token.
                                const user1 = userCredential.user;
                                setAuthUser(user1)
                                console.log(userCredential)
                                

                            }).catch((error) =>{
                                alert(error.code)
                            })
                        
                        }).catch((error) =>{
                            alert(error.code)
                        })
                    // ...
                } else if (error.code == 'auth/wrong-password') {
                    // Handle other errors such as wrong password.
                }
                alert(error.message);
            });
    }

    return (
        <>
            <h1>First Login</h1>
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

            <button type="button"  className="btn btn-primary" onClick={() => { two_factor() }}>Register two factor</button>
            <div id="captcha"></div>

        </>
    )
}


export default Twofactor