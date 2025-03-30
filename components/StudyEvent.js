import styled from 'styled-components';
import Date from '@/utils/Date';
import Time from '@/utils/Time';
import Event from '@/utils/Event';

const EventBlock = styled.div`
    flex-direction: column !important; 
    display: flex;
    font-family: "Geist",sans-serif;
    width: 400px;
    min-width: 400px;
    height: 200px;
    border: 1px solid #E4E0E1;
    border-radius: 10px;
    padding: 10px;
    transition: transform 0.3s ease; 
    &:hover {
        transform: scale(1.05);
    }
`
const EventCourse = styled.h1`
    font-size: 40px;
    margin-bottom: 20px;
`
const EventText = styled.h1`
    font-size: 16px;
    font-weight: 300;
    margin-bottom: 10px;
`

export default function StudyEvent({ timeStart,timeEnd,date,course,location }){
    return(
        <EventBlock>
            <EventCourse>
                {course}
            </EventCourse>
            <EventText>
                Time: {timeStart.toString()} to {timeEnd.toString()}
            </EventText>
            <EventText>
                Date: {date.toString()}
            </EventText>
            <EventText>
                Location: {location}
            </EventText>
        </EventBlock>
    )
}
