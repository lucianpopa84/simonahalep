class Palmares {

    constructor(turneu, an, record) {
        this.id = 0;
        this.turneu = turneu;
        this.an = an;
        this.record = record;

    }

    getAddSQL() {
        let { turneu, an, record } = this;
        let sql = `INSERT INTO PALMARES (turneu, an, record) 
                       VALUES('${turneu}','${an}', '${record}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM PALMARES WHERE ID = ${id}`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM PALMARES WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, turneu, an, record } = data;
        let sql = `update PALMARES set turneu='${turneu}',  an='${an}', record='${record}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM PALMARES`;
        return sql;
    }
}

module.exports = Palmares;

