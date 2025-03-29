import styled from "styled-components";

const NavStyle = styled.nav`
    display: flex;
    font-family: "Geist",sans-serif;
    position: sticky;
    justify-content: space-between;
    background-color: #0c0950;
    color: white;
    width: 100vw;
    height: 65px;
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
    width: 50px; 
    height: 50px; 
`;

const TabsDiv = styled.div`
    padding-left: 20px; 
    display: flex;
    align-items: center;
    gap: 30px;
`;

const PageHeader = styled.a`
    font-size: 16px;
    color: white
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

export default function NavBar() {
    return (
        <NavStyle>
            <LeftDiv>
                <LogoDiv>
                    <Logo src="/images/bomboclaat_image.jpeg" alt="Logo" />
                </LogoDiv>
                <TabsDiv>
                    <PageHeader>Search Groups</PageHeader>
                    <PageHeader>My Events</PageHeader>
                    <PageHeader>Study Buddies</PageHeader>
                </TabsDiv>
            </LeftDiv>
            <RightDiv>
                <AccountDiv>
                    <PageHeader>Log In</PageHeader>
                    <SignUpBox>
                        <PageHeader href="/auth/signup">Sign Up</PageHeader>
                    </SignUpBox>
                </AccountDiv>
            </RightDiv>
        </NavStyle>
    );
}