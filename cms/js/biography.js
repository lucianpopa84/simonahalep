export default class Biography {
    constructor({ id = "", date = "", status = "", title = "", description = "" } = {}) {
        this.date = date;
        this.status = status;
        this.title = title;
        this.description = description;
        this.id = id;
    }
}