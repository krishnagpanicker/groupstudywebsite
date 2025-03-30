export default class Event {
    constructor(course, startTime, endTime, date, location) {
        this.course = course;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
        this.location = location;
    }

    toString() {
        return `${course}: ${startTime} - ${endTime} ${date} at ${location}`
    }
}