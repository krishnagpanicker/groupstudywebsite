import styled from 'styled-components';

const EventBlock = styled.div`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    width: 200px;
    height: auto;
`
const EventCourse = styled.h1`
    font-size: 30px;
`
const EventText = styled.h1`
    font-size: 16px;
`

export default function StudyEvent({ timeStart,timeEnd,date,course,location }){
    return(
        <EventBlock>
            <EventCourse>
                {course}
            </EventCourse>
            <EventText>
                {timeStart} to {timeEnd}w
            </EventText>
        </EventBlock>
    )
}
