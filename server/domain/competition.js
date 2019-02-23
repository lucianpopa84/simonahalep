class Competition {

    constructor(name, location, startDate, endDate) {
        this.id = 0;
        this.name = name;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    getAddSQL() {
        let { name, location, startDate, endDate } = this;
        let sql = `INSERT INTO COMPETITIONS (name, location, startDate, endDate) 
                       VALUES('${name}','${location}', '${startDate}', '${endDate}')`;
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
        let { id, name, location, startDate, endDate, description } = data;
        let sql = `update COMPETITIONS set name='${name}',  location='${location}', startDate='${startDate}', endDate='${endDate}', description='${description}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM COMPETITIONS`;
        return sql;
    }
}

module.exports = Competition;

