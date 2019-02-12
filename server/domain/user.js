class User {

    constructor(sub, name, nickname, picture) {
        this.id = 0;
        this.sub = sub;
        this.name = name;
        this.nickname = nickname;
        this.picture = picture;
    }

    getAddSQL() {
        let { sub, name, nickname, picture } = this;
        let sql = `INSERT INTO users (sub, name, nickname, picture) 
                       VALUES('${sub}', '${name}','${nickname}','${picture}')`;
        return sql;
    }

    static getByIdSQL(id) {
        let sql = `SELECT * FROM users WHERE ID = ${id}`;
        return sql;
    }

    static getBySubSQL(sub) {
        let sql = `SELECT * FROM users WHERE sub = '${sub}'`;
        return sql;
    }

    static deleteBySubSQL(id) {
        let sql = `DELETE FROM users WHERE ID = ${id}`;
        console.log('query', sql);
        return sql;
    }

    static updateByDataSQL(data) {
        let { sub, name, nickname, picture } = data;
        let sql = `update users set name='${name}',  nickname='${nickname}', picture='${picture}' WHERE sub = '${sub}'`;
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM users`;
        return sql;
    }
}

module.exports = User;

