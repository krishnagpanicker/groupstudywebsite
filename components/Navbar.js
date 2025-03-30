import styled from "styled-components";
import { useStateContext } from "@/context/StateContext";
import Image from 'next/image';
import { signOut } from "firebase/auth";
import { auth } from "@/library/firebaseConfig";

const NavStyle = styled.nav`
    display: flex;
    font-family: "Geist",sans-serif;
    position: sticky;
    justify-content: space-between;
    background-color: #0c0950;
    color: white;
    width: 100vw;
    height: 75px;
    align-items: center;
`;

const LeftDiv = styled.div`
    display: flex;
    align-items: center; 
    justify-content: flex-start; 
    padding-left: 20px; 
`;

const LogoDiv = styled.div`
    display: flex;
    justify-content: flex-start; 
`;

const Logo = styled.img`
    width: 75px; 
    height: auto; 
    transition: transform 0.3s ease;
    &:hover {
        transform: scale(1.2);
    }
`;

const TabsDiv = styled.div`
    padding-left: 20px; 
    display: flex;
    align-items: center;
    gap: 30px;
`;

const PageHeader = styled.a`
    font-size: 16px;
    color: white;
    cursor: pointer;
    text-decoration: none;
    transition: font-size 0.3s ease; 
    &:hover {
        font-size: 18px;
    }
    
    &.active {
        font-weight: bold;
    }
`;

const RightDiv = styled.div`
    display: flex;
    padding-right: 20px; 
`;

const AccountDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
`;

const LoggedInDiv = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

const Name = styled.p`
    font-size: 16px;
    color: white;
`;

const SignUpBox = styled.div`
    color: white; 
    background-color: #006BFF;
    padding: 10px 20px; 
    border-radius: 7px; 
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); 
    display: flex;
    align-items: center; 
    justify-content: center;

    transition: background-color 0.3s ease;
    &:hover {
        background-color: #1D24CA;
    }
`;

const LogoutButton = styled.button`
    background-color: #0c0950;
    border: 0px;
    color: white;
    font-size: 16px;
    transition: font-size 0.3s ease;

    &:hover {
        font-size: 18px;
    }
`;

export default function NavBar() {
    const { user } = useStateContext();

    const handleLogout = async () => {
        try {
            setTimeout(() => {
                signOut(auth);
            }, 1000);
            console.log("User logged out succesfully.");
            user(null);
        }
        catch (error) {
            console.error("Error logging out: ", error.message);
        }
    };

    return (
        <NavStyle>
            <LeftDiv>
                <LogoDiv>
                    <a href="/">
                    <Logo src="/images/logo.png" alt="Logo" />
                    </a>
                </LogoDiv>
                <TabsDiv>
                    <PageHeader href="/searchgroups">Search Groups</PageHeader>
                    <PageHeader href="/myevents">My Events</PageHeader>
                    <PageHeader href="/mystudybuddies">My Study Buddies</PageHeader>
                </TabsDiv>
            </LeftDiv>
            <RightDiv>
                { user ? (
                    <LoggedInDiv>
                        <LogoutButton onClick={handleLogout}>Log Out</LogoutButton>
                        <Image src="/images/notification.png" height={45} width={45}/>
                        <Image src={user.photoURL} height={45} width={45}/>
                        <Name>{user.displayName}</Name>
                    </LoggedInDiv>
                    ) : (
                    <AccountDiv>
                        <PageHeader href="/auth/login">Log In</PageHeader>
                        <SignUpBox>
                            <PageHeader href="/auth/signup">Sign Up</PageHeader>
                        </SignUpBox>
                    </AccountDiv>    
                    )
                }
            </RightDiv>
        </NavStyle>
    );
}