class Biography {

    constructor(date, status, title, description) {
        this.id = 0;
        this.title = title;
        this.status = status;
        this.description = description;
        this.date = date;
    }

    getAddSQL() {
        let { date, status, title, description } = this;
        let sql = `INSERT INTO BIOGRAPHY (date, status,title, description) 
                       VALUES('${date}','${status}', '${title}','${description}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM BIOGRAPHY WHERE ID = ${id}`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM BIOGRAPHY WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, date, status, title, description } = data;
        let sql = `update BIOGRAPHY set date='${date}',  status='${status}', title='${title}', description='${description}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM biography`;
        return sql;
    }
}

module.exports = Biography;

