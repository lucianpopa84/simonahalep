export default class Career {
        
    constructor({ id = "", tournament = "", year = "", result = "" } = {}) {
        this.tournament = tournament;
        this.year = year;
        this.result = result;
        this.id = id;
    }
    render(container) {

        let html = $(`
        <li>
        <strong>${this.tournament}</strong>
        <p>${this.description}</p>
        <p>${this.result}</p>
        </li>
        `);
        
        html.appendTo(container);
    }
}