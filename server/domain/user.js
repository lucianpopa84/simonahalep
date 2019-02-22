class User {

    constructor(sub, name, nickname, picture, banned) {
        this.id = 0;
        this.sub = sub;
        this.name = name;
        this.nickname = nickname;
        this.picture = picture;
        this.banned = banned;
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
        let { id, sub, name, nickname, picture, banned } = data;
        let user = { sub, name, nickname, picture, banned };
        let update = '';
        for (let field in user) {
            update += update ? ',' : '';
            update += (user[field] != undefined) ? ` ${field} = '${user[field]}' ` : '';
        }
        let sql = `update users set ${update} WHERE id = '${id}'`; //name='${name}',  nickname='${nickname}', picture='${picture}', banned='${banned}'
        return sql;
    }

    static getAllSQL() {
        let sql = `SELECT * FROM users`;
        return sql;
    }
}

module.exports = User;

