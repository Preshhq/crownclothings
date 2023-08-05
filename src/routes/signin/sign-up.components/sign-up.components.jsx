import { useState } from "react";
import { createAuthUserWithEmailandPassword, CreateUserDocumentFromAuth } from "../../../firebase/firebase";
import FormInput from "../../../components/form-input/forms-input.component";
import './sign-up-form.style.scss';
import Button from "./button.component/button.component";

const defaultFormFields = {
    displayName : '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async(event) =>{
        event.preventDefault();

        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailandPassword(
                email,
                password
                );
        
                await CreateUserDocumentFromAuth(user, {displayName});
                resetFormFields();
        } catch (error) {
            if(error.code=== 'auth/email-already-in-use'){
                alert('Cannot create user, email already exists');
            } else {
            console.log('user creation encountered an error', error);
            }
        }
    };

    const handleChange = (event) =>{
            const {name, value} = event.target;
            setFormFields({...formFields,[name]: value});
    };

      return(
        <div className="sign-up-container">
        <h2> Don't have an account?</h2>
        <span> Sign Up With Email and Password</span>
        <form onSubmit={handleSubmit}>
        
        <FormInput label=" Display Name" type="text" required onChange={handleChange} name= "displayName" value={displayName}/>

        <FormInput label="Email" type="email" required onChange={handleChange} name= "email" value={email}/>

        <FormInput label="Password" type="password" required onChange={handleChange} name= "password" value={password}/>

        <FormInput label="Confirm Password" type="password" required onChange={handleChange} name= "confirmPassword" value={confirmPassword}/>

        <Button buttonType='default' type="submit"> Sign Up</Button>
        </form>

        </div>

      );

}

export default SignUpForm;