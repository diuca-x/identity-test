import React, { useContext, useState } from "react";
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
    RecaptchaVerifier
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
    auth.settings.appVerificationDisabledForTesting = false


    //for twostep captcha
    //const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container-id', undefined, auth);

    


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
                alert(error.message);
            });
    }
    const two_factor = () => {
        console.log(authUser)
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'captcha', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              onSignInSubmit();
              console.log("asd")
            }
          });
          

        multiFactor(authUser).getSession()
            .then(function (multiFactorSession) {
                // Specify the phone number and pass the MFA session.
                const phoneInfoOptions = {
                    phoneNumber: "+34722617903",
                    session: multiFactorSession
                };

                const phoneAuthProvider = new PhoneAuthProvider(auth);

                // Send SMS verification code.
                alert(phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier))
                return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, window.recaptchaVerifier);
            }).then(function (verificationId) {
                // Ask user for the verification code. Then:
                console.log("asd")
                let verificationCode = prompt("Enter code: ")

                const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
                const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

                // Complete enrollment.
                return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
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
           
            <button type="button" id="captcha" className="btn btn-primary" onClick={() => { two_factor() }}>Register two factor</button>

        </>
    )
}


export default Twofactor