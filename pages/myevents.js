import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { HContainer,Heading,Underline,ImgHContainer } from "/";
import { useStateContext } from "@/context/StateContext";
import React, { useState } from "react";

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

const NewEvent = styled.button`
    position: absolute;
    bottom: 30px;
    right: 30px;
    width: 75px;
    height: 75px;
    font-size: 25px;
    font-weight: 600;
    padding: 10px;
    border: 0px;
    border-radius: 50%;
    background-color: #0c0950;
    color: white;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

const CreateEventDiv = styled.div`
    dipslay: flex;
    flex-direction: row;
    justify-content: center;
`
export const ImgIcon = styled.img`
    margin-top: 2px;
    width: 50px; 
    height: 50px; 
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background: white;
  width: 50%;
  max-width: 500px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1001;
`;

export default function MyEventsPage(){
    const [isOpen, setIsOpen] = useState(false);

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
        <CreateEventDiv>
            <NewEvent>
                <ImgIcon src="/images/plus--v2.png" alt="Logo" />
            </NewEvent>
        </CreateEventDiv>
        <EventBorder>
            
        </EventBorder>
    </Body>
    </>
    )
}