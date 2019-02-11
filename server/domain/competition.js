class Competition {

    constructor(name, location, date) {
        this.id = 0;
        this.name = name;
        this.location = location;
        this.date = date;
    }

    getAddSQL() {
        let { name, location, date } = this;
        let sql = `INSERT INTO COMPETITIONS (name, location, date) 
                       VALUES('${name}','${location}', '${date}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM COMPETITIONS WHERE ID = ${id}`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM COMPETITIONS WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, name, location, date } = data;
        let sql = `update COMPETITIONS set name='${name}',  location='${location}', date='${date}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM COMPETITIONS`;
        return sql;
    }
}

module.exports = Competition;

