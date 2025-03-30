export default class Time {
    constructor(hour, minute, am) {
        this.hour = hour;
        this.minute = minute;
        this.am = am;
    }

    toString() {
        return `${this.hour}:${(this.minute < 10) ? "0" + this.minute : this.minute} ${this.am ? "AM" : "PM"}`;
    }
}