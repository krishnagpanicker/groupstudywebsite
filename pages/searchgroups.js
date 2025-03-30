import NavBar from "@/components/Navbar";
import { styled } from "styled-components";
import { Heading,Underline } from "/";
import { Body,FieldHeader,SelectorDiv,Spacer } from ".//myevents";
import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "@/context/StateContext";
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';

const MySearchBody = styled.main`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    align-items:flex-start;
`

const ImgIcon = styled.img`
    margin-top: 2px;
    width: 125px; 
    height: 125px; 
`;

const ImgHContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`

const SearchBorder = styled.div`
    width: 0; 
    height: 100vh; 
    border-right: 2px solid black;
    margin-left: 200px;
`
const HContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    margin-top: 50px;
`
const TextboxDiv = styled.div`
    flex-direction: column !important; 
    display: flex;
    margin: 10px auto;
    width: 100%;
    margin-left: 100px;
    
`

const InputTextbox = styled.input`
    margin: 5px auto;
    border: 1px solid #E4E0E1;
    border-radius: 3px;
    height: 24px;
    font-size: 15px;
    padding: 2px;
    width: 100%;
    margin-bottom: 15px;
`;

const Selector = styled.select`
    width: 30%;
    text-align: center;
`

const CheckboxDiv = styled.div`
    flex-direction: row !important; 
    display: flex;
    gap: 20px;
`

const Checkbox = styled.input`
    width: 25px;
    height: 25px;
    margin: 7px;
`

const Button = styled.button`
    background-color: #0C0950;
    border-radius: 3px;
    color: white;
    padding: 10px 30px;
    font-size: 15px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #4D55CC;
    }
`
const ButtonDiv = styled.div`
    flex-direction: row !important; 
    display: flex;
    gap: 20px;
    align-items: center;
    width: 100%;
    margin-left: 175px;
`

const EventList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    overflow-y: auto;
    gap: 20px;
    max-height: 60vh;
    padding: 20px;
`

export default function SearchGroupsPage(){
    const { user } = useStateContext();
    const [events, setEvents] = useState([]);

    const [courseFilter, setCourseFilter] = useState(false);
    const [emailFilter, setEmailFilter] = useState(false);
    const [locationFilter, setLocationFilter] = useState(false);

    const [eventCreator, setEventCreator] = useState("");
    const [courseName, setCourseName] = useState("");
    const [eventLocation, setEventLocation] = useState("");

    const getSortedEvents = async () => {
        let q = collection(database, "events");

        if (emailFilter && eventCreator.trim() !== "") {
            q = query(q, where("user.mail", "==", eventCreator));
        }

        if (courseFilter && courseName.trim() !== "") {
            q = query(q, where("course", "==", courseName));
        }
    
        if (locationFilter && eventLocation.trim() !== "") {
            q = query(q, where("location", "==", eventLocation));
        }

        try {
            const querySnap = await getDocs(q);
            let eventTemp = [];
            querySnap.forEach(doc => {
                console.log(doc.id, doc.data());
                eventTemp.push({ id: doc.id, ...doc.data() });
            });
            console.log("Temp events: ", eventTemp);
            setEvents(eventTemp);
            console.log("Added events: ", events);
        }
        catch (error) {
            console.error("Error retrieving data: ", error.message);
        }
    }

    return(
        <>
        <NavBar> </NavBar>
        <Body>
          <MySearchBody>
                <ImgHContainer>
                    <ImgIcon src="/images/searchstack.png" alt="Logo" />
                    <HContainer>
                        <Heading>Find Study Events</Heading>
                        <Underline/>
                    </HContainer>
                </ImgHContainer>
                <TextboxDiv> 
                    <FieldHeader>Event Creator Email</FieldHeader>
                        <CheckboxDiv>
                            <InputTextbox type="text" placeholder="e.g. srk1515@psu.edu" value={eventCreator} onChange={(e) => setEventCreator(e.target.value)}></InputTextbox>
                            <Checkbox type="checkbox" checked={emailFilter} onChange={() => setCourseFilter(!emailFilter)}/>
                        </CheckboxDiv>
                    <FieldHeader>Course Name</FieldHeader>
                        <CheckboxDiv>
                            <InputTextbox type="text" placeholder="e.g. CMPEN 270" value={courseName} onChange={(e) => setCourseName(e.target.value)}></InputTextbox>
                            <Checkbox type="checkbox" checked={courseFilter} onChange={() => setEmailFilter(!courseFilter)}/>
                        </CheckboxDiv>
                    <FieldHeader>Location</FieldHeader>
                        <CheckboxDiv>
                            <InputTextbox type="text" placeholder="e.g. Haller 107" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)}></InputTextbox>
                            <Checkbox type="checkbox" checked={locationFilter} onChange={() => setLocationFilter(!locationFilter)}/>
                        </CheckboxDiv>
                </TextboxDiv>
                <ButtonDiv>
                    <Button type="button" onClick={getSortedEvents}>Filter</Button>
                    <Button type="button" onClick={() => {
                            setCourseFilter(false);
                            setEmailFilter(false);
                            setLocationFilter(false)
                            }}> Reset </Button>
                </ButtonDiv>
            </MySearchBody> 
            <SearchBorder> </SearchBorder>
            <EventList>
                {events.map((event) => {
                    
                    console.log(event.startTime.hour + " to " + event.endTime.hour);
                    let hour_st = event.startTime.hour > 12 ? event.startTime.hour - 12 : event.startTime.hour;
                    let am_est = event.startTime.hour < 12 || event.startTime.hour == 24;
                    let st = new Time(hour_st, event.startTime.minute, am_est);

                    let hour_et = event.endTime.hour > 12 ? event.endTime.hour - 12 : event.endTime.hour;
                    let am_eet = event.endTime.hour < 12 || event.endTime.hour == 24;
                    let et = new Time(hour_et, event.endTime.minute, am_eet);

                    let edate = new Date(event.date.day, event.date.month, event.date.year);
                    return(
                    <StudyEvent key={event.id} displayName={event.user.displayName} timeStart={st} timeEnd={et} date={edate} course={event.course} location={event.location}></StudyEvent>
                    )
                })}
            </EventList>
        </Body>
        </>
    )

}