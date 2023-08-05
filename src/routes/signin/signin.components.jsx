import { signInWithGooglePopup, signInWithGoogleRedirect, CreateUserDocumentFromAuth } from "../../firebase/firebase";

import SignUpForm from "./sign-up.components/sign-up.components";

const Signin = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
       // console.log(response); initially to check the entire response
       
       const userDocRef = await CreateUserDocumentFromAuth(user);
    };
    const logGoogleRedirectUser = async () => {
        const {user} = await signInWithGoogleRedirect();
        console.log({user})
    };
    return (
        <div><h1> this is a sign in page </h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
        <button onClick={logGoogleRedirectUser}>Sign in with Redirect</button>
        <SignUpForm />
        </div>
    );
};

export default Signin;