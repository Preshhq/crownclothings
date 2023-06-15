import { signInWithGooglePopup, CreateUserDocumentFromAuth } from "../../firebase/firebase";

const Signin = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
       // console.log(response); initially to check the entire response
       
       const userDocRef = await CreateUserDocumentFromAuth(user);
    };
    return (
        <div><h1> this is a sign in page </h1>
        <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    );
};

export default Signin;