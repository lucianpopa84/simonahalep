export default class Palmares {
    constructor({ id = "", turneu = "", an = "", record = "" } = {}) {
        this.id = id;
        this.turneu = turneu;
        this.an = an;
        this.record = record;
    }
}