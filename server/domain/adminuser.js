class AdminUser {

    constructor(username, password) {
        this.id = 0;
        this.username = username;
        this.password = password;
    }

    getAddSQL() {
        let { username, password } = this;
        let sql = `INSERT INTO adminusers (username, password) 
                       VALUES('${username}','${password}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM adminusers WHERE ID = ${id}`;
        return sql;
    }

    static getByUserNameSQL(username) {
        let sql = `SELECT * FROM adminusers WHERE validated=1 and username = '${username}'`;
        return sql;
    }

    static deleteByIdSQL(id) {
        let sql = `DELETE FROM adminusers WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { id, username, password } = data;
        let sql = `update users set username='${username}',  password='${password}' WHERE ID = ${id}`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM adminusers`;
        return sql;
    }
}

module.exports = AdminUser;

