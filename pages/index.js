import NavBar from "@/components/Navbar";
import { styled } from "styled-components";

const Body = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif; s 
    align-items:flex-start;
    padding-left: 20px;
    padding-top: 30px;
    gap: 300px;
`;

const ImgHContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;
`

const HContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`;

const Homeheading = styled.h1`
    font-size: 36px;
    font-weight: 300;
    padding-bottom: 5px; 
`;

const Underline = styled.hr`
    width: 75px; 
    height: 3px; 
    background-color: #40A2E3; 
    border: none; 
    margin: 5px 0; 
`;

const ImgIcon = styled.img`
    width: 50px; 
    height: 50px; 
`;

export default function Website(){
    return(
        <> 
        <NavBar> </NavBar>
        <Body> 
            <ImgHContainer>
                <ImgIcon src="/images/notbook.png" alt="Logo" />
                <HContainer> 
                    <Homeheading>Today's Events</Homeheading>
                    <Underline/>
                </HContainer>   
            </ImgHContainer>
            <ImgHContainer>
                <ImgIcon src="/images/calender2.png" alt="Logo" />
                <HContainer> 
                    <Homeheading>Future Events</Homeheading>
                    <Underline/>
                </HContainer>   
            </ImgHContainer>    
        </Body>
        </>
    )
}