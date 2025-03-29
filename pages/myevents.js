import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { HContainer,Heading,Underline,ImgIcon,ImgHContainer } from "/";

const Body = styled.main`
    flex-direction: row !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
    gap: 300px;
`

const MyEventBody = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
    padding-left: 20px;
    padding-top: 30px;
`
const EventBorder = styled.div`
    width: 0; 
    height: 100vh; 
    border-right: 2px solid black;
`

export default function MyEventsPage(){
    return(
    <>
    <NavBar> </NavBar>
    <Body>
        <MyEventBody>
            <ImgHContainer>
                <ImgIcon src="/images/MyEventLogo.png" alt="Logo" />
                <HContainer>
                    <Heading>My Events</Heading>
                    <Underline/>
                </HContainer>
            </ImgHContainer>
        </MyEventBody>
        <EventBorder>
            
        </EventBorder>
    </Body>
    </>
    )
}