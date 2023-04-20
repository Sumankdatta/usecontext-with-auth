import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, sendPasswordResetEmail, FacebookAuthProvider, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.init';

export const AuthContext=createContext();
const auth=getAuth(app);

const UserContext = ({children}) => {
    const [user,setUser]=useState({});
    const [loading,setLoading]=useState(true);

    const faceBookProvider = new FacebookAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const updateUserProfile=(name,url)=>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:url
        })
    }

    const emailVerification=()=>{
        return sendEmailVerification(auth.currentUser)
    }
    
    const userLogin=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    const resetPasswordEmail=(email)=>{
       return sendPasswordResetEmail(auth,email)
    }

    const facebookLogin=()=>{
        return signInWithPopup(auth,faceBookProvider)
    }
    const githubLogin=()=>{
       return signInWithPopup(auth,githubProvider)
    }
    const googleLogin=()=>{
        return signInWithPopup(auth,googleProvider)
    }
    const logOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unsubscribe()
        }
    },[])
    

    const authInfo={loading,googleLogin,githubLogin,facebookLogin, resetPasswordEmail,logOut,user,updateUserProfile,userLogin,createUser,emailVerification};
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;