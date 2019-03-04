class Career {

    constructor(tournament, year, result) {
        this.id = 0;
        this.tournament = tournament;
        this.year = year;
        this.result = result;
    }

    getAddSQL() {
        let { tournament, year, result } = this;
        let sql = `INSERT INTO CAREERSTATISTICS (date, status,title, description) 
                       VALUES('${tournament}','${year}', '${result})`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM CAREERSTATISTICS WHERE ID = ${id}`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM CAREERSTATISTICS WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, tournament, year, result } = data;
        let sql = `update CAREERSTATISTICS set tournament='${tournament}',  year='${year}', result='${result}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM CAREERSTATISTICS order by date`;
        return sql;
    }
}

module.exports = Career;

