import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '@/library/firebaseConfig.js';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/router';

const Form = styled.form`
    font-family: 'Geist', sans-serif;    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35vw;
    border: 1px solid #E4E0E1;
    border-radius: 5px;
    margin: 100px auto;
    padding: 20px;
`;

const Heading = styled.h1`
    font-weight: 600;
    font-size: 30px;
`;

const FieldHeader = styled.h1`
    margin-top: 20px;
    align-self: flex-start;
    font-weight: 300;
    font-size: 15px;
`;

const NameInputs = styled.div`
    width: 47%
`;

const NameInputContainer = styled.div`
    width: 100%;
    display: flex;    
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
`;

const NameInput = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    font-size: 15px;
    padding: 2px;
    width: 100%;
`;

const EmailInput = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    width: 100%;
    font-size: 15px;
    padding: 2px;
    padding-left: 5px;
`;

const PasswordInput = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    width: 100%;
    font-size: 15px;
    padding: 2px;
    padding-left: 5px;
`;

const ShowContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

const Show = styled.input`
    width: 16px;
    height: 16px;
    margin: 5px;
`;

const ShowText = styled.p`
    font-size: 15px;
    font-weight: 300;
    padding-top: 4px;
`;

const Submit = styled.button`
    background-color: #0C0950;
    border-radius: 3px;
    color: white;
    padding: 10px 30px;
    font-size: 15px;
    transition: background-color 0.5s ease;

    &:hover {
        background-color: #4D55CC;
    }
`;

const LoginTextContainer = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const LoginText = styled.p`
    font-size: 13px;
    font-weight: 500;
`;

const Redirect = styled.a`
    font-size: 13px;
    font-weight: 500;
    color: blue;
    text-decoration: underline;
`;

const StatusText = styled.p`
    font-size: 15px;
    font-weight: 300;
    color: red;
`;

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shown, setShown] = useState(false);
    const [status, setStatus] = useState("");
    const router = useRouter();

    const verifyLogin = (event) => {
        event.preventDefault();
        console.log(email + " " + password);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setStatus("Log in succesful. Redirecting...");
                setTimeout(() => {
                    router.push("/");
                } ,3000);
                console.log("Log in succesful. ", userCredential.user);
            })
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    setStatus("No account found with this email.");
                    console.log("No account found with this email");
                }
                else if (error.code === "auth/wrong-password") {
                    setStatus("Incorrect password.");
                    console.log("Incorrect password");
                }
                else {
                    setStatus("Error logging in.");
                    console.log("Login failed: ", error.message);
                }
            });
    };

    return (
        <Form onSubmit={verifyLogin}>
            <Heading>Login to your account</Heading>
            <hr style={{ border: "1px solid #E4E0E1", width: "100%", margin: "10px 0px 10px 0px" }}/>
            <FieldHeader>PSU Email</FieldHeader>
            <EmailInput type="email" placeholder="abc1234@psu.edu" onChange={(e) => setEmail(e.target.value)}></EmailInput>
            <FieldHeader>Password</FieldHeader>
            <PasswordInput type = {shown ? "text" : "password" } placeholder="Lebron@James123" onChange={(e) => setPassword(e.target.value)}></PasswordInput>
            <ShowContainer>
                <Show type="checkbox" checked={shown} onChange={() => setShown(!shown)}></Show>
                <ShowText>Show Password</ShowText>
            </ShowContainer>
            <StatusText>{ status }</StatusText>
            <Submit type="submit">Login</Submit>
            <LoginTextContainer>
                <LoginText>Don't have an account yet? <Redirect href="/auth/signup">Create an account now</Redirect>.</LoginText>
            </LoginTextContainer>
        </Form>
    );
}