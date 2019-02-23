export default class Event {
    constructor({ id = "", name = "", location = "", startDate = "", endDate = "", description = "" } = {}) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}