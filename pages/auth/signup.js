import { useState } from 'react';
import styled from 'styled-components';
import { auth } from '@/library/firebaseConfig.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

const RestrictionList = styled.ol`
    font-size: 15px;
    align-self: flex-start;
    margin-bottom: 30px;
`;

const ListItem = styled.li`
    font-size: 15px;
    font-weight: 300;
    margin-left: 15px;
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

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shown, setShown] = useState(false);

    return (
        <Form>
            <Heading>Create account</Heading>
            <hr style={{ border: "1px solid #E4E0E1", width: "100%", margin: "10px 0px 10px 0px" }}/>
            <FieldHeader>Full Name (First, Last)</FieldHeader>
            <NameInputContainer>
                <NameInputs>
                    <NameInput type="text" placeholder="Nautica" onChange={(e) => setFirstName(e.target.value)}></NameInput>
                </NameInputs>
                <NameInputs>
                    <NameInput type="text" placeholder="Malone" onChange={(e) => setLastName(e.target.value)}></NameInput>
                </NameInputs>
            </NameInputContainer>
            <FieldHeader>PSU Email</FieldHeader>
            <EmailInput type="email" placeholder="abc1234@psu.edu" onChange={(e) => setEmail(e.target.value)}></EmailInput>
            <FieldHeader>Password</FieldHeader>
            <PasswordInput type = {shown ? "text" : "password" } placeholder="Lebron@James123" onChange={(e) => setPassword(e.target.value)}></PasswordInput>
            <ShowContainer>
                <Show type="checkbox" checked={shown} onChange={() => setShown(!shown)}></Show>
                <ShowText>Show Password</ShowText>
            </ShowContainer>
            <FieldHeader>Password Restrictions:</FieldHeader>
            <RestrictionList>
                <ListItem>Password must be from 8 to 30 characters long.</ListItem>
                <ListItem>Password must contain at least one uppercase character.</ListItem>
                <ListItem>Password must contain at least one number.</ListItem>
                <ListItem>Password must contain at least one special character.</ListItem>
            </RestrictionList>
            <Submit type="submit">Create Account</Submit>
            <LoginTextContainer>
                <LoginText>Already have an account? <Redirect href="/auth/login">Log in</Redirect>.</LoginText>
            </LoginTextContainer>
        </Form>
    );
}