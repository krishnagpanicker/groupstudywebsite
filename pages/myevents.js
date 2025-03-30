import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { HContainer,Heading,Underline,ImgHContainer } from "/";
import React, { useState, useEffect, useRef } from "react";
import { auth, database } from '@/library/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useStateContext } from "@/context/StateContext";
import { useRouter } from 'next/router';


export const Body = styled.main`
    flex-direction: row !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
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
    margin-left: 200px;
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

const TextboxDiv = styled.div`
    flex-direction: column !important; 
    display: flex;
`

const PopUpHeader = styled.h1`
    text-align: center;
`

const InputTextbox = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    font-size: 15px;
    padding: 2px;
    width: 100%;
`;

export const SelectorDiv = styled.div`
    flex-direction: row !important;
    display: flex;
    gap: 10px;
    margin-top: 5px;
`

const Selector = styled.select`
    width: 12%;
    text-align: center;
`
export const Spacer = styled.h1`
    font-size: 15px;
`

export const FieldHeader = styled.h1`
    margin-top: 10px;
    align-self: flex-start;
    font-weight: 300;
    font-size: 15px;
`;

const SubmitButton = styled.button`
    display: block;
    margin: 30px auto;
    background-color: #0c0950;
    border: 0px solid black;
    color: white;
    padding: 10px 30px;
    font-size: 15px;
    border-radius: 3px;
    transition: background-color 0.5 ease;
    transition: transform 0.3s ease;
    &:hover {
        background-color: #4D55CC;
        transform: scale(1.08);
    }
`;

const Description = styled.textarea`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 72px;
    font-family: 'Geist', sans-serif;
    font-size: 15px;
    padding: 2px;
    width: 100%;
`;

