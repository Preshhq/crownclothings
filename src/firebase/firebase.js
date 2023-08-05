// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider,
        createUserWithEmailAndPassword 
        } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0NgAQFvse8Gc2ahsMgSU3FgBBSRuQrDI",
  authDomain: "crown-clothings-ff46e.firebaseapp.com",
  projectId: "crown-clothings-ff46e",
  storageBucket: "crown-clothings-ff46e.appspot.com",
  messagingSenderId: "472045455221",
  appId: "1:472045455221:web:b344566d481698f54b753c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const CreateUserDocumentFromAuth = async(
  userAuth, 
  additionalInformation = {}
  )=> {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);
  const userDocSnapshot = await getDoc(userDocRef);
  console.log(userDocSnapshot);
  console.log(userDocSnapshot.exists());

  if(!userDocSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });

    } catch (error) {
    console.log('error creating the user', error.message);
    }
  } 
  return userDocRef;
};

export const createAuthUserWithEmailandPassword = async (email,password)=>{
 if(!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);
};