import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import {GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'

const auth = getAuth(app)
export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = () =>{
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (name, photo) =>{
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name,
            photoURL: photo
        })
    }
    const verifyEmail = () =>{
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }
    const logOut = () =>{
        return signOut(auth)
    }
    const UserLogin = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const authInfo ={
        user, setLoading, loading, createUser, updateUser, verifyEmail, signInWithGoogle, logOut, UserLogin
    }

    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth, currentUser =>{
            setLoading(false)
            setUser(currentUser)
        })
        return () =>{
            unsubcribe()
        }
    },[])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;