export default function MyEventsPage(){
    const { user } = useStateContext();
    const overRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [courseCode, setCourse] = useState("");
    const [located, setLocation] = useState("");
    const [described, setDescription] = useState("");
    const [selectedHour1, setHour1] = useState(12);
    const [selectedMinute1, setMinute1] = useState(0);
    const [AM1, setAM1] = useState("AM");
    const [selectedHour2, setHour2] = useState(12);
    const [selectedMinute2, setMinute2] = useState(0);
    const [AM2, setAM2] = useState("AM");
    const router = useRouter();

    const [selectedMonth, setMonth] = useState(1);
    const [selectedYear, setYear] = useState(2025);
    const [selectedDay, setDay] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState([]);

    useEffect(() => {
        let numDays = 0;
        let isLeapYear = selectedYear % 4 == 0;
        if (selectedMonth == 1 || selectedMonth == 3 || selectedMonth == 5 || selectedMonth == 7 || selectedMonth == 8 || selectedMonth == 10 || selectedMonth == 12) {
            numDays = 31;
        }
        else if (selectedMonth == 4 || selectedMonth == 6 || selectedMonth == 9 || selectedMonth == 11) {
            numDays = 30;
        }
        else {
            numDays = isLeapYear ? 29 : 28;
        }
        let days = [];
        for (let i = 1; i <= numDays; i++) {
            days.push(i);
        }
        setDaysInMonth(days);
    }, [selectedMonth, selectedYear]);

    const addEvent = async (eventData) => {
        try {
            const docRef = await addDoc(collection(database, "events"), eventData);
            overRef.current.click();
            console.log("Event added with ID: ", docRef.id);
        }
        catch (error) {
            console.error("Error adding event: ", error.message);
        }
    };

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
            <NewEvent onClick={() => setIsOpen(true)}>
                <ImgIcon src="/images/plus--v2.png" alt="Logo" />
            </NewEvent>
            {isOpen && (
                <Overlay ref={overRef} onClick={() => setIsOpen(false)}>
                    <PopupContainer onClick={(e) => e.stopPropagation()}> 
                        <PopUpHeader>Create A New Event</PopUpHeader>
                        <hr style={{ border: "1px solid #E4E0E1", width: "100%", margin: "10px 0px 10px 0px" }}/>
                        <TextboxDiv>
                            <FieldHeader>Course Name</FieldHeader>
                            <InputTextbox type="text" placeholder="e.g. CMPEN 270" onChange={(e) => setCourse(e.target.value)}></InputTextbox>
                            <FieldHeader>Time</FieldHeader>
                            <SelectorDiv>
                                <Selector id="hour1" value={selectedHour1} onChange={(e) => setHour1(e.target.value)}> 
                                    <option value={12}>12</option>
                                    <option value={1}>01</option>
                                    <option value={2}>02</option>
                                    <option value={3}>03</option>
                                    <option value={4}>04</option>
                                    <option value={5}>05</option>
                                    <option value={6}>06</option>
                                    <option value={7}>07</option>
                                    <option value={8}>08</option>
                                    <option value={9}>09</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                </Selector>                                
                                <Selector id="minute1" value={selectedMinute1} onChange={(e) => setMinute1(e.target.value)}> 
                                    <option value={0}>00</option>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                </Selector>
                                <Selector id="AM_PM1" value={AM1} onChange={(e) => setAM1(e.target.value)}> 
                                    <option value={"AM"}>AM</option>
                                    <option value={"PM"}>PM</option>
                                </Selector>
                                <Spacer>to</Spacer>
                                <Selector id="hour2" value={selectedHour2} onChange={(e) => setHour2(e.target.value)}> 
                                    <option value={12}>12</option>
                                    <option value={1}>01</option>
                                    <option value={2}>02</option>
                                    <option value={3}>03</option>
                                    <option value={4}>04</option>
                                    <option value={5}>05</option>
                                    <option value={6}>06</option>
                                    <option value={7}>07</option>
                                    <option value={8}>08</option>
                                    <option value={9}>09</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                </Selector>                                
                                <Selector id="minute2" value={selectedMinute2} onChange={(e) => setMinute2(e.target.value)}> 
                                    <option value={0}>00</option>
                                    <option value={15}>15</option>
                                    <option value={30}>30</option>
                                    <option value={45}>45</option>
                                </Selector>
                                <Selector id="AM_PM2" value={AM2} onChange={(e) => setAM2(e.target.value)}> 
                                    <option value={"AM"}>AM</option>
                                    <option value={"PM"}>PM</option>
                                </Selector>
                            </SelectorDiv>
                            <FieldHeader>Date</FieldHeader>
                            <SelectorDiv>
                                <Selector id="month" value={selectedMonth} onChange={(e) => setMonth(e.target.value)}>
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </Selector>
                                <Spacer>/</Spacer>
                                <Selector id="day" value={selectedDay} onChange={(e) => setDay(e.target.value)}>
                                    {daysInMonth.map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </Selector>
                                <Spacer>/</Spacer>
                                <Selector id="year" value={selectedYear} onChange={(e) => setYear(e.target.value)}>
                                    <option value={2025}>2025</option>
                                    <option value={2026}>2026</option>
                                    <option value={2027}>2027</option>
                                    <option value={2028}>2028</option>
                                    <option value={2029}>2029</option>
                                </Selector>
                            </SelectorDiv>
                            <FieldHeader>Location</FieldHeader>
                            <InputTextbox type="text" placeholder="e.g. Haller 107" onChange={(e) => setLocation(e.target.value)}></InputTextbox>
                            <FieldHeader>Description</FieldHeader>
                            <Description placeholder="Your plans for the session or goals you want to achieve." onChange={(e) => setDescription(e.target.value)}></Description>
                        </TextboxDiv>
                        <SubmitButton  onClick={() => addEvent({date: {day: selectedDay, month: selectedMonth, year: selectedYear}, description: described, endTime: {am: AM2, hour: selectedHour2, minute: selectedMinute2}, location: located, startTime: {am: AM1, hour: selectedHour1, minute: selectedMinute1}, user: {displayName: user.displayName, mail: user.email}})}>Create Event</SubmitButton>
                    </PopupContainer>
                </Overlay>
            )}
        </CreateEventDiv>
        <EventBorder>
            
        </EventBorder>
    </Body>
    </>
    )
}