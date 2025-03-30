export default class Date {
    constructor(day, month, year) {
        this.day = day;
        this.month = month;
        this.year = year;
    }

    toString() {
        return `${this.month}/${this.day}/${this.year}`;
    }
